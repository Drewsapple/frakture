// deploy/01_deploy_nft.js

const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

//const { utils } = require("ethers");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

//   const tfDeployer = await ethers.getContractFactory("TicketFactory");
//   const ticketFactory = await tfDeployer.deploy(
//     "0xf57b2c51ded3a29e6891aba85459d600256cf317"
//   );
//   const receipt = await ticketFactory.deployTransaction.wait();

//   deployments.save("TicketFactory", ticketFactory);
//   await ticketFactory.mint(
//     BigNumber.from(1),
//     deployer,
//     "bafyreidduqggxoccbonf5tbxexbbtdevjqrs5hdjbuxvpad6pfs6awniei"
//   );
};

module.exports.tags = ["nft"];
