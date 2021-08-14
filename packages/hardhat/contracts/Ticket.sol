// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/**
 * @title Ticket
 * Ticket - a contract for my non-fungible tickets.
 */
contract Ticket is ERC721Tradable {
    constructor(address _proxyRegistryAddress, address _factoryAddress)
        ERC721Tradable("Ticket", "Tix", _proxyRegistryAddress)
    {}

    function baseTokenURI() override public pure returns (string memory) {
        return "ipfs://";
    }
}