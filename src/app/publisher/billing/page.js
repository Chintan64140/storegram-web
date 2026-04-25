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

  useEffect(() => {
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

      const refreshedResponse = await api.get('/api/payments/earnings', { params: { page, limit } });
      setEarnings(refreshedResponse.data || {});
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

  const approvedTransactions = (earnings.transactions || []).filter(
    (transaction) => transaction.status === 'APPROVED'
  ).length;
  const pendingTransactions = (earnings.transactions || []).filter(
    (transaction) => transaction.status === 'PENDING'
  ).length;

  return (
    <div className="animate-fade-in">
      <h1 className="mb-8 text-3xl font-extrabold sm:text-4xl">Billing & Withdrawals</h1>

      {(error || message) && (
        <div
          className="card mb-6"
          style={{
            borderColor: error ? 'rgba(255, 77, 77, 0.3)' : 'rgba(0, 204, 102, 0.3)',
            color: error ? 'var(--danger)' : 'var(--success)',
          }}
        >
          {error || message}
        </div>
      )}

      <div className="mb-8 grid gap-6 xl:grid-cols-3">
        <div className="card flex flex-col justify-center">
          <div className="mb-4 flex items-center gap-4">
            <div className="rounded-full bg-[rgba(0,204,102,0.1)] p-4">
              <DollarSign size={32} color="var(--success)" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-muted">Available Balance</p>
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                ${Number(earnings.walletBalance || 0).toFixed(2)}
              </h2>
            </div>
          </div>
          <p className="text-sm text-muted">
            Total earned so far: ${Number(earnings.totalEarned || 0).toFixed(2)}
          </p>
        </div>

        <div className="card grid gap-4">
          <div className="flex items-center gap-3">
            <ReceiptText size={24} color="var(--accent-primary)" />
            <div>
              <p className="text-sm text-muted">Approved Transactions</p>
              <h3 className="text-2xl font-bold">{approvedTransactions}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={24} color="#ffcc00" />
            <div>
              <p className="text-sm text-muted">Pending Withdrawals</p>
              <h3 className="text-2xl font-bold">{pendingTransactions}</h3>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="mb-4 text-xl font-bold">Request Withdrawal via API</h3>
          <form onSubmit={handleWithdraw} className="grid gap-4">
            <div className="input-group">
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
            <div className="input-group">
              <label>Reference / Payout Details</label>
              <input
                type="text"
                className="input"
                placeholder="Bank details, UPI, transfer note, etc."
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
              />
              <p className="text-sm text-muted">
                Add your payout note or transfer details so the team can process the request correctly.
              </p>
            </div>
            <button type="submit" className="btn btn-primary mt-2 w-full sm:w-auto" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Withdrawal Request'}
            </button>
          </form>
        </div>
      </div>

      <div className="card table-container">
        <h3 className="mb-5 text-xl font-bold">Transaction History</h3>

        <div className="space-y-4 md:hidden">
          {(earnings.transactions || []).map((tx) => (
            <div key={tx.id} className="rounded-2xl border border-border bg-surface-strong p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-muted">
                    {tx.created_at ? new Date(tx.created_at).toLocaleDateString() : 'N/A'}
                  </div>
                  <div className="mt-1 break-all text-sm text-muted">{tx.reference_id || 'N/A'}</div>
                </div>
                <span
                  className="inline-flex items-center gap-1 text-sm font-semibold"
                  style={{
                    color:
                      tx.status === 'APPROVED'
                        ? 'var(--success)'
                        : tx.status === 'PENDING'
                          ? '#ffcc00'
                          : 'var(--danger)',
                  }}
                >
                  {tx.status === 'APPROVED' ? <CheckCircle size={12} /> : tx.status === 'PENDING' ? <Clock size={12} /> : <ArrowRightLeft size={12} />}
                  {tx.status}
                </span>
              </div>
              <div className="mt-3 text-base font-bold" style={{ color: Number(tx.amount) >= 0 ? 'var(--success)' : 'var(--text-primary)' }}>
                ${Math.abs(Number(tx.amount || 0)).toFixed(2)} {Number(tx.amount) < 0 ? 'withdrawal' : 'earning'}
              </div>
            </div>
          ))}
          {(earnings.transactions || []).length === 0 && (
            <div className="rounded-2xl border border-border bg-surface-strong p-4 text-center text-sm text-muted">
              No transactions found.
            </div>
          )}
        </div>

        <div className="hidden md:block">
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
              {(earnings.transactions || []).map((tx) => (
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
                        color:
                          tx.status === 'APPROVED'
                            ? 'var(--success)'
                            : tx.status === 'PENDING'
                              ? '#ffcc00'
                              : 'var(--danger)',
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
        </div>

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
