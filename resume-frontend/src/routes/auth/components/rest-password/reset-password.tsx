import { Form, Input, Button, Card, Breadcrumb, message, Alert } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from 'core/services/auth-services';

const parseHashFragment = (hash: string) => {
  const params = new URLSearchParams(hash.substring(1));
  return {
    access_token: params.get('access_token'),
    refresh_token: params.get('refresh_token'),
    type: params.get('type'),
  };
};

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const verifyToken = useCallback(async (token: string) => {
    try {
      setLoading(true);
      localStorage.setItem('supabaseResetToken', token);
      setVerified(true);
      message.success(
        'Reset link verified. You can now set your new password.'
      );
    } catch (error: any) {
      console.error('Token verification error:', error);
      message.error(error.message || 'Invalid or expired reset link.');
    } finally {
      setLoading(false);
      setTokenChecked(true);
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

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { error } = await updatePassword(values.password);

      if (error) {
        throw error;
      }

      localStorage.removeItem('supabaseResetToken');

      message.success('Password reset successfully!');
      navigate('/login');
    } catch (error: any) {
      message.error(
        error.message || 'Failed to reset password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

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
              <p className="opacity-90">
                Please wait while we verify your reset link
              </p>
            </div>

            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Verifying your reset link...</p>
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
              <p className="opacity-90">
                The password reset link is invalid or has expired
              </p>
            </div>

            <Alert
              message="Invalid Reset Link"
              description="The password reset link is invalid, has expired, or has already been used. Please request a new reset link."
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
          {/* Breadcrumb Navigation */}
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

          <Form
            form={form}
            name="resetPassword"
            onFinish={onFinish}
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              name="password"
              label={
                <span className="text-gray-700 font-medium">New Password</span>
              }
              rules={[
                { required: true, message: 'Please input your new password!' },
                { min: 6, message: 'Password must be at least 6 characters!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter your new password"
                className="rounded-lg h-12 px-4 border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:shadow-sm"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={
                <span className="text-gray-700 font-medium">
                  Confirm Password
                </span>
              }
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Confirm your new password"
                className="rounded-lg h-12 px-4 border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:shadow-sm"
                size="large"
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 shadow-sm transition-all transform hover:scale-[1.01]"
                size="large"
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>

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
