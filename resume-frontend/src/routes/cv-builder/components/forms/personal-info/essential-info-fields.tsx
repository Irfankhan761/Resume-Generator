import React from 'react';
import { Form, Input } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

export const EssentialInfoFields: React.FC = () => {
  return (
    <>
      <Form.Item
        name="fullName"
        label="Full Name"
        rules={[{ required: true, message: 'Please enter your full name' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="e.g., Jane Doe"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email Address"
        rules={[
          { required: true, message: 'An email address is required' },
          { type: 'email', message: 'The email address is not valid' },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="e.g., jane.doe@example.com"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'A phone number is required' }]}
      >
        <Input
          prefix={<PhoneOutlined className="site-form-item-icon" />}
          placeholder="e.g., (123) 456-7890"
          size="large"
        />
      </Form.Item>
    </>
  );
};
