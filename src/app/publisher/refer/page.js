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

  useEffect(() => {
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
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Referral Program</h1>

      {error && (
        <div className="card" style={{ marginBottom: '1.5rem', borderColor: 'rgba(255, 77, 77, 0.3)', color: 'var(--danger)' }}>
          {error}
        </div>
      )}
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Earn {stats.bonusPercentage || '5%'} from referred publishers</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Share the registration URL below. The backend accepts `referralCode` during publisher signup and tracks referral stats through `/api/referrals/stats` and `/publisher/analytics/users`.
            </p>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Your Referral Link</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  value={referralLink} 
                  readOnly 
                  className="input" 
                  style={{ flex: 1, color: 'var(--accent-primary)', backgroundColor: 'var(--accent-light)' }} 
                />
                <button onClick={handleCopy} className="btn btn-primary" style={{ padding: '0 1rem' }}>
                  {copied ? 'Copied!' : <Copy size={18} />}
                </button>
              </div>
            </div>

            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Referral Code:</strong> {referralCode || 'Not available'}
            </div>
          </div>
          
          <div style={{ flex: '1 1 300px', display: 'grid', gap: '1rem' }}>
            <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '1rem', borderRadius: '50%', backgroundColor: 'rgba(0, 204, 102, 0.1)' }}>
                  <Users size={28} color="var(--success)" />
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)' }}>Referred Publishers</p>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{stats.totalReferredPublishers || users.length}</h3>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <BadgePercent size={24} color="var(--accent-primary)" />
                <span style={{ color: 'var(--text-secondary)' }}>Referral Bonus Rate</span>
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{stats.bonusPercentage || '5%'}</h3>
            </div>

            <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <Wallet size={24} color="var(--success)" />
                <span style={{ color: 'var(--text-secondary)' }}>API-Reported Referral Earnings</span>
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--success)' }}>${Number(stats.totalReferralEarnings || 0).toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card table-container">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Referred Users</h3>
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
