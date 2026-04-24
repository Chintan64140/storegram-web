'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/utils/api';

function RegisterContent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCodeFromUrl =
    searchParams.get('ref') || searchParams.get('referralCode') || '';
  const effectiveReferralCode = referralCode || referralCodeFromUrl;

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/api/auth/signup', {
        name,
        email,
        password,
        mobile,
        role: 'PUBLISHER',
        referralCode: effectiveReferralCode || undefined,
      });
      alert('Registration successful! Please login once your account is approved by an Admin.');
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8 sm:px-6">
      <div className="card animate-fade-in w-full max-w-md border-white/10 bg-surface/90 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-8">
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-semibold tracking-tight">
            Store<span className="text-accent">Gram</span>
          </Link>
          <h2 className="mt-4 text-2xl font-semibold text-foreground">Publisher Registration</h2>
          <p className="mt-3 text-sm text-muted">
            Create your publisher account and use a referral code if you have one.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              className="input"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              required
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
              minLength={6}
            />
          </div>

          <div className="input-group">
            <label>Referral Code (Optional)</label>
            <input
              type="text"
              className="input"
              value={effectiveReferralCode}
              onChange={(event) => setReferralCode(event.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-2 w-full" disabled={loading}>
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-muted transition hover:text-foreground">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Register() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <RegisterContent />
    </Suspense>
  );
}
