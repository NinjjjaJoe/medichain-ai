# MediChain AI 🏥

> **AI-Powered Diagnostic Models on the Edge**

Token-gated marketplace for FDA-cleared AI diagnostic models. Run inferences locally on medical devices while maintaining HIPAA compliance—no PHI leaves your premises.

![MediChain Dashboard](https://placehold.co/1200x600/0a2540/ffffff?text=MediChain+AI+Dashboard)

## 🎯 What is MediChain?

MediChain AI is a decentralized marketplace for AI diagnostic models built on Ethereum-compatible chains (Base, Arbitrum). Each model is:

- **ERC-1155 NFT** with FDA clearance tracking
- **IPFS-hosted binaries** (ONNX/TFLite format)
- **Pay-per-inference** via InferToken (INFER)
- **Edge-deployable** - runs locally on medical devices

## ✨ Key Features

### For AI Labs & Developers
- 💰 Monetize diagnostic models with 95% revenue share
- 🔒 IP protection via on-chain licensing
- ⚡ Instant micropayments per inference
- 🏆 Reputation system with third-party audit badges

### For Healthcare Providers
- 🏥 Access verified AI models for X-ray, ultrasound, ECG analysis
- 🔐 Run models locally - maintain HIPAA compliance
- 📊 Transparent model performance metrics
- ✅ FDA/CE clearance verification on-chain

## 🏗️ Architecture

```
┌─────────────────┐
│  ModelNFT.sol   │  ERC-1155 NFTs for AI models
│  (ERC-1155)     │  - Model metadata (IPFS hash, FDA status)
└────────┬────────┘  - Ownership & access control
         │
         ├──────────┐
         │          │
┌────────▼────────┐ │  ┌────────────────────┐
│ InferToken.sol  │ │  │ Marketplace.sol    │
│  (ERC-20)       │ │  │                    │
│                 │ │  │ - Purchase models  │
│ - $INFER token  │ │  │ - Pay per inference│
│ - Micropayments │ │  │ - Creator earnings │
└─────────────────┘ │  └────────────────────┘
                    │
                    ▼
          ┌────────────────────┐
          │ Off-Chain Inference │
          │  (Edge Deployment)  │
          │                     │
          │ - Local GPU/TPU     │
          │ - ONNX/TFLite       │
          │ - No PHI upload     │
          └────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MetaMask or WalletConnect-compatible wallet
- Base Sepolia testnet ETH ([faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet))

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/medichain-ai.git
cd medichain-ai

# Install frontend dependencies
cd frontend
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Deploy Contracts (Optional)

```bash
# Install contract dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your private key

# Deploy to Base Sepolia
npx hardhat run scripts/deploy.js --network base-sepolia
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Blockchain** | Solidity 0.8.27, Hardhat |
| **Frontend** | React 19, TypeScript, Vite |
| **Web3** | Wagmi 3.x, RainbowKit 2.x, Ethers.js 6.x |
| **Smart Contracts** | ERC-1155 (Models), ERC-20 (INFER token) |
| **Storage** | IPFS (model binaries & metadata) |
| **Networks** | Base, Base Sepolia, Arbitrum |

## 📝 Smart Contracts

### ModelNFT.sol
```solidity
// Mint AI model as NFT
function mintModel(
    string memory ipfsHash,
    string memory name,
    uint256 price,
    bool fdaCleared
) external returns (uint256 modelId)
```

### InferToken.sol
```solidity
// ERC-20 token for inference payments
function transfer(address to, uint256 amount)
function approve(address spender, uint256 amount)
```

### MediChainMarketplace.sol
```solidity
// Purchase model access
function purchaseModel(uint256 modelId) external payable

// Pay for inference
function payForInference(uint256 modelId, uint256 amount) external
```

## 🔐 Security

- ✅ Reentrancy guards on all state-changing functions
- ✅ Access control via OpenZeppelin
- ✅ Pausable contracts for emergency stops
- ✅ Slither & Mythril static analysis (see `/audits`)
- ⚠️ **Contracts NOT audited** - use at your own risk on testnets only

## 🌐 Deployment

### Live Demo
**Frontend:** [https://medichain-ai.vercel.app](https://medichain-ai.vercel.app) (coming soon)

### Testnet Contracts (Base Sepolia)
```
ModelNFT:     0x0000000000000000000000000000000000000000 (TBD)
InferToken:   0x0000000000000000000000000000000000000000 (TBD)
Marketplace:  0x0000000000000000000000000000000000000000 (TBD)
```

## 📊 Use Cases

### 🏥 Private Imaging Centers
Run lung-nodule detection without uploading patient data to cloud providers

### 🔬 AI Research Labs
Monetize diagnostic models with compliant pay-per-use licensing

### 🏢 Hospital Networks
Access verified AI models for radiology, pathology, and cardiology

## 🎨 UI/UX Features

- 🌙 Tesla-inspired dark theme
- 📱 Fully responsive mobile design
- 🔗 WalletConnect integration
- 📊 Real-time inference tracking
- 🏆 Model reputation scores
- ✅ FDA clearance badges

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

### Development Workflow
```bash
# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and test
npm run build
npm run test

# Submit PR
git push origin feature/amazing-feature
```

## 📜 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

- OpenZeppelin for secure contract libraries
- RainbowKit for wallet UI
- Wagmi for React hooks
- IPFS for decentralized storage

## 📞 Contact

**King Z** - [@YOUR_TWITTER](https://twitter.com/)

**Project Link:** https://github.com/YOUR_USERNAME/medichain-ai

---

*Built with ❤️ for the future of decentralized healthcare AI*
