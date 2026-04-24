'use client';

import { useState } from 'react';
import api from '@/utils/api';

export default function PublisherSecurityPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password must match.');
      setMessage('');
      return;
    }

    if (oldPassword === newPassword) {
      setError('New password must be different from your current password.');
      setMessage('');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await api.post('/api/auth/change-password', {
        oldPassword,
        newPassword,
      });

      setMessage(response.data.message || 'Password updated successfully.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in grid gap-6">
      <div>
        <h1 className="mb-2 text-3xl font-extrabold sm:text-4xl">Account Security</h1>
        <p className="max-w-3xl text-sm text-muted sm:text-base">
          Change your current publisher password using the protected backend auth endpoint. This
          updates the password for your signed-in account immediately.
        </p>
      </div>

      {(error || message) && (
        <div
          className="card w-full max-w-3xl"
          style={{
            borderColor: error ? 'rgba(255, 77, 77, 0.25)' : 'rgba(0, 204, 102, 0.25)',
            color: error ? 'var(--danger)' : 'var(--success)',
            backgroundColor: error ? 'rgba(255, 77, 77, 0.05)' : 'rgba(0, 204, 102, 0.05)',
          }}
        >
          {error || message}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,640px)_minmax(0,420px)]">
        <div className="card">
          <h2 className="mb-2 text-xl font-bold">Change Password</h2>
          <p className="mb-6 text-sm text-muted">
            The backend expects `oldPassword` and `newPassword`. Confirm password is validated
            here in the publisher UI before sending the request.
          </p>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="input-group">
              <label>Current Password</label>
              <input
                type="password"
                className="input"
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
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
                required
              />
            </div>

            <button type="submit" className="btn btn-primary mt-2 w-full sm:w-auto" disabled={loading}>
              {loading ? 'Updating Password...' : 'Update Password'}
            </button>
          </form>
        </div>

        <div className="card">
          <h2 className="mb-3 text-lg font-bold">Password Recovery</h2>
          <p className="text-sm leading-7 text-muted sm:text-base">
            If you ever lose access to your current password, use the forgot-password screen from
            the login page. That flow sends an OTP to your email and calls the backend reset
            endpoint with the OTP and your new password.
          </p>
        </div>
      </div>
    </div>
  );
}
