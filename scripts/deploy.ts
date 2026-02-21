import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // Deploy InferToken (ERC-20)
  console.log("\n📝 Deploying InferToken...");
  const InferToken = await ethers.getContractFactory("InferToken");
  const inferToken = await InferToken.deploy(
    ethers.parseEther("1000000") // Initial supply: 1 million tokens
  );
  await inferToken.waitForDeployment();
  const inferTokenAddress = await inferToken.getAddress();
  console.log("✅ InferToken deployed to:", inferTokenAddress);

  // Deploy ModelNFT (ERC-1155)
  console.log("\n📝 Deploying ModelNFT...");
  const ModelNFT = await ethers.getContractFactory("ModelNFT");
  const modelNFT = await ModelNFT.deploy();
  await modelNFT.waitForDeployment();
  const modelNFTAddress = await modelNFT.getAddress();
  console.log("✅ ModelNFT deployed to:", modelNFTAddress);

  // Deploy MediChainMarketplace
  console.log("\n📝 Deploying MediChainMarketplace...");
  const Marketplace = await ethers.getContractFactory("MediChainMarketplace");
  const marketplace = await Marketplace.deploy(
    modelNFTAddress,
    inferTokenAddress
  );
  await marketplace.waitForDeployment();
  const marketplaceAddress = await marketplace.getAddress();
  console.log("✅ MediChainMarketplace deployed to:", marketplaceAddress);

  // Set marketplace address in ModelNFT
  console.log("\n🔗 Setting marketplace address in ModelNFT...");
  const setMarketplaceTx = await modelNFT.setMarketplace(marketplaceAddress);
  await setMarketplaceTx.wait();
  console.log("✅ Marketplace address set");

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("🎉 DEPLOYMENT COMPLETE!");
  console.log("=".repeat(60));
  console.log("\nContract Addresses:");
  console.log("-------------------");
  console.log("InferToken:           ", inferTokenAddress);
  console.log("ModelNFT:             ", modelNFTAddress);
  console.log("MediChainMarketplace: ", marketplaceAddress);
  console.log("\n📋 Next Steps:");
  console.log("1. Update frontend/src/config.ts with these addresses");
  console.log("2. Verify contracts on Basescan:");
  console.log("   npx hardhat verify --network baseSepolia", inferTokenAddress, ethers.parseEther("1000000").toString());
  console.log("   npx hardhat verify --network baseSepolia", modelNFTAddress);
  console.log("   npx hardhat verify --network baseSepolia", marketplaceAddress, modelNFTAddress, inferTokenAddress);
  console.log("3. Mint some test models");
  console.log("4. Deploy frontend to Vercel");
  console.log("\n" + "=".repeat(60));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
