const { ethers } = require("hardhat");
const hre = require("hardhat");

const bankAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

async function main() {
  //   const bank = await hre.ethers.getContractAt("Bank", bankAddress);

  const bankBalance = await hre.ethers.provider.getBalance(bankAddress);

  console.log(`Bank balance: ${ethers.utils.formatEther(bankBalance)} ETH`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
