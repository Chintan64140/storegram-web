'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/utils/api';
import {
  getPublisherToken,
  getStoredPublisherUser,
  isPublisherUser,
  setPublisherSession,
} from '@/utils/auth';

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

  const handleLogin = async (event) => {
    event.preventDefault();
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
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(0,160,254,0.18),_transparent_35%),linear-gradient(180deg,_#020202_0%,_#000_100%)] px-6 py-12">
      <div className="card animate-fade-in w-full max-w-md border-white/10 bg-surface/90 p-8 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-semibold tracking-tight">
            Store<span className="text-accent">Gram</span>
          </Link>
          <p className="mt-4 text-xs uppercase tracking-[0.32em] text-muted">Publisher Access</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">Welcome back</h1>
          <p className="mt-3 text-sm text-muted">
            Sign in to upload content, track analytics, and manage your account.
          </p>
        </div>

        {(error || approvalMessage) && (
          <div className="mb-6 rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
            {error || approvalMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="publisher@example.com"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm font-medium text-accent transition hover:text-accent-hover">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary mt-2 w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/register" className="text-sm text-muted transition hover:text-foreground">
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
