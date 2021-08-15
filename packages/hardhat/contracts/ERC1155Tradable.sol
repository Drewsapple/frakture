// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Storage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./IERC2981.sol";
import "./common/meta-transactions/ContentMixin.sol";
import "./common/meta-transactions/NativeMetaTransaction.sol";

contract OwnableDelegateProxy {}

contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}

/**
 * @title ERC721Tradable
 * ERC721Tradable - ERC721 contract that whitelists a trading address, and has minting functionality.
 */
contract ERC1155Tradable is ContextMixin, ERC1155Supply, Ownable, NativeMetaTransaction, IERC2981 {
    using SafeMath for uint256;

    address proxyRegistryAddress;
    uint256 private _currentTokenId; // The next tokenid to be minted
    mapping(uint256 => string) private _CIDS;
    mapping(uint256 => address payable) private royaltyBeneficiaries;
    mapping(uint256 => uint96) private royaltyBasisPoints;

    constructor(
        address _proxyRegistryAddress
    ) ERC1155("ipfs://") {
        proxyRegistryAddress = _proxyRegistryAddress;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, IERC2981) returns (bool) {
        return
            // Register erc2981 royalty compatibility
            interfaceId == type(IERC2981).interfaceId ||
            // register raribly royalty compatibility
            interfaceId == bytes4(keccak256('getRaribleV2Royalties(uint256)')) ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev Mints a token to an address with a tokenURI.
     * @param _to address of the future owner of the token
     */
    function mintTo(address _to, uint256 _amount, string memory _CID ) public {
        uint256 newTokenId = _getNextTokenId();
        _CIDS[newTokenId] = _CID;
        _mint(_to, newTokenId, _amount, "");
        _incrementTokenId();
    }

    function mintToWithRoyalty(address _to, uint256 _amount, string memory _CID, address payable beneficiary, uint32 bps) external {
        uint256 newTokenId = _getNextTokenId();
        royaltyBeneficiaries[newTokenId] = beneficiary;
        royaltyBasisPoints[newTokenId] = bps;
        mintTo(_to, _amount, _CID);
    }

    /** 
     * Rarible specific royalties
     * @param id tokenid to lookup
     */
    function getRaribleV2Royalties(uint256 id) external view returns (address payable, uint96){
        return (royaltyBeneficiaries[id], royaltyBasisPoints[id]);
    }

    /** 
     * EIP2981 Royalties
     * @param _tokenId tokenid to lookup
     * @param _salePrice price of the sale (unitless, could be any currency)
     */
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external override view returns (
        address receiver,
        uint256 royaltyAmount
    ) {
        return (royaltyBeneficiaries[_tokenId], (royaltyBasisPoints[_tokenId]*_salePrice)/10000);
    }


    /**
     * @dev calculates the next token ID based on value of _currentTokenId
     * @return uint256 for the next token ID
     */
    function _getNextTokenId() private view returns (uint256) {
        return _currentTokenId.add(1);
    }

    /**
     * @dev increments the value of _currentTokenId
     */
    function _incrementTokenId() private {
        _currentTokenId++;
    }

    function uri(uint256 _tokenId) override public view returns (string memory) {
        return string(abi.encodePacked(string("ipfs://"), _CIDS[_tokenId], string("/metadata.json")));
    }

    /**
     * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
     */
    function isApprovedForAll(address owner, address operator)
        override
        public
        view
        returns (bool)
    {
        // Whitelist OpenSea proxy contract for easy trading.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }

    /**
     * This is used instead of msg.sender as transactions won't be sent by the original token owner, but by OpenSea.
     */
    function _msgSender()
        internal
        override
        view
        returns (address sender)
    {
        return ContextMixin.msgSender();
    }
}