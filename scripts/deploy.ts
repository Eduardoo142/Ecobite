import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Desplegando contrato con la cuenta:", deployer.address);

  const ContractFactory = await ethers.getContractFactory("ProductRegistry");
  const contract = await ContractFactory.deploy();

  await contract.waitForDeployment();
  console.log("Contrato desplegado en:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
