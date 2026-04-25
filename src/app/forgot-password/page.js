'use client';

import { useState } from 'react';
import Link from 'next/link';
import api from '@/utils/api';

const STEPS = [
  { key: 'request', label: 'Send OTP' },
  { key: 'reset', label: 'Reset Password' },
  { key: 'done', label: 'Back to Login' },
];

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState('request');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRequestOtp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await api.post('/api/auth/forgot-password', { email });
      setMessage(response.data.message || 'If the email is registered, an OTP has been sent.');
      setStep('reset');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to request password reset OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password must match.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await api.post('/api/auth/reset-password', {
        email,
        otp,
        newPassword,
      });

      setMessage(response.data.message || 'Password reset successfully. You can now log in.');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setStep('done');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError('Enter your email address first.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await api.post('/api/auth/forgot-password', { email });
      setMessage(response.data.message || 'A fresh OTP has been sent.');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to resend OTP.');
    } finally {
      setLoading(false);
    }
  };

  const currentStepIndex = STEPS.findIndex((item) => item.key === step);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(0,160,254,0.18),_transparent_35%),linear-gradient(180deg,_#020202_0%,_#000_100%)] px-6 py-12">
      <div className="card animate-fade-in w-full max-w-xl border-white/10 bg-surface/90 p-8 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-semibold tracking-tight">
            Store<span className="text-accent">Gram</span>
          </Link>
          <p className="mt-4 text-xs uppercase tracking-[0.32em] text-muted">Publisher Recovery</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            Reset Publisher Password
          </h1>
          <p className="mt-3 text-sm text-muted">
            Request a reset code by email, then confirm it with your new password.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-3">
          {STEPS.map((item, index) => {
            const isActive = index <= currentStepIndex;

            return (
              <div
                key={item.key}
                className={`rounded-2xl border px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  isActive
                    ? 'border-accent/30 bg-accent/10 text-accent'
                    : 'border-border bg-surface-strong text-muted'
                }`}
              >
                {item.label}
              </div>
            );
          })}
        </div>

        {(error || message) && (
          <div
            className={`mb-6 rounded-2xl border px-4 py-3 text-sm ${
              error
                ? 'border-danger/30 bg-danger/10 text-danger'
                : 'border-success/30 bg-success/10 text-success'
            }`}
          >
            {error || message}
          </div>
        )}

        {step === 'request' && (
          <form onSubmit={handleRequestOtp} className="space-y-5">
            <div className="input-group">
              <label>Publisher Email Address</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="publisher@example.com"
                required
              />
            </div>

            <div className="rounded-2xl border border-border bg-surface/70 px-4 py-4 text-sm text-muted">
              We&apos;ll send a reset code to the email address linked to your publisher account.
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send Reset OTP'}
            </button>
          </form>
        )}

        {step === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="input-group md:col-span-2">
                <label>Email Address</label>
                <input
                  type="email"
                  className="input"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="input-group md:col-span-2">
                <label>OTP Code</label>
                <input
                  type="text"
                  className="input"
                  value={otp}
                  onChange={(event) => setOtp(event.target.value)}
                  placeholder="6-digit OTP"
                  inputMode="numeric"
                  maxLength={6}
                  required
                />
              </div>

              <div className="input-group">
                <label>New Password</label>
                <input
                  type="password"
                  className="input"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="New password"
                  required
                />
              </div>

              <div className="input-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  className="input"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/70 px-4 py-4 text-sm text-muted">
              Enter the code from your email and choose a new password to finish recovery.
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="btn btn-primary flex-1" disabled={loading}>
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </button>
              <button
                type="button"
                className="btn btn-secondary flex-1"
                onClick={handleResend}
                disabled={loading}
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}

        {step === 'done' && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-success/30 bg-success/10 px-4 py-4 text-sm text-success">
              Your password has been updated. Use your new password to sign in to the publisher dashboard.
            </div>
            <Link href="/login" className="btn btn-primary w-full">
              Back to Login
            </Link>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-muted transition hover:text-foreground">
            Return to login
          </Link>
        </div>
      </div>
    </div>
  );
}
