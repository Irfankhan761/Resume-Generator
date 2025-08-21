import { Card, Breadcrumb } from 'antd';
import ForgotPasswordForm from './components/forgot-password-form';

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <Card
        className="w-full max-w-md p-0 overflow-hidden shadow-2xl rounded-xl border-0"
        bodyStyle={{ padding: 0 }}
      >
        <div className="text-center mt-5">
          <h1 className="text-2xl font-bold bg-gradient-to-br from-blue-400 to-indigo-700 bg-clip-text text-transparent">
            Reset Your Password
          </h1>
          <p className="opacity-90">
            Enter your email to receive reset instructions
          </p>
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
              Forgot Password
            </Breadcrumb.Item>
          </Breadcrumb>

          <ForgotPasswordForm />

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

export default ForgotPasswordPage;
