import React from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  ConfigProvider,
  Typography,
  Divider,
} from 'antd';
import {
  UserOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';

const { Title, Text } = Typography;

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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff', // A modern blue
          colorBgLayout: '#f0f2f5', // A light gray for backgrounds
        },
        components: {
          Modal: {
            headerBg: '#ffffff',
            titleColor: '#1a202c', // A dark gray for the title
          },
        },
      }}
    >
      <Modal
        title={
          <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
            Manage Optional Details
          </Title>
        }
        open={isVisible}
        onOk={onOk}
        onCancel={onCancel}
        footer={
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              paddingTop: '16px',
            }}
          >
            <Button key="back" onClick={onCancel}>
              Cancel
            </Button>
            <Button key="submit" type="primary" onClick={onOk}>
              Done
            </Button>
          </div>
        }
        width={700}
        closable
        bodyStyle={{ paddingTop: '24px' }}
      >
        <Form form={form} layout="vertical">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="jobTitle"
                label="Job Title"
                help={<Text type="secondary">Your professional role.</Text>}
              >
                <Input
                  prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="e.g., Senior Software Engineer"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="location"
                label="Location"
                help={
                  <Text type="secondary">
                    City and state, e.g., San Francisco, CA
                  </Text>
                }
              >
                <Input
                  prefix={
                    <EnvironmentOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Enter your location"
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="summary"
            label="Professional Summary"
            help={
              <Text type="secondary">
                A brief 2-3 sentence summary about your skills and experience.
              </Text>
            }
          >
            <Input.TextArea
              rows={4}
              placeholder="Write a short summary..."
              style={{ resize: 'none' }}
            />
          </Form.Item>

          <Divider orientation="left" style={{ borderColor: '#d9d9d9' }}>
            Professional Links
          </Divider>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="website" label="Website">
                <Input
                  prefix={
                    <GlobalOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="https://yourwebsite.com"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="linkedin" label="LinkedIn">
                <Input
                  prefix={
                    <LinkedinOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="linkedin.com/in/yourprofile"
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="github" label="GitHub">
            <Input
              prefix={<GithubOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="github.com/yourusername"
              size="large"
            />
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};
