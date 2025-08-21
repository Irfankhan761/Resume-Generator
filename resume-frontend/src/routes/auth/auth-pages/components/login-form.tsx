import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { signIn } from 'core/services/auth-services';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { user, error } = await signIn(values.username, values.password);

      if (error) {
        throw error;
      }

      if (user) {
        message.success('Login successful!');
        navigate('/create-cv');
      }
    } catch (error: any) {
      message.error(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
      className="space-y-4"
    >
      <Form.Item
        name="username"
        label={
          <span className="text-gray-700 font-medium">Email or Username</span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your username or email!',
          },
          {
            type: 'email',
            message: 'Please enter a valid email!',
            validator: (_, value) =>
              !value || value.includes('@')
                ? Promise.resolve()
                : Promise.reject(),
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="text-gray-400" />}
          placeholder="Enter your email or username"
          className="rounded-lg h-12 px-4 border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:shadow-sm"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label={<span className="text-gray-700 font-medium">Password</span>}
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

      <div className="flex justify-between items-center">
        <Form.Item name="remember" valuePropName="checked" className="mb-0">
          <Checkbox className="text-gray-600 hover:text-blue-600">
            Remember me
          </Checkbox>
        </Form.Item>

        <a
          href="/forgot-password"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          Forgot password?
        </a>
      </div>

      <Form.Item className="mb-0">
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full h-12 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 shadow-sm transition-all transform hover:scale-[1.01]"
          size="large"
        >
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
