import { Card, Divider, Breadcrumb, Button } from 'antd';
import {
  GoogleOutlined,
  TwitterOutlined,
  FacebookFilled,
} from '@ant-design/icons';
import SignupForm from './components/signup-form';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <Card
        className="w-full max-w-md p-0 overflow-hidden shadow-2xl rounded-xl border-0"
        bodyStyle={{ padding: 0 }}
      >
        {/* Decorative header */}
        <div className="text-center mt-5">
          <h1 className="text-2xl font-bold bg-gradient-to-br from-blue-400 to-indigo-700 bg-clip-text text-transparent">
            Create Your Account
          </h1>
          <p className="opacity-90">Join us to get started</p>
        </div>

        <div className="p-8">
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="mb-6 text-sm">
            <Breadcrumb.Item>
              <a href="/" className="text-blue-600 hover:text-blue-800">
                Home
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="text-gray-500">Sign Up</Breadcrumb.Item>
          </Breadcrumb>

          <SignupForm />

          <Divider className="text-gray-400 before:bg-gray-200 after:bg-gray-200">
            or sign up with
          </Divider>

          <div className="grid grid-cols-3 gap-3">
            <Button
              icon={<GoogleOutlined />}
              className="flex items-center justify-center h-12 rounded-lg border-gray-300 hover:border-blue-400 hover:text-blue-600 transition-all"
              size="large"
            >
              <span className="sr-only">Google</span>
            </Button>
            <Button
              icon={<FacebookFilled />}
              className="flex items-center justify-center h-12 rounded-lg border-gray-300 hover:border-gray-800 hover:text-gray-800 transition-all"
              size="large"
            >
              <span className="sr-only">GitHub</span>
            </Button>
            <Button
              icon={<TwitterOutlined />}
              className="flex items-center justify-center h-12 rounded-lg border-gray-300 hover:border-blue-400 hover:text-blue-400 transition-all"
              size="large"
            >
              <span className="sr-only">Twitter</span>
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Sign in
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;
