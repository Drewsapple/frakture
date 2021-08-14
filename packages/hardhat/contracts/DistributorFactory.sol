// SPDX-License-Identifier: MIT
// Modified from https://github.com/iamsahu/erc777distributor
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/proxy/Clones.sol';
import './ERC777Distributor.sol';
import {
    ISuperfluid
} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";
import {
    IInstantDistributionAgreementV1
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";

contract DistributorFactory is Ownable{
    address distributorContract;
    address[] public distributors;
    event ReceivingAddressCreated(address newThingAddress);
    event AddressCreated(address _address,address owner,uint timeStamp);

    ISuperfluid _host; 
    IInstantDistributionAgreementV1 _ida;

  constructor(
    ISuperfluid host, 
    IInstantDistributionAgreementV1 ida,
    address baseCont){
      _host=host; 
      _ida=ida;
      distributorContract = baseCont;
  }

  function createDistributor(string memory _name, string memory _symbol, address[] memory _defaultOperators) public {
    address clone = Clones.clone(distributorContract);
    ERC777Distributor(clone).initialize(_host,_ida, _name, _symbol, _defaultOperators);
    distributors.push(clone);
    emit AddressCreated(clone,msg.sender,block.timestamp);
  }
}