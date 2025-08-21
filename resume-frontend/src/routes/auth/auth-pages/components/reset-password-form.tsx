import { Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from 'core/services/auth-services';

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

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

  return (
    <Form
      form={form}
      name="resetPassword"
      onFinish={onFinish}
      layout="vertical"
      className="space-y-4"
    >
      <Form.Item
        name="password"
        label={<span className="text-gray-700 font-medium">New Password</span>}
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
          <span className="text-gray-700 font-medium">Confirm Password</span>
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
  );
};

export default ResetPasswordForm;
