const { ethers } = require("hardhat");
const hre = require("hardhat");

const bankAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

async function main() {
  const victim = hre.ethers.provider.getSigner(13);

  const bank = await hre.ethers.getContractAt("Bank", bankAddress);

  await bank
    .connect(victim)
    .deposit({ value: hre.ethers.utils.parseEther("100") });

  console.log(`Victim deposited ETH`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
