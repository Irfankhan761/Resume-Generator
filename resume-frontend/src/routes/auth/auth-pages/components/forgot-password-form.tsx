import { Form, Input, Button, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPasswordForEmail } from 'core/services/auth-services';

const ForgotPasswordForm = () => {
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
    <Form
      form={form}
      name="forgotPassword"
      onFinish={onFinish}
      layout="vertical"
      className="space-y-4"
    >
      <Form.Item
        name="email"
        label={<span className="text-gray-700 font-medium">Email Address</span>}
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
  );
};

export default ForgotPasswordForm;
