// SPDX-License-Identifier: MIT
// Modified from https://github.com/iamsahu/erc777distributor
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import {
    ISuperfluid,
    ISuperToken
} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";
import {
    IInstantDistributionAgreementV1
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";

import "@openzeppelin/contracts-upgradeable/token/ERC777/IERC777Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/IERC1820RegistryUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC777/IERC777RecipientUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract ERC777Distributor is Initializable, OwnableUpgradeable, IERC777RecipientUpgradeable, ERC777Upgradeable {
    uint128 public totalShareUnits;
    address[] distributableTokens;
    mapping(address=>bool) tokenAllowed;
    mapping(address=>address) upgradeToDistributable;

    uint32 public constant INDEX_ID = 1;

    ISuperToken private _cashToken;

    ISuperToken private fDAIx;

    ISuperfluid private _host;
    IInstantDistributionAgreementV1 private _ida;
    IERC1820RegistryUpgradeable private _erc1820;

    // use callbacks to track approved subscriptions
    mapping (address => bool) public isSubscribing;

    //Events
    event FundsToDistribute(address from, address token, uint256 amount);
    event UserAdded(address userAddress,uint128 shares,uint32 index,address publisher,uint timeStamp,uint128 totalShares);
    event UserRemoved(address userAddress,uint128 shares,uint32 index,address publisher,uint timeStamp,uint128 totalShares);
    event UserModified(address userAddress,uint128 shares,uint32 index,address publisher,uint timeStamp,uint128 totalShares);
    event Distribution(uint256 amountDistributed,uint32 index,address token);
    event TotalShares(uint128 totalShares,uint32 index,address publisher,uint timeStamp);

    constructor (
        ISuperfluid host,
        IInstantDistributionAgreementV1 ida,
        string memory _name,
        string memory _symbol,
        address[] memory _defaultOperators
    ) {
        initialize(host, ida, _name, _symbol, _defaultOperators);
    }

    function initialize (
        ISuperfluid host,
        IInstantDistributionAgreementV1 ida,
        string memory _name,
        string memory _symbol,
        address[] memory _defaultOperators
    ) public initializer {
        __ERC777_init(_name, _symbol, _defaultOperators);
        __Ownable_init();
        _erc1820 = IERC1820RegistryUpgradeable(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);
        _erc1820.setInterfaceImplementer(address(this), keccak256("ERC777TokensRecipient"), address(this));
        _host = host;
        _ida = ida;
        
        fDAIx = ISuperToken(0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90);
        _indexNewSuperToken(fDAIx);
    }

    function _indexNewUpgradableToken(address token, ISuperToken superToken) public onlyOwner {
        upgradeToDistributable[token] = address(superToken);
        tokenAllowed[token] = true;
        _indexNewSuperToken(superToken);
    }

    function _indexNewSuperToken(ISuperToken token) public onlyOwner {
        distributableTokens.push(address(token));
        _host.callAgreement(
            _ida,
            abi.encodeWithSelector(
                _ida.createIndex.selector,
                token,
                INDEX_ID,
                new bytes(0) // placeholder ctx
            ),
            new bytes(0) // user data
        );
    }

    function modifySub(address user,uint128 shareUnits) internal{
        for(uint i = 0; i <  distributableTokens.length; i++) {
            _host.callAgreement(
                _ida,
                abi.encodeWithSelector(
                    _ida.updateSubscription.selector,
                    distributableTokens[i],
                    INDEX_ID,
                    user,
                    shareUnits,
                    new bytes(0) // placeholder ctx
                ),
                new bytes(0) // user data
            );
        }
    }

    /// @dev Distribute `amount` of cash among all token holders
    function distribute(uint256 cashAmount,address tokenAddress) internal {
        (uint256 actualCashAmount,) = _ida.calculateDistribution(
            ISuperToken(tokenAddress),
            address(this), INDEX_ID,
            cashAmount);

        _host.callAgreement(
            _ida,
            abi.encodeWithSelector(
                _ida.distribute.selector,
                ISuperToken(tokenAddress),
                INDEX_ID,
                actualCashAmount,
                new bytes(0) // placeholder ctx
            ),
            new bytes(0) // user data
        );
        emit Distribution(actualCashAmount,INDEX_ID,tokenAddress);
    }

    function tokensReceived(
        address operator,
        address from,
        address to,
        uint256 amount,
        bytes calldata userData,
        bytes calldata operatorData
    ) external override {
        require(tokenAllowed[msg.sender], "ERC777Distributor: this payment token not accepted");
        address superToken = upgradeToDistributable[msg.sender];
        if(superToken != address(0)){
            ISuperToken(superToken).upgrade(amount);
            distribute(amount, superToken);
        }
        else {
            distribute(amount, msg.sender);
        }
        emit FundsToDistribute( from, msg.sender, amount);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256 amount
    ) internal override {
        uint128 transfer = uint128(amount);
        if(from != address(0)){
            uint128 senderUnits = uint128(ERC777Upgradeable.balanceOf(from));
            modifySub(from, senderUnits - transfer);
        }
        if(to != address(0)){
            uint128 recipientUnits = uint128(ERC777Upgradeable.balanceOf(to));
            modifySub(to, recipientUnits + transfer);
        }
    }

    function mint(address payable account, uint256 amount) external onlyOwner {
        _mint(account, amount, "", "");
    }

    function batchMint(address payable[] calldata accounts, uint256[] calldata amounts) external onlyOwner {
        require(accounts.length == amounts.length, "ERC777Distributor: batchMint length mismatch");
        for(uint i = 0; i < accounts.length; i++) {
            _mint(accounts[i], amounts[i], "", "");
        }
    }
}