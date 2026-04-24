'use client';
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getPublisherToken, getStoredPublisherUser, isPublisherUser, setPublisherSession } from '@/utils/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') || '/publisher';
  const reason = searchParams.get('reason');
  const approvalMessage =
    reason === 'approval'
      ? 'Your publisher account is still waiting for admin approval.'
      : '';

  useEffect(() => {
    const token = getPublisherToken();
    const user = getStoredPublisherUser();

    if (token && isPublisherUser(user) && user.is_approved) {
      router.replace(nextPath);
    }
  }, [nextPath, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/api/auth/login', { email, password });

      if (!isPublisherUser(response.data.user)) {
        throw new Error('This login is only for publisher accounts.');
      }

      if (!response.data.user.is_approved) {
        throw new Error('Your publisher account is pending approval.');
      }

      setPublisherSession({
        token: response.data.token,
        user: response.data.user,
      });

      router.push(nextPath);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary)' }}>
      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Store<span style={{ color: 'var(--accent-primary)' }}>Gram</span>
          </Link>
          <h2 style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Publisher Login</h2>
        </div>
        
        {(error || approvalMessage) && <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255, 77, 77, 0.1)', color: 'var(--danger)', borderRadius: '6px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>{error || approvalMessage}</div>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label>Email Address</label>
            <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label>Password</label>
            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link href="/register" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
