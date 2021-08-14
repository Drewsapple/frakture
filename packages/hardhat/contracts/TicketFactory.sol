// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./IFactoryERC721.sol";
import "./Ticket.sol";

contract TicketFactory is FactoryERC721, Ownable {
    using Strings for string;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    address public proxyRegistryAddress;
    address public ticketContractAddress;
    string public baseURI = "ipfs://";

    /*
     * Enforce the existence of only 100 OpenSea creatures.
     */
    uint256 CREATURE_SUPPLY = 100;

    constructor(address _proxyRegistryAddress) {
        proxyRegistryAddress = _proxyRegistryAddress;
        ticketContractAddress = address(
            new Ticket(_proxyRegistryAddress, address(this))
        );
    }

    function name() override external pure returns (string memory) {
        return "Ticket";
    }

    function symbol() override external pure returns (string memory) {
        return "tix";
    }

    function supportsFactoryInterface() override public pure returns (bool) {
        return true;
    }

    function transferOwnership(address newOwner) override public onlyOwner {
        address _prevOwner = owner();
        super.transferOwnership(newOwner);
    }

    function mint(uint256 _tokenId, address _toAddress, string memory _CID) override public {
        // Must be sent from the owner proxy or owner.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        assert(
            address(proxyRegistry.proxies(owner())) == _msgSender() ||
                owner() == _msgSender() ||
                _msgSender() == ticketContractAddress
        );
        require(canMint(_tokenId));

        Ticket openSeaTicket = Ticket(ticketContractAddress);
        openSeaTicket.mintTo(_toAddress, _CID);
    }

    function canMint(uint256 /*_tokenId*/) override public view returns (bool) {
        Ticket openSeaTicket = Ticket(ticketContractAddress);
        uint256 creatureSupply = openSeaTicket.totalSupply();

        uint256 numItemsAllocated = 1;
        return creatureSupply < (CREATURE_SUPPLY - numItemsAllocated);
    }

    function tokenURI(uint256 _optionId) override external view returns (string memory) {
        return string(abi.encodePacked(baseURI, Strings.toString(_optionId)));
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
     */
    function isApprovedForAll(address _owner, address _operator)
        public
        view
        returns (bool)
    {
        if (owner() == _owner && _owner == _operator) {
            return true;
        }

        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (
            owner() == _owner &&
            address(proxyRegistry.proxies(_owner)) == _operator
        ) {
            return true;
        }

        return false;
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
     */
    function ownerOf(uint256 _tokenId) public view returns (address _owner) {
        return owner();
    }
}