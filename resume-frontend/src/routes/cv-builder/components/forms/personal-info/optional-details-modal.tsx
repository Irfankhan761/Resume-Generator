import React from 'react';
import { Modal, Form, Input, Divider, Button } from 'antd';
import {
  CompassOutlined,
  GlobalOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';

interface OptionalDetailsModalProps {
  form: FormInstance;
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export const OptionalDetailsModal: React.FC<OptionalDetailsModalProps> = ({
  form,
  isVisible,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      title="Manage Optional Details"
      visible={isVisible}
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button key="submit" type="primary" onClick={onOk}>
          Done
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="jobTitle"
          label="Job Title"
          help="Your professional role."
        >
          <Input placeholder="e.g., Senior Software Engineer" />
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          help="City and state, e.g., San Francisco, CA"
        >
          <Input
            prefix={<CompassOutlined />}
            placeholder="Enter your location"
          />
        </Form.Item>

        <Form.Item
          name="summary"
          label="Professional Summary"
          help="A brief 2-3 sentence summary about your skills and experience."
        >
          <Input.TextArea rows={4} placeholder="Write a short summary..." />
        </Form.Item>

        <Divider>Professional Links</Divider>

        <Form.Item name="website" label="Website">
          <Input
            prefix={<GlobalOutlined />}
            placeholder="https://yourwebsite.com"
          />
        </Form.Item>
        <Form.Item name="linkedin" label="LinkedIn">
          <Input
            prefix={<LinkedinOutlined />}
            placeholder="linkedin.com/in/yourprofile"
          />
        </Form.Item>
        <Form.Item name="github" label="GitHub">
          <Input
            prefix={<GithubOutlined />}
            placeholder="github.com/yourusername"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
