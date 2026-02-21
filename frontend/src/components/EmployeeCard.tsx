import { useReadContract } from 'wagmi';
import { PayrollABI } from '../PayrollABI';
import type { Employee } from '../types';
import { FREQUENCY_LABELS, FREQUENCY_DAYS } from '../types';
import { useTokenByAddress } from '../hooks/useTokens';
import { formatTokenAmount, formatAddress, formatDate, getNextPaymentDate, isPaymentOverdue } from '../utils/format';

interface EmployeeCardProps {
  address: string;
  contractAddress: string;
  onPay?: (addr: string) => void;
  isConfirming: boolean;
  isEmployee?: boolean;
}

export function EmployeeCard({ 
  address, 
  contractAddress, 
  onPay, 
  isConfirming,
  isEmployee = false 
}: EmployeeCardProps) {
  const { data: employee } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: PayrollABI,
    functionName: 'employees',
    args: [address as `0x${string}`],
  }) as { data: Employee | undefined };

  const { data: isDue } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: PayrollABI,
    functionName: 'isPaymentDue',
    args: [address as `0x${string}`],
  });

  const token = useTokenByAddress(employee?.paymentToken || '0x0000000000000000000000000000000000000000');

  if (!employee || !employee.active) {
    return isEmployee ? (
      <div className="empty-state">
        <p>❌ You are not registered as an employee</p>
        <p className="info-text">Contact your admin to be added to payroll</p>
      </div>
    ) : null;
  }

  const frequencyLabel = FREQUENCY_LABELS[employee.frequency];
  const frequencyDays = FREQUENCY_DAYS[employee.frequency];
  const nextPaymentDate = getNextPaymentDate(employee.lastPaidTimestamp, frequencyDays);
  const overdue = isPaymentOverdue(employee.lastPaidTimestamp, frequencyDays);

  return (
    <li className={`employee-card ${isDue ? 'due' : ''} ${overdue ? 'overdue' : ''}`}>
      <div className="employee-info">
        <div className="employee-header">
          <strong>👤 {formatAddress(address)}</strong>
          {isDue && <span className="badge due-badge">💸 Payment Due</span>}
          {overdue && <span className="badge overdue-badge">🚨 Overdue</span>}
        </div>
        
        <div className="employee-details">
          <p>
            <span className="label">Salary:</span> 
            {token ? formatTokenAmount(employee.salaryAmount, token.decimals, token.symbol) : 'Loading...'}
          </p>
          <p>
            <span className="label">Frequency:</span> {frequencyLabel} ({frequencyDays} days)
          </p>
          <p>
            <span className="label">Last Paid:</span> {formatDate(employee.lastPaidTimestamp)}
          </p>
          <p>
            <span className="label">Next Payment:</span> {nextPaymentDate.toLocaleDateString()}
            {overdue && ' (Past Due!)'}
          </p>
        </div>
      </div>
      
      {!isEmployee && onPay && isDue && (
        <button 
          onClick={() => onPay(address)} 
          disabled={isConfirming}
          className="pay-btn"
        >
          {isConfirming ? '⏳ Paying...' : '💸 Pay Now'}
        </button>
      )}
    </li>
  );
}
