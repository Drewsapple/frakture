// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

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
contract ERC721Tradable is ContextMixin, ERC721EnumerableUpgradeable, OwnableUpgradeable, NativeMetaTransaction {
    using SafeMath for uint256;

    address proxyRegistryAddress;
    uint256 private _currentTokenId; // The next tokenid to be minted
    mapping(uint256 => string) private _CIDS;

    constructor(
        string memory _name,
        string memory _symbol,
        address _proxyRegistryAddress
    ) {
        __ERC721Tradable_init(_name, _symbol, _proxyRegistryAddress);
    }

    function __ERC721Tradable_init(
        string memory _name,
        string memory _symbol,
        address _proxyRegistryAddress
    ) public initializer {
        __Ownable_init_unchained();
        __ERC721_init(_name,_symbol);

        proxyRegistryAddress = _proxyRegistryAddress;
        _initializeEIP712(_name);
    }

    /**
     * @dev Mints a token to an address with a tokenURI.
     * @param _to address of the future owner of the token
     */
    function mintTo(address _to, string memory _CID) public onlyOwner {
        uint256 newTokenId = _getNextTokenId();
        _CIDS[newTokenId] = _CID;
        _mint(_to, newTokenId);
        _incrementTokenId();
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

    function baseTokenURI() public pure returns (string memory) {
        return "ipfs://";
    }

    function tokenURI(uint256 _tokenId) override public view returns (string memory) {
        return string(abi.encodePacked(baseTokenURI(), _CIDS[_tokenId], string("/metadata.json")));
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