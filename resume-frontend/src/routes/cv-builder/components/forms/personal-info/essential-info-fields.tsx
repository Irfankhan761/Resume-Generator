import React from 'react';
import { Form, Input, Row, Col, Divider } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

export const EssentialInfoFields: React.FC = () => {
  return (
    <>
      <Row gutter={[24, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: 'Full Name is required' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your full name"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Invalid email format' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Phone is required' }]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Enter your phone number"
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
    </>
  );
};
