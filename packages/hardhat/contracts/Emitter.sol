// SPDX-License-Identifier: MIT
// Modified from https://github.com/iamsahu/erc777distributor
pragma solidity ^0.8.0;
// note We need to think of how to prevent anybody from using the emitter. This could result in false entries coming up in the dashboard
contract Emitter{
    event DonationReceived(address from, string token, uint256 amount,uint32 index,address publisher,uint timeStamp,address owner);
    event UserAdded(address userAddress,uint128 shares,uint32 index,address publisher,uint timeStamp,uint128 totalShares,address owner,string _name);
    event UserRemoved(address userAddress,uint128 shares,uint32 index,address publisher,uint timeStamp,uint128 totalShares,address owner);
    event UserModified(address userAddress,uint128 shares,uint32 index,address publisher,uint timeStamp,uint128 totalShares,address owner);
    event Distribution(uint256 amountDistributed,uint32 index,address publisher,uint timeStamp,string token,address owner);
    event TotalShares(uint128 totalShares,uint32 index,address publisher,uint timeStamp,address owner);
    event AddressCreated(address _address,address owner,uint timeStamp,string name);
    event ModifyContractName(address _address,address owner,uint timeStamp,string name);
    event ReceiverNameModified(address userAddress,uint32 index,address publisher,uint timeStamp,address owner,string _name);

    function DonationReceived2(address from, string memory token, uint256 amount,uint32 index,address publisher,uint timeStamp,address owner) external {
        emit DonationReceived(from, token, amount,index,publisher,timeStamp, owner);
    }
    function UserAdded2(address userAddress,uint128 shares,uint32 index,address publisher,uint timeStamp,uint128 totalShares,address owner,string memory _name) external {
        emit UserAdded(userAddress,shares,index,publisher,timeStamp,totalShares,owner,_name);
    }
    function UserRemoved2(address userAddress,uint128 shares,uint32 index,address publisher,uint timeStamp,uint128 totalShares,address owner) external {
        emit UserRemoved(userAddress,shares,index,publisher,timeStamp,totalShares, owner);
    }
    function UserModified2(address userAddress,uint128 shares,uint32 index,address publisher,uint timeStamp,uint128 totalShares,address owner) external {
        emit UserModified(userAddress,shares,index,publisher,timeStamp,totalShares, owner);
    }
    function Distribution2(uint256 amountDistributed,uint32 index,address publisher,uint timeStamp,string memory token,address owner) external {
        emit Distribution(amountDistributed,index,publisher,timeStamp,token, owner);
    }
    function TotalShares2(uint128 totalShares,uint32 index,address publisher,uint timeStamp,address owner) external {
        emit TotalShares(totalShares,index,publisher,timeStamp, owner);
    }

    function AddressCreated2(address _address,address owner,uint timeStamp,string memory _name) external{
        emit AddressCreated(_address, owner,timeStamp,_name);
    }
    
    function ModifyContractName2(address _address,address owner,uint timeStamp,string memory _name) external{
        emit ModifyContractName(_address, owner,timeStamp,_name);
    }

    function ReceiverNameModified2(address userAddress,uint32 index,address publisher,uint timeStamp,address owner,string memory _name) external{
        emit ReceiverNameModified(userAddress, index, publisher, timeStamp, owner,_name);
    }
}