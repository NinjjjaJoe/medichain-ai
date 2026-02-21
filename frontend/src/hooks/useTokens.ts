import { useChainId } from 'wagmi';
import { TOKEN_ADDRESSES } from '../config';
import type { Token } from '../types';

export function useTokens(): Token[] {
  const chainId = useChainId();
  
  const tokens: Token[] = [
    {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'ETH',
      decimals: 18,
    },
  ];

  // Add network-specific tokens
  const networkTokens = TOKEN_ADDRESSES[chainId as keyof typeof TOKEN_ADDRESSES];
  
  if (networkTokens) {
    if (networkTokens.USDC) {
      tokens.push({
        address: networkTokens.USDC,
        symbol: 'USDC',
        decimals: 6,
      });
    }
    if (networkTokens.USDT && networkTokens.USDT !== '0x0000000000000000000000000000000000000000') {
      tokens.push({
        address: networkTokens.USDT,
        symbol: 'USDT',
        decimals: 6,
      });
    }
  }

  return tokens;
}

export function useTokenByAddress(address: string): Token | undefined {
  const tokens = useTokens();
  return tokens.find(t => t.address.toLowerCase() === address.toLowerCase());
}
