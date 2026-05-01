'use client';

import { GoogleLogin } from '@react-oauth/google';
import api from '@/utils/api';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim();

export default function GoogleLoginButton({
  onSuccess,
  onError,
  isRegister = false,
  referralCode,
}) {
  const handleSuccess = async (credentialResponse) => {
    try {
      if (!credentialResponse?.credential) {
        throw new Error('Google did not return a credential');
      }

      const response = await api.post('/api/auth/google', {
        idToken: credentialResponse.credential,
        clientId: credentialResponse.clientId,
        role: 'PUBLISHER',
        referralCode: referralCode || undefined,
      });
      onSuccess(response.data);
    } catch (error) {
      console.error('Google login failed:', error);
      onError(error.response?.data?.error || error.message || 'Google Login failed');
    }
  };

  const handleFailure = () => {
    onError('Google Login was unsuccessful. Try again later.');
  };

  if (!GOOGLE_CLIENT_ID) {
    return (
      <button
        type="button"
        className="btn mt-4 w-full cursor-not-allowed border border-white/10 bg-white/5 text-muted opacity-70"
        onClick={() =>
          onError('Google sign-in is not configured. Add NEXT_PUBLIC_GOOGLE_CLIENT_ID to the web app environment.')
        }
      >
        Continue with Google
      </button>
    );
  }

  return (
    <div className="w-full flex justify-center mt-4">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure}
        useOneTap={false}
        text={isRegister ? 'signup_with' : 'signin_with'}
        theme="outline"
        size="large"
        width="100%"
      />
    </div>
  );
}
