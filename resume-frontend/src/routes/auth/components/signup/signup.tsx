import {
  Form,
  Input,
  Button,
  Card,
  Checkbox,
  Divider,
  Breadcrumb,
  message,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  GoogleOutlined,
  TwitterOutlined,
  FacebookFilled,
} from '@ant-design/icons';
import { useState } from 'react';
import { signUp } from 'core/services/auth-services';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { user, error } = await signUp(
        values.email,
        values.password,
        values.username
      );

      if (error) {
        throw error;
      }

      if (user) {
        message.success('Account created successfully!');
        navigate('/create-cv');
      }
    } catch (error: any) {
      message.error(error.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

          <Form
            form={form}
            name="signup"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              name="username"
              label={
                <span className="text-gray-700 font-medium">Username</span>
              }
              rules={[
                { required: true, message: 'Please input your username!' },
                { min: 3, message: 'Username must be at least 3 characters!' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter your username"
                className="rounded-lg h-12 px-4 border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:shadow-sm"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span className="text-gray-700 font-medium">Email</span>}
              rules={[
                { required: true, message: 'Please input your email!' },
                {
                  type: 'email',
                  message: 'Please enter a valid email address!',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Enter your email"
                className="rounded-lg h-12 px-4 border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:shadow-sm"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span className="text-gray-700 font-medium">Password</span>
              }
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter your password"
                className="rounded-lg h-12 px-4 border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:shadow-sm"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              label={
                <span className="text-gray-700 font-medium">
                  Confirm Password
                </span>
              }
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords don't match!");
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Confirm your password"
                className="rounded-lg h-12 px-4 border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:shadow-sm"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              className="mb-0"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          'You must accept the terms and conditions'
                        ),
                },
              ]}
            >
              <Checkbox className="text-gray-600 hover:text-blue-600">
                I agree to the{' '}
                <a href="#terms" className="text-blue-600 hover:text-blue-800">
                  Terms and Conditions
                </a>
              </Checkbox>
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 shadow-sm transition-all transform hover:scale-[1.01]"
                size="large"
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>

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
