import { formatUnits } from 'viem';

export function formatTokenAmount(amount: bigint, decimals: number, symbol: string): string {
  const formatted = formatUnits(amount, decimals);
  return `${parseFloat(formatted).toFixed(decimals === 6 ? 2 : 4)} ${symbol}`;
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatDate(timestamp: bigint): string {
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getNextPaymentDate(lastPaid: bigint, frequencyDays: number): Date {
  const lastPaidDate = new Date(Number(lastPaid) * 1000);
  const nextDate = new Date(lastPaidDate.getTime() + (frequencyDays * 24 * 60 * 60 * 1000));
  return nextDate;
}

export function isPaymentOverdue(lastPaid: bigint, frequencyDays: number): boolean {
  const nextDate = getNextPaymentDate(lastPaid, frequencyDays);
  return nextDate.getTime() < Date.now();
}
