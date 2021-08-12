// SPDX-License-Identifier: MIT
// Modified from https://github.com/iamsahu/erc777distributor
pragma solidity ^0.8.0;
import './CloneFactory.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './BaseDistributor.sol';
import './Emitter.sol';

contract DistributorFactory is CloneFactory,Ownable{
    address emitterAdd;
    Emitter _emitter;
    address distributorContract;
    address[] public distributors;
    event ReceivingAddressCreated(address newThingAddress);

    address _host; 
    address _ida;
    address _fDAIx;
    address _fUSDCx;
    address _fTUSDx;
    address _ETHx;
    address _erc1820Add;

  constructor(
    address host, 
    address ida,
    address fDAIx,
    address fUSDCx,
    address fTUSDx,
    address fETHx,
    address erc1820Add,
    address emitr,
    address baseCont){
      _host=host; 
      _ida=ida;
      _fDAIx=fDAIx;
      _fUSDCx=fUSDCx;
      _fTUSDx=fTUSDx;
      _ETHx = fETHx;
      _erc1820Add=erc1820Add;

      emitterAdd = emitr;
      _emitter = Emitter(emitr);

      distributorContract = baseCont;
  }

  function EmitterAddress(address _libraryAddress) public onlyOwner{
    emitterAdd = _libraryAddress;
    _emitter = Emitter(_libraryAddress);
  }

  function ChangeTokenAddresses(address fDAIx,
    address fUSDCx,
    address fTUSDx,
    address fETHx) public onlyOwner{
      _fDAIx=fDAIx;
      _fUSDCx=fUSDCx;
      _fTUSDx=fTUSDx;
      _ETHx = fETHx;
  }

  function setDistributorAddress(address _libraryAddress) public onlyOwner {
    distributorContract = _libraryAddress;
  }

  function createThing(string memory _name) public {
    address clone = createClone(distributorContract);
    BaseDistributor(clone).initialize(_host,_ida,emitterAdd,msg.sender,_fDAIx,_fUSDCx,_fTUSDx,_ETHx,_erc1820Add);
    distributors.push(clone);
    _emitter.AddressCreated2(clone,msg.sender,block.timestamp,_name);
  }
}