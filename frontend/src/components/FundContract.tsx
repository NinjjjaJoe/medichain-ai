import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi';
import { parseUnits, formatEther } from 'viem';
import { PayrollABI } from '../PayrollABI';
import { useTokens } from '../hooks/useTokens';
import type { Token } from '../types';

interface FundContractProps {
  contractAddress: string;
}

export function FundContract({ contractAddress }: FundContractProps) {
  const tokens = useTokens();
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState<Token>(tokens[0]);
  const [showForm, setShowForm] = useState(false);

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  // Get contract balance
  const { data: ethBalance } = useBalance({
    address: contractAddress as `0x${string}`,
  });

  const handleFund = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      const parsedAmount = parseUnits(amount, selectedToken.decimals);

      if (selectedToken.address === '0x0000000000000000000000000000000000000000') {
        // ETH deposit
        writeContract({
          address: contractAddress as `0x${string}`,
          abi: PayrollABI,
          functionName: 'depositFunds',
          args: ['0x0000000000000000000000000000000000000000' as `0x${string}`, 0n],
          value: parsedAmount,
        });
      } else {
        // ERC20 deposit (requires approval first)
        alert('ERC20 deposits require token approval first. Coming soon!');
        // TODO: Add approve + depositFunds flow
      }
    } catch (error) {
      console.error('Error funding contract:', error);
      alert('Failed to fund contract');
    }
  };

  return (
    <div className="fund-contract">
      <div className="balance-display">
        <h3>💰 Contract Balance</h3>
        <p className="balance-amount">
          {ethBalance ? `${parseFloat(formatEther(ethBalance.value)).toFixed(4)} ETH` : '0 ETH'}
        </p>
      </div>

      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="fund-btn">
          + Fund Contract
        </button>
      ) : (
        <form onSubmit={handleFund} className="form fund-form">
          <h3>Fund Payroll Contract</h3>
          
          <select 
            value={selectedToken.symbol} 
            onChange={(e) => {
              const token = tokens.find(t => t.symbol === e.target.value);
              if (token) setSelectedToken(token);
            }}
          >
            {tokens.map(token => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol}
              </option>
            ))}
          </select>

          <input
            type="number"
            step="0.0001"
            placeholder={`Amount (${selectedToken.symbol})`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <div className="button-group">
            <button type="submit" disabled={isPending || isConfirming}>
              {isPending || isConfirming ? '⏳ Confirming...' : `Deposit ${selectedToken.symbol}`}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
              Cancel
            </button>
          </div>

          {selectedToken.address !== '0x0000000000000000000000000000000000000000' && (
            <p className="info-text">
              ℹ️ ERC20 deposits require token approval. Use ETH for now.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
