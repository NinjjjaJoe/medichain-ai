export type PaymentFrequency = 0 | 1 | 2;

export interface Employee {
  wallet: string;
  salaryAmount: bigint;
  paymentToken: string;
  frequency: PaymentFrequency;
  lastPaidTimestamp: bigint;
  active: boolean;
}

export interface Token {
  address: string;
  symbol: string;
  decimals: number;
}

export const FREQUENCY_LABELS: Record<PaymentFrequency, string> = {
  0: 'Weekly',
  1: 'Biweekly',
  2: 'Monthly',
};

export const FREQUENCY_DAYS: Record<PaymentFrequency, number> = {
  0: 7,
  1: 14,
  2: 30,
};
