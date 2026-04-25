'use client';
import { useState, useEffect } from 'react';
import { User, CreditCard, Lock, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '@/utils/api';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Profile Form State
  const [profileData, setProfileData] = useState({ name: '', email: '', mobile: '' });
  
  // Bank Details State
  const [bankData, setBankData] = useState({
    bankName: '',
    accountName: '',
    accountNumber: '',
    ifscCode: '',
    paypalEmail: ''
  });

  // Password State
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/api/users/profile');
        const user = response.data.userData[0];
        if (user) {
          setProfileData({
            name: user.name || '',
            email: user.email || '',
            mobile: user.mobile || ''
          });
          setBankData({
            bankName: user.bank_name || '',
            accountName: user.account_name || '',
            accountNumber: user.account_number || '',
            ifscCode: user.ifsc_code || '',
            paypalEmail: user.paypal_email || ''
          });
          // Update local storage so it stays in sync
          const userStr = localStorage.getItem('user');
          if (userStr) {
            const oldUser = JSON.parse(userStr);
            localStorage.setItem('user', JSON.stringify({ ...oldUser, ...user }));
          } else {
            localStorage.setItem('user', JSON.stringify(user));
          }
        }
      } catch (err) {
        console.error('Failed to fetch user data', err);
        // Fallback to local storage if API fails
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          setProfileData({
            name: user.name || '',
            email: user.email || '',
            mobile: user.mobile || ''
          });
          setBankData({
            bankName: user.bank_name || '',
            accountName: user.account_name || '',
            accountNumber: user.account_number || '',
            ifscCode: user.ifsc_code || '',
            paypalEmail: user.paypal_email || ''
          });
        }
      }
    };

    fetchUserData();
  }, []);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.put('/api/users/profile', profileData);
      const updatedUser = response.data.user;
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        localStorage.setItem('user', JSON.stringify({ ...user, ...updatedUser }));
      }
      showMessage('Profile updated successfully');
    } catch (err) {
      showMessage(err.response?.data?.error || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleBankSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.put('/api/users/bank-details', bankData);
      const updatedUser = response.data.user;
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        localStorage.setItem('user', JSON.stringify({ 
          ...user, 
          bank_name: updatedUser.bank_name,
          account_name: updatedUser.account_name,
          account_number: updatedUser.account_number,
          ifsc_code: updatedUser.ifsc_code,
          paypal_email: updatedUser.paypal_email
        }));
      }
      showMessage('Bank details updated successfully');
    } catch (err) {
      showMessage(err.response?.data?.error || 'Failed to update bank details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage('New passwords do not match', 'error');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/auth/change-password', {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      });
      showMessage('Password changed successfully');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      showMessage(err.response?.data?.error || 'Failed to change password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'profile' ? 'bg-accent text-white' : 'bg-surface text-muted hover:text-foreground'}`}
        >
          <User size={18} /> Profile Update
        </button>
        <button 
          onClick={() => setActiveTab('bank')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'bank' ? 'bg-accent text-white' : 'bg-surface text-muted hover:text-foreground'}`}
        >
          <CreditCard size={18} /> Bank Details
        </button>
        <button 
          onClick={() => setActiveTab('password')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'password' ? 'bg-accent text-white' : 'bg-surface text-muted hover:text-foreground'}`}
        >
          <Lock size={18} /> Change Password
        </button>
      </div>

      {message.text && (
        <div className={`flex items-center gap-2 p-4 rounded-xl mb-6 ${message.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
          {message.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
          {message.text}
        </div>
      )}

      <div className="card">
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <h3 className="text-xl font-bold border-b border-border pb-4 mb-6">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" className="input" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} required />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" className="input" value={profileData.email} disabled title="Email cannot be changed" />
                <span className="text-xs text-muted">Email cannot be changed</span>
              </div>
              <div className="input-group">
                <label>Mobile Number</label>
                <input type="tel" className="input" value={profileData.mobile} onChange={(e) => setProfileData({...profileData, mobile: e.target.value})} />
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-border">
              <button type="submit" disabled={loading} className="btn btn-primary">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </form>
        )}

        {activeTab === 'bank' && (
          <form onSubmit={handleBankSubmit} className="space-y-6">
            <h3 className="text-xl font-bold border-b border-border pb-4 mb-6">Payment Methods</h3>
            
            <div className="space-y-6">
              <div className="bg-surface-strong p-6 rounded-xl border border-border">
                <h4 className="font-semibold mb-4 text-accent">Bank Transfer Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="input-group">
                    <label>Bank Name</label>
                    <input type="text" className="input" value={bankData.bankName} onChange={(e) => setBankData({...bankData, bankName: e.target.value})} placeholder="e.g. State Bank of India" />
                  </div>
                  <div className="input-group">
                    <label>Account Holder Name</label>
                    <input type="text" className="input" value={bankData.accountName} onChange={(e) => setBankData({...bankData, accountName: e.target.value})} placeholder="John Doe" />
                  </div>
                  <div className="input-group">
                    <label>Account Number</label>
                    <input type="text" className="input" value={bankData.accountNumber} onChange={(e) => setBankData({...bankData, accountNumber: e.target.value})} />
                  </div>
                  <div className="input-group">
                    <label>IFSC Code</label>
                    <input type="text" className="input" value={bankData.ifscCode} onChange={(e) => setBankData({...bankData, ifscCode: e.target.value})} placeholder="SBIN0001234" />
                  </div>
                </div>
              </div>

              <div className="bg-surface-strong p-6 rounded-xl border border-border">
                <h4 className="font-semibold mb-4 text-[#0079C1]">PayPal Details</h4>
                <div className="input-group max-w-md">
                  <label>PayPal Email Address</label>
                  <input type="email" className="input" value={bankData.paypalEmail} onChange={(e) => setBankData({...bankData, paypalEmail: e.target.value})} placeholder="paypal@example.com" />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border">
              <button type="submit" disabled={loading} className="btn btn-primary">
                <Save size={18} /> Update Payment Details
              </button>
            </div>
          </form>
        )}

        {activeTab === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-md">
            <h3 className="text-xl font-bold border-b border-border pb-4 mb-6">Security</h3>
            <div className="input-group">
              <label>Current Password</label>
              <input type="password" className="input" value={passwordData.oldPassword} onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})} required minLength={6} />
            </div>
            <div className="input-group">
              <label>New Password</label>
              <input type="password" className="input" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} required minLength={6} />
            </div>
            <div className="input-group">
              <label>Confirm New Password</label>
              <input type="password" className="input" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} required minLength={6} />
            </div>
            <div className="pt-4 border-t border-border">
              <button type="submit" disabled={loading} className="btn btn-primary w-full">
                <Lock size={18} /> Update Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
