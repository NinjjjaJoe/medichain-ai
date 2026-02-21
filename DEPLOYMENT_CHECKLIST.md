# 🚀 MediChain AI - Complete Deployment Checklist

## ✅ Current Status

- ✅ **Smart Contracts Written** (InferToken, ModelNFT, MediChainMarketplace)
- ✅ **Frontend Built** (React + Vite + Wagmi + RainbowKit)
- ✅ **Deployment Scripts Ready**
- ⏳ **Smart Contracts NOT Deployed**
- ⏳ **Frontend NOT Deployed**

---

## 🎯 Quick Deploy (Frontend Only - 2 Minutes)

If you just want to deploy the frontend with UI demo:

```bash
cd /root/clawd/medichain-ai/frontend
vercel login
vercel --prod
```

✅ **Result:** Live demo at `https://medichain-ai-xxxxx.vercel.app`  
⚠️ **Note:** Wallet features won't work until contracts are deployed

---

## 🔧 Full Deployment (Frontend + Smart Contracts - 15 Minutes)

### Step 1: Prepare Environment Variables

```bash
cd /root/clawd/medichain-ai
cp .env.example .env
nano .env  # or vim .env
```

Add your details:
```bash
PRIVATE_KEY=0x...your_wallet_private_key...
BASESCAN_API_KEY=...get_from_basescan.org...
```

**⚠️ Security:**
- Use a NEW wallet for deployment (don't use your main wallet)
- Fund it with only enough ETH for deployment (~0.01 ETH on Base Sepolia)
- Never commit the `.env` file to git

### Step 2: Get Testnet ETH

Get Base Sepolia testnet ETH from:
- [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
- [Alchemy Faucet](https://www.alchemy.com/faucets/base-sepolia)

Send to your deployment wallet address.

### Step 3: Deploy Smart Contracts

```bash
cd /root/clawd/medichain-ai

# Compile contracts
npm run compile

# Deploy to Base Sepolia testnet
npm run deploy:sepolia
```

**Expected output:**
```
Deploying contracts with account: 0x...
✅ InferToken deployed to: 0x...
✅ ModelNFT deployed to: 0x...
✅ MediChainMarketplace deployed to: 0x...
```

**Copy these addresses!** You'll need them next.

### Step 4: Update Frontend Config

Edit `frontend/src/config.ts` (or wherever contract addresses are stored):

```typescript
export const CONTRACTS = {
  InferToken: '0x...YOUR_INFER_TOKEN_ADDRESS...',
  ModelNFT: '0x...YOUR_MODEL_NFT_ADDRESS...',
  Marketplace: '0x...YOUR_MARKETPLACE_ADDRESS...'
}

export const CHAIN_ID = 84532 // Base Sepolia
```

### Step 5: Verify Contracts (Optional but Recommended)

```bash
# InferToken
npx hardhat verify --network baseSepolia 0xINFER_TOKEN_ADDRESS "1000000000000000000000000"

# ModelNFT
npx hardhat verify --network baseSepolia 0xMODEL_NFT_ADDRESS

# Marketplace
npx hardhat verify --network baseSepolia 0xMARKETPLACE_ADDRESS 0xMODEL_NFT_ADDRESS 0xINFER_TOKEN_ADDRESS
```

✅ **Result:** Verified contracts on [Basescan](https://sepolia.basescan.org)

### Step 6: Rebuild Frontend

```bash
cd frontend
npm run build
```

### Step 7: Deploy Frontend to Vercel

**Option A: Vercel CLI**
```bash
cd /root/clawd/medichain-ai/frontend
vercel login
vercel --prod
```

**Option B: GitHub + Vercel Dashboard**
```bash
cd /root/clawd/medichain-ai
git add .
git commit -m "Deploy MediChain AI"
git push origin main
```

Then go to [vercel.com/new](https://vercel.com/new) and import the repo.

**Important:** Set root directory to `frontend` in Vercel settings.

### Step 8: Add Environment Variables in Vercel

In Vercel Dashboard → Settings → Environment Variables:

Add:
- `VITE_WALLETCONNECT_PROJECT_ID` = Get from [cloud.walletconnect.com](https://cloud.walletconnect.com)

Redeploy after adding.

### Step 9: Test Full Flow

1. Visit your deployed site: `https://medichain-ai-xxxxx.vercel.app`
2. Connect wallet (switch to Base Sepolia network)
3. Test features:
   - View marketplace
   - Connect wallet
   - Browse models
   - Purchase model (if you minted test models)

---

## 📊 Deployment Cost Estimate

### Base Sepolia (Testnet)
- **InferToken:** ~0.0005 ETH
- **ModelNFT:** ~0.0015 ETH
- **MediChainMarketplace:** ~0.002 ETH
- **Total:** ~0.004 ETH (~$0.01 USD equivalent, FREE from faucet)

### Base Mainnet (Production)
- **Estimated Total:** ~0.003 ETH (~$10 USD at current prices)
- **Note:** Base L2 is much cheaper than Ethereum mainnet

### Vercel Hosting
- **Free** (Hobby tier)
- Includes: 100 GB bandwidth, unlimited projects

---

## 🧪 Post-Deployment Testing

### Create Test Models

Create a script `scripts/mint-test-models.ts`:

```typescript
import { ethers } from "hardhat";

async function main() {
  const modelNFTAddress = "0xYOUR_MODEL_NFT_ADDRESS";
  const ModelNFT = await ethers.getContractAt("ModelNFT", modelNFTAddress);

  // Mint test model
  const tx = await ModelNFT.mintModel(
    "QmXxxx...IPFS_HASH...",
    "Lung Cancer Detection AI",
    ethers.parseEther("100"), // Price: 100 INFER tokens
    true // FDA cleared
  );
  
  await tx.wait();
  console.log("Test model minted!");
}

main();
```

Run: `npx hardhat run scripts/mint-test-models.ts --network baseSepolia`

---

## 🐛 Troubleshooting

### Contract Deployment Fails

**Error: Insufficient funds**
- Get more testnet ETH from faucet
- Check wallet balance: Add network to MetaMask, view balance

**Error: Nonce too high**
- Wait a few minutes and retry
- Or reset account in MetaMask (Settings → Advanced → Reset Account)

**Error: Contract size too large**
- Already optimized with `runs: 200` in hardhat.config.ts
- If still too large, reduce optimizer runs to 100

### Frontend Build Fails

```bash
cd /root/clawd/medichain-ai/frontend
rm -rf dist node_modules package-lock.json
npm install
npm run build
```

### Vercel Deployment Fails

- Check build logs in Vercel dashboard
- Make sure root directory is set to `frontend`
- Verify `vercel.json` exists in frontend folder

### Wallet Connection Issues

- Clear browser cache
- Try different wallet (MetaMask, Coinbase Wallet, WalletConnect)
- Make sure you're on Base Sepolia network (Chain ID 84532)
- Check browser console for errors

---

## 📋 Quick Commands Reference

```bash
# Smart Contracts
npm run compile              # Compile contracts
npm run test                # Run tests
npm run deploy:sepolia      # Deploy to testnet
npm run deploy:base         # Deploy to mainnet

# Frontend
cd frontend
npm run dev                 # Local dev server
npm run build              # Build for production
npm run preview            # Preview production build

# Deployment
vercel login               # Login to Vercel
vercel                     # Deploy preview
vercel --prod             # Deploy to production

# Contract Verification
npx hardhat verify --network baseSepolia <address> <constructor-args>
```

---

## 🎉 Success Checklist

- [ ] Smart contracts deployed to Base Sepolia
- [ ] Contracts verified on Basescan
- [ ] Frontend config updated with contract addresses
- [ ] Frontend deployed to Vercel
- [ ] WalletConnect Project ID added
- [ ] Wallet connection tested
- [ ] Test models minted
- [ ] Full user flow tested
- [ ] Custom domain added (optional)
- [ ] Analytics enabled (optional)

---

## 🔗 Useful Links

- [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
- [Basescan Testnet](https://sepolia.basescan.org)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [WalletConnect Cloud](https://cloud.walletconnect.com)
- [Base Docs](https://docs.base.org)
- [Hardhat Docs](https://hardhat.org/docs)

---

**Status:** Ready for deployment! 🚀  
**Estimated Time:** 15 minutes (with testnet ETH ready)  
**Difficulty:** Intermediate

🥷 **Need help?** Check the main README.md or ask!
