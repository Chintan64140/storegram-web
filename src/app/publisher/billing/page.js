'use client';
import { DollarSign, ArrowRightLeft, CheckCircle, Clock, ReceiptText } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import PaginationControls from '@/components/PaginationControls';

export default function Billing() {
  const [amount, setAmount] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [earnings, setEarnings] = useState({
    walletBalance: 0,
    totalEarned: 0,
    transactions: [],
    pagination: null,
  });

  const loadEarnings = async () => {
    try {
      setError('');
      const response = await api.get('/api/payments/earnings', { params: { page, limit } });
      setEarnings(response.data || {});
    } catch (err) {
      console.error('Failed to fetch earnings', err);
      setError(err.response?.data?.error || 'Failed to load billing data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadEarnings();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [page, limit]);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      setError('Enter a withdrawal amount greater than zero.');
      return;
    }

    setSubmitting(true);
    setError('');
    setMessage('');

    try {
      const response = await api.post('/api/payments/request', {
        amount: numericAmount,
        referenceId: referenceId.trim() || undefined,
      });

      setMessage(response.data.message || 'Withdrawal request submitted.');
      setAmount('');
      setReferenceId('');
      setEarnings((current) => ({
        ...current,
        walletBalance: response.data.walletBalance ?? current.walletBalance,
      }));
      await loadEarnings();
    } catch (err) {
      console.error('Withdrawal request failed', err);
      setError(err.response?.data?.error || 'Failed to submit withdrawal request.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading billing data...</div>;
  }

  const approvedTransactions = (earnings.transactions || []).filter((transaction) => transaction.status === 'APPROVED').length;
  const pendingTransactions = (earnings.transactions || []).filter((transaction) => transaction.status === 'PENDING').length;

  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Billing & Withdrawals</h1>

      {(error || message) && (
        <div
          className="card"
          style={{
            marginBottom: '1.5rem',
            borderColor: error ? 'rgba(255, 77, 77, 0.3)' : 'rgba(0, 204, 102, 0.3)',
            color: error ? 'var(--danger)' : 'var(--success)'
          }}
        >
          {error || message}
        </div>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '1rem', borderRadius: '50%', backgroundColor: 'rgba(0, 204, 102, 0.1)' }}>
              <DollarSign size={32} color="var(--success)" />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)' }}>Available Balance</p>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>${Number(earnings.walletBalance || 0).toFixed(2)}</h2>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            API total earned: ${Number(earnings.totalEarned || 0).toFixed(2)}
          </p>
        </div>

        <div className="card" style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ReceiptText size={24} color="var(--accent-primary)" />
            <div>
              <p style={{ color: 'var(--text-secondary)' }}>Approved Transactions</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{approvedTransactions}</h3>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Clock size={24} color="#ffcc00" />
            <div>
              <p style={{ color: 'var(--text-secondary)' }}>Pending Withdrawals</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{pendingTransactions}</h3>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Request Withdrawal via API</h3>
          <form onSubmit={handleWithdraw} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Amount to Withdraw ($)</label>
              <input 
                type="number" 
                className="input" 
                placeholder="0.00" 
                min="0.01" 
                step="0.01" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required 
              />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Reference / Payout Details</label>
              <input
                type="text"
                className="input"
                placeholder="Bank details, UPI, transfer note, etc."
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
              />
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                The backend expects this in the `referenceId` field for `POST /api/payments/request`.
              </p>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }} disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Withdrawal Request'}
            </button>
          </form>
        </div>
      </div>

      <div className="card table-container">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Transaction History</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction Ref</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(earnings.transactions || []).map(tx => (
              <tr key={tx.id}>
                <td>{tx.created_at ? new Date(tx.created_at).toLocaleDateString() : 'N/A'}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{tx.reference_id || 'N/A'}</td>
                <td style={{ fontWeight: 'bold', color: Number(tx.amount) >= 0 ? 'var(--success)' : 'var(--text-primary)' }}>
                  ${Math.abs(Number(tx.amount || 0)).toFixed(2)} {Number(tx.amount) < 0 ? 'withdrawal' : 'earning'}
                </td>
                <td>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      color: tx.status === 'APPROVED' ? 'var(--success)' : tx.status === 'PENDING' ? '#ffcc00' : 'var(--danger)'
                    }}
                  >
                    {tx.status === 'APPROVED' ? <CheckCircle size={12} /> : tx.status === 'PENDING' ? <Clock size={12} /> : <ArrowRightLeft size={12} />}
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
            {(earnings.transactions || []).length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
        <PaginationControls
          pagination={earnings.pagination}
          onPageChange={setPage}
          onLimitChange={(nextLimit) => {
            setLimit(nextLimit);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
}
