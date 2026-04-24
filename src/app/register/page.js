'use client';
import { useState } from 'react';
import api from '@/utils/api';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCodeFromUrl = searchParams.get('ref') || searchParams.get('referralCode') || '';
  const effectiveReferralCode = referralCode || referralCodeFromUrl;

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/api/auth/signup', { 
        name, 
        email, 
        password, 
        mobile, 
        role: 'PUBLISHER', 
        referralCode: effectiveReferralCode || undefined 
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary)', padding: '2rem 0' }}>
      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Store<span style={{ color: 'var(--accent-primary)' }}>Gram</span>
          </Link>
          <h2 style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Publisher Registration</h2>
        </div>
        
        {error && <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255, 77, 77, 0.1)', color: 'var(--danger)', borderRadius: '6px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>{error}</div>}
        
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label>Full Name</label>
            <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label>Email Address</label>
            <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label>Mobile Number</label>
            <input type="tel" className="input" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
          </div>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label>Password</label>
            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label>Referral Code (Optional)</label>
            <input type="text" className="input" defaultValue={referralCodeFromUrl} onChange={(e) => setReferralCode(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link href="/login" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
