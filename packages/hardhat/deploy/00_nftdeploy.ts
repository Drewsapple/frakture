import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deploy} = hre.deployments;
    const { deployer } = await hre.getNamedAccounts();
    console.log('pre deploy')
    const TicketFactory = await deploy("TicketFactory", {
        from: deployer,
        log: true,
        args: ["0xf57b2c51ded3a29e6891aba85459d600256cf317"],
    });
    console.log(await TicketFactory.receipt);

    const superfluidHost = "0xeD5B5b32110c3Ded02a07c8b8e97513FAfb883B6";
    const ida = "0x32E0ecb72C1dDD92B007405F8102c1556624264D";

    const ERC777Distributor = await deploy("ERC777Distributor", {
        from: deployer,
        log: true,
        args: [
            superfluidHost,
            ida,
            "Example Distributor Again",
            "eda",
            []
        ]
    })
    console.log(await ERC777Distributor.receipt);
    console.log("Single distributor deployed");

    const DistributorFactory = await deploy("DistributorFactory", {
        from: deployer,
        log: true,
        args: [
            superfluidHost,
            ida,
            ERC777Distributor.receipt?.contractAddress
        ]
    })

    console.log("Deployments complete");

};
export default func;
const tags = ["hdnft"]; 
export { tags };