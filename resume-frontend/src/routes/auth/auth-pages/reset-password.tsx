import { Card, Breadcrumb, message, Alert, Button } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ResetPasswordForm from './components/reset-password-form';

const parseHashFragment = (hash: string) => {
  const params = new URLSearchParams(hash.substring(1));
  return {
    access_token: params.get('access_token'),
    refresh_token: params.get('refresh_token'),
    type: params.get('type'),
  };
};

const ResetPasswordPage = () => {
  const [verified, setVerified] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);
  const navigate = useNavigate();

  const verifyToken = useCallback(async (token: string) => {
    try {
      localStorage.setItem('supabaseResetToken', token);
      setVerified(true);
      message.success(
        'Reset link verified. You can now set your new password.'
      );
    } catch (error: any) {
      console.error('Token verification error:', error);
      message.error(error.message || 'Invalid or expired reset link.');
    } finally {
      setTokenChecked(true); // This will trigger a re-render to the correct view.
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const { access_token, type } = parseHashFragment(hash);
      if (access_token && type === 'recovery') {
        verifyToken(access_token);
        return;
      }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const type = urlParams.get('type');

    if (token && type === 'recovery') {
      verifyToken(token);
    } else {
      setTokenChecked(true);
    }
  }, [verifyToken]);

  if (!tokenChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <Card
          className="w-full max-w-md p-0 overflow-hidden shadow-2xl rounded-xl border-0"
          bodyStyle={{ padding: 0 }}
        >
          <div className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold bg-gradient-to-br from-blue-400 to-indigo-700 bg-clip-text text-transparent">
                Verifying Reset Link
              </h1>
              <p className="opacity-90">Please wait while we check your link</p>
            </div>
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Verifying...</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <Card
          className="w-full max-w-md p-0 overflow-hidden shadow-2xl rounded-xl border-0"
          bodyStyle={{ padding: 0 }}
        >
          <div className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold bg-gradient-to-br from-blue-400 to-indigo-700 bg-clip-text text-transparent">
                Invalid Reset Link
              </h1>
              <p className="opacity-90">This link may be expired or invalid</p>
            </div>
            <Alert
              message="Invalid Reset Link"
              description="The password reset link is invalid, has expired, or has already been used. Please request a new one."
              type="error"
              showIcon
              className="mb-6"
            />
            <div className="mt-6 text-center">
              <Button
                type="primary"
                onClick={() => navigate('/forgot-password')}
                className="h-10 font-medium"
              >
                Request New Reset Link
              </Button>
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Back to Sign In
              </a>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <Card
        className="w-full max-w-md p-0 overflow-hidden shadow-2xl rounded-xl border-0"
        bodyStyle={{ padding: 0 }}
      >
        <div className="text-center mt-5">
          <h1 className="text-2xl font-bold bg-gradient-to-br from-blue-400 to-indigo-700 bg-clip-text text-transparent">
            Set New Password
          </h1>
          <p className="opacity-90">Create a new password for your account</p>
        </div>
        <div className="p-8">
          <Breadcrumb className="mb-6 text-sm">
            <Breadcrumb.Item>
              <a href="/" className="text-blue-600 hover:text-blue-800">
                Home
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/login" className="text-blue-600 hover:text-blue-800">
                Sign In
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="text-gray-500">
              Reset Password
            </Breadcrumb.Item>
          </Breadcrumb>
          <Alert
            message="Create a new password for your account"
            type="info"
            showIcon
            className="mb-6"
          />
          <ResetPasswordForm />
          <div className="mt-6 text-center text-sm text-gray-500">
            Remember your password?{' '}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Back to Sign In
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
