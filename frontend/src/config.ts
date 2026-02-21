import { http, createConfig } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    injected(),
    walletConnect({ projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo' }),
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
})

// Contract addresses - UPDATE AFTER DEPLOYMENT
export const CONTRACT_ADDRESSES = {
  [base.id]: '0x0000000000000000000000000000000000000000', // TODO: Add mainnet address
  [baseSepolia.id]: '0x0000000000000000000000000000000000000000', // TODO: Add testnet address
}

// Token addresses on Base
export const TOKEN_ADDRESSES = {
  [base.id]: {
    USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    USDT: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2',
  },
  [baseSepolia.id]: {
    USDC: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // Testnet USDC
    USDT: '0x0000000000000000000000000000000000000000', // Use ETH for testing
  },
}
