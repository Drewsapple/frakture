// deploy/02_deploy_distributor.js

const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  //   const superfluidHost = "0xeD5B5b32110c3Ded02a07c8b8e97513FAfb883B6";
  //   const ida = "0x32E0ecb72C1dDD92B007405F8102c1556624264D";

  //   const distDeployer = await ethers.getContractFactory("ERC777Distributor");
  //   const distributor = await distDeployer.deploy(
  //     superfluidHost,
  //     ida,
  //     "Example Distributor Again",
  //     "eda",
  //     []
  //   );
  //   const receipt = await distributor.deployTransaction.wait();
  //   console.log(receipt);
  //   deployments.save("ERC777Distributor", distributor)
  //   console.log("Single distributor deployed");

  //   const distFactoryDeployer = await ethers.getContractFactory(
  //     "DistributorFactory"
  //   );
  //   console.log("Now, the final deploy")
  //   const distFactory = await distFactoryDeployer.deploy(
  //     superfluidHost,
  //     ida,
  //     receipt.contractAddress
  //   );

  //   console.log("Deployments complete");
  //   deployments.save("DistributorFactory", distFactory);

  //   //console.log(await distFactory.createDistributor("Ticket", "tix", []));
};

module.exports.tags = ["distributor"];
