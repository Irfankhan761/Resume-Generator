import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { signUp } from 'core/services/auth-services';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
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
        label={<span className="text-gray-700 font-medium">Username</span>}
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

      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        label={
          <span className="text-gray-700 font-medium">Confirm Password</span>
        }
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords don't match!"));
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
                    new Error('You must accept the terms and conditions')
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
  );
};

export default SignupForm;
