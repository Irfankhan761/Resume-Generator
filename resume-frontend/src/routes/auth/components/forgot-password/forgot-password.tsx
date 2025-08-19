import { Form, Input, Button, Card, Breadcrumb, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { resetPasswordForEmail } from 'core/services/auth-services';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { error } = await resetPasswordForEmail(values.email);

      if (error) {
        throw error;
      }

      message.success('Password reset instructions sent to your email!');
      navigate('/login');
    } catch (error: any) {
      message.error(
        error.message || 'Failed to send reset instructions. Please try again.'
      );
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
            Reset Your Password
          </h1>
          <p className="opacity-90">
            Enter your email to receive reset instructions
          </p>
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
              Forgot Password
            </Breadcrumb.Item>
          </Breadcrumb>

          <Form
            form={form}
            name="forgotPassword"
            onFinish={onFinish}
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              name="email"
              label={
                <span className="text-gray-700 font-medium">Email Address</span>
              }
              rules={[
                {
                  required: true,
                  message: 'Please input your email address!',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email address!',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Enter your email address"
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
                Send Reset Instructions
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

export default ForgotPasswordPage;
