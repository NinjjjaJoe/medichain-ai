import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, ConnectButton, darkTheme } from '@rainbow-me/rainbowkit'
import { http, createConfig } from 'wagmi'
import { base, baseSepolia, localhost } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'
import App from './App'
import '@rainbow-me/rainbowkit/styles.css'
import './index.css'

const config = createConfig({
  chains: [localhost, baseSepolia, base],
  connectors: [
    injected(),
    walletConnect({ projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo' }),
  ],
  transports: {
    [localhost.id]: http(),
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
})

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          <div style={{ padding: '20px 20px 0', display: 'flex', justifyContent: 'flex-end', background: '#0a2540' }}>
            <ConnectButton />
          </div>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
