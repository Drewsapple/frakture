// SPDX-License-Identifier: MIT
// Modified from https://github.com/iamsahu/erc777distributor
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import {
    ISuperfluid,
    ISuperToken,
    SuperAppBase,
    SuperAppDefinitions
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

contract ERC777Distributor is SuperAppBase, Initializable, OwnableUpgradeable, IERC777RecipientUpgradeable, ERC777Upgradeable {
    uint128 public totalShareUnits;
    mapping (address=>uint128) shareMapping;
    mapping (address=>string) tokenNameMapping;

    uint32 public constant INDEX_ID = 1;

    ISuperToken private _cashToken;

    ISuperToken private fDAIx;

    ISuperfluid private _host;
    IInstantDistributionAgreementV1 private _ida;
    IERC1820RegistryUpgradeable private _erc1820;

    // use callbacks to track approved subscriptions
    mapping (address => bool) public isSubscribing;

    //Events
    event DonationReceived(address from, string token, uint256 amount,uint32 index,address publisher,uint timeStamp);
    event UserAdded(address userAddress,uint128 shares,uint32 index,address publisher,uint timeStamp,uint128 totalShares);
    event UserRemoved(address userAddress,uint128 shares,uint32 index,address publisher,uint timeStamp,uint128 totalShares);
    event UserModified(address userAddress,uint128 shares,uint32 index,address publisher,uint timeStamp,uint128 totalShares);
    event Distribution(uint256 amountDistributed,uint32 index,address publisher,uint timeStamp,string token);
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
        fDAIx = ISuperToken(0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90);
        tokenNameMapping[0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90] = "fDAIx";
        
        _host = host;
        _ida = ida;

        uint256 configWord =
            SuperAppDefinitions.APP_LEVEL_FINAL |
            SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP |
            SuperAppDefinitions.AFTER_AGREEMENT_TERMINATED_NOOP;

        _host.registerApp(configWord);

        _host.callAgreement(
            _ida,
            abi.encodeWithSelector(
                _ida.createIndex.selector,
                fDAIx,
                INDEX_ID,
                new bytes(0) // placeholder ctx
            ),
            new bytes(0) // user data
        );
    }

    function sharesOf(address user) view external returns(uint128){
        return shareMapping[user];
    }

    function beforeAgreementCreated(
        ISuperToken superToken,
        address agreementClass,
        bytes32 /* agreementId */,
        bytes calldata /*agreementData*/,
        bytes calldata /*ctx*/
    )
        external view override
        returns (bytes memory data)
    {
        // require(superToken == _cashToken, "DRT: Unsupported cash token");
        require(agreementClass == address(_ida), "DRT: Unsupported agreement");
        return new bytes(0);
    }

    function afterAgreementCreated(
        ISuperToken superToken,
        address /* agreementClass */,
        bytes32 agreementId,
        bytes calldata /*agreementData*/,
        bytes calldata /*cbdata*/,
        bytes calldata ctx
    )
        external override
        returns(bytes memory newCtx)
    {
        _checkSubscription(superToken, ctx, agreementId);
        newCtx = ctx;
    }

    function beforeAgreementUpdated(
        ISuperToken superToken,
        address agreementClass,
        bytes32 /* agreementId */,
        bytes calldata /*agreementData*/,
        bytes calldata /*ctx*/
    )
        external view override
        returns (bytes memory data)
    {
        // require(superToken == _cashToken, "DRT: Unsupported cash token");
        require(agreementClass == address(_ida), "DRT: Unsupported agreement");
        return new bytes(0);
    }

    function afterAgreementUpdated(
        ISuperToken superToken,
        address /* agreementClass */,
        bytes32 agreementId,
        bytes calldata /*agreementData*/,
        bytes calldata /*cbdata*/,
        bytes calldata ctx
    )
        external override
        returns(bytes memory newCtx)
    {
        _checkSubscription(superToken, ctx, agreementId);
        newCtx = ctx;
    }

    function _checkSubscription(
        ISuperToken superToken,
        bytes calldata ctx,
        bytes32 agreementId
    )
        private
    {
        ISuperfluid.Context memory context = _host.decodeCtx(ctx);
        // only interested in the subscription approval callbacks
        if (context.agreementSelector == IInstantDistributionAgreementV1.approveSubscription.selector) {
            address publisher;
            uint32 indexId;
            bool approved;
            uint128 units;
            uint256 pendingDistribution;
            (publisher, indexId, approved, units, pendingDistribution) =
                _ida.getSubscriptionByID(superToken, agreementId);

            // sanity checks for testing purpose
            require(publisher == address(this), "DRT: publisher mismatch");
            require(indexId == INDEX_ID, "DRT: publisher mismatch");

            if (approved) {
                isSubscribing[context.msgSender /* subscriber */] = true;
            }
        }
    }

    function modifySub(address user,uint128 shareUnits) internal{
        _host.callAgreement(
            _ida,
            abi.encodeWithSelector(
                _ida.updateSubscription.selector,
                fDAIx,
                INDEX_ID,
                user,
                shareUnits,
                new bytes(0) // placeholder ctx
            ),
            new bytes(0) // user data
        );
    }

    function abs(uint128 x,uint128 y) private pure returns (uint128) {
        if(x>y)
         return x-y;
        if(x<y)
         return y-x;
        if(x==y)
         return x;
    }

    function addUser(address newUser,uint128 sharePercentage) external onlyOwner{
        require(shareMapping[newUser]==0,"User already exists");
        require(sharePercentage>0,"Share Percentage should be greater than zero");

        uint128 shareUnits = totalShareUnits==0?100: (sharePercentage * totalShareUnits)/(100- sharePercentage);
        modifySub(newUser, shareUnits);
        totalShareUnits += shareUnits;
        shareMapping[newUser] = shareUnits;
        emit UserAdded(newUser,shareUnits,INDEX_ID,address(this),block.timestamp,totalShareUnits);
        emit TotalShares(totalShareUnits,INDEX_ID,address(this),block.timestamp);
    }

    function modifyUser(address existingUser,uint128 sharePercentage) external onlyOwner{
        require(shareMapping[existingUser]!=0,"User doesn't exist");
        require(sharePercentage>0,"Share Percentage should be greater than zero");
        uint128 shareUnits = totalShareUnits==shareMapping[existingUser]?100:(sharePercentage * abs(totalShareUnits,shareMapping[existingUser]))/(100- sharePercentage);
        modifySub(existingUser, shareUnits);
        totalShareUnits -= shareMapping[existingUser];//Need to handle case where shareMapping is larger than total share units
        totalShareUnits += shareUnits ;
        shareMapping[existingUser] = shareUnits;
        emit UserModified(existingUser,shareUnits,INDEX_ID,address(this),block.timestamp,totalShareUnits);
        emit TotalShares(totalShareUnits,INDEX_ID,address(this),block.timestamp);
    }

    function removeUser(address existingUser) external onlyOwner{
        require(shareMapping[existingUser]!=0,"User doesn't exist");
        totalShareUnits -= shareMapping[existingUser];
        shareMapping[existingUser] = 0;
        modifySub(existingUser, 0);
        emit UserRemoved(existingUser,0,INDEX_ID,address(this),block.timestamp,totalShareUnits);//Changed the shareUnits to zero to read in the frontend the exit of the user
        emit TotalShares(totalShareUnits,INDEX_ID,address(this),block.timestamp);
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
        emit Distribution(actualCashAmount,INDEX_ID,address(this),block.timestamp,tokenNameMapping[tokenAddress]);
    }

    function tokensReceived(
        address operator,
        address from,
        address to,
        uint256 amount,
        bytes calldata userData,
        bytes calldata operatorData
    ) external override {
        //require(msg.sender == address(_token), "Simple777Recipient: Invalid token");
        distribute(amount, msg.sender);
        emit DonationReceived( from, tokenNameMapping[msg.sender], amount,INDEX_ID,address(this),block.timestamp);
    }

    function _send(
        address sender, 
        address recipient, 
        uint256 amount, 
        bytes memory /* userData */, 
        bytes memory /* operatorData */, 
        bool /* requireReceptionAck */
    ) internal override {
        uint128 senderUnits = uint128(ERC777Upgradeable.balanceOf(sender));
        uint128 recipientUnits = uint128(ERC777Upgradeable.balanceOf(recipient));
        uint128 transfer = uint128(amount);

        ERC777Upgradeable._send(sender, recipient, amount, "", "", false);
        modifySub(sender, senderUnits - transfer);
        modifySub(recipient, recipientUnits + transfer);
    }
}