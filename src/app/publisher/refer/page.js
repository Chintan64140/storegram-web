'use client';
import { Copy, Users, BadgePercent, Wallet } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import api from '@/utils/api';
import { getStoredPublisherUser } from '@/utils/auth';
import PaginationControls from '@/components/PaginationControls';

export default function Refer() {
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    totalReferredPublishers: 0,
    totalReferralEarnings: 0,
    bonusPercentage: '5%',
  });
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const publisher = getStoredPublisherUser();
  const referralCode = publisher?.referral_code || '';
  const referralLink = useMemo(() => {
    if (typeof window === 'undefined') {
      return referralCode ? `/register?ref=${referralCode}` : '';
    }

    return referralCode ? `${window.location.origin}/register?ref=${referralCode}` : '';
  }, [referralCode]);

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        setError('');
        const [statsResponse, usersResponse] = await Promise.all([
          api.get('/api/referrals/stats'),
          api.get('/publisher/analytics/users', { params: { page, limit } }),
        ]);

        setStats(statsResponse.data || {});
        setUsers(usersResponse.data.data || []);
        setPagination(usersResponse.data.pagination || null);
      } catch (err) {
        console.error('Failed to load referral data', err);
        setError(err.response?.data?.error || 'Failed to load referral data.');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = window.setTimeout(() => {
      void fetchReferralData();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [page, limit]);

  const handleCopy = () => {
    if (!referralLink) {
      setError('Referral code is not available in your current session.');
      return;
    }

    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <div>Loading referral data...</div>;
  }

  return (
    <div className="animate-fade-in">
      <h1 className="mb-8 text-3xl font-extrabold sm:text-4xl">Referral Program</h1>

      {error && (
        <div className="card mb-6" style={{ borderColor: 'rgba(255, 77, 77, 0.3)', color: 'var(--danger)' }}>
          {error}
        </div>
      )}

      <div className="card mb-8">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h3 className="mb-4 text-xl font-bold">
              Earn {stats.bonusPercentage || '5%'} from referred publishers
            </h3>
            <p className="mb-6 text-sm leading-7 text-muted sm:text-base">
              Share the registration URL below. The backend accepts `referralCode` during
              publisher signup and tracks referral stats through `/api/referrals/stats` and
              `/publisher/analytics/users`.
            </p>

            <div className="mb-4">
              <label className="mb-2 block text-sm text-muted">Your Referral Link</label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="input flex-1"
                  style={{ color: 'var(--accent-primary)', backgroundColor: 'var(--accent-light)' }}
                />
                <button onClick={handleCopy} className="btn btn-primary w-full sm:w-auto">
                  {copied ? 'Copied!' : <Copy size={18} />}
                </button>
              </div>
            </div>

            <div className="text-sm text-muted">
              <strong className="text-foreground">Referral Code:</strong> {referralCode || 'Not available'}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl bg-surface-strong p-5">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-[rgba(0,204,102,0.1)] p-4">
                  <Users size={28} color="var(--success)" />
                </div>
                <div>
                  <p className="text-sm text-muted">Referred Publishers</p>
                  <h3 className="text-3xl font-bold">{stats.totalReferredPublishers || users.length}</h3>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-surface-strong p-5">
              <div className="mb-3 flex items-center gap-3">
                <BadgePercent size={24} color="var(--accent-primary)" />
                <span className="text-sm text-muted">Referral Bonus Rate</span>
              </div>
              <h3 className="text-3xl font-bold">{stats.bonusPercentage || '5%'}</h3>
            </div>

            <div className="rounded-2xl bg-surface-strong p-5">
              <div className="mb-3 flex items-center gap-3">
                <Wallet size={24} color="var(--success)" />
                <span className="text-sm text-muted">API-Reported Referral Earnings</span>
              </div>
              <h3 className="text-3xl font-bold text-success">
                ${Number(stats.totalReferralEarnings || 0).toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card table-container">
        <h3 className="mb-4 text-xl font-bold">Referred Users</h3>

        <div className="space-y-4 md:hidden">
          {users.map((user) => (
            <div key={user.id} className="rounded-2xl border border-border bg-surface-strong p-4">
              <div className="font-semibold text-white">{user.name || 'Unnamed User'}</div>
              <div className="mt-1 break-all text-sm text-muted">{user.email}</div>
              <div className="mt-3 grid gap-1 text-sm text-muted">
                <div>Role: {user.role}</div>
                <div>Joined: {new Date(user.created_at).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
          {users.length === 0 && (
            <div className="rounded-2xl border border-border bg-surface-strong p-4 text-center text-sm text-muted">
              No referred users yet.
            </div>
          )}
        </div>

        <div className="hidden md:block">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name || 'Unnamed User'}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>No referred users yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <PaginationControls
          pagination={pagination}
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
