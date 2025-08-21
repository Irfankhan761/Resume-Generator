import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Form,
  Input,
  Row,
  Col,
  Button,
  message,
  Spin,
  Divider,
  Modal, // Import Modal
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  CompassOutlined,
  GithubOutlined,
  SaveOutlined,
  EditOutlined,
  FileTextOutlined,
  LinkOutlined,
  EnvironmentOutlined,
  PlusOutlined, // For the new button
} from '@ant-design/icons';
import type { PersonalInfo } from '../../types/types';
import { personalInfoService } from 'core/services/personal-info-sevice';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  onSave?: () => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  onChange,
  onSave,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  // Section visibility states are still needed to control the main form's display
  const [showJobTitle, setShowJobTitle] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  const handleValuesChange = useCallback(
    (_: any, allValues: PersonalInfo) => {
      if (hasLoaded) {
        onChange(allValues);
      }
    },
    [onChange, hasLoaded]
  );

  const handleSave = async () => {
    try {
      setSaving(true);
      await form.validateFields();
      const formData = form.getFieldsValue();

      // Normalize data, ensuring fields for hidden sections are cleared
      const normalizedData: PersonalInfo = {
        fullName: formData.fullName || '',
        email: formData.email || '',
        phone: formData.phone || '',
        jobTitle: showJobTitle ? formData.jobTitle || '' : '',
        location: showLocation ? formData.location || '' : '',
        summary: showSummary ? formData.summary || '' : '',
        website: showLinks ? formData.website || '' : '',
        linkedin: showLinks ? formData.linkedin || '' : '',
        github: showLinks ? formData.github || '' : '',
      };

      const { error, data: savedData } =
        await personalInfoService.savePersonalInfo(normalizedData);

      if (error) {
        console.error('Error saving personal info:', error);
        message.error('Failed to save personal information');
        return;
      }

      message.success('Personal information saved successfully!');

      if (savedData) {
        const formattedData: PersonalInfo = {
          fullName: savedData.full_name,
          jobTitle: savedData.job_title,
          email: savedData.email,
          phone: savedData.phone,
          location: savedData.location || '',
          website: savedData.website || '',
          linkedin: savedData.linkedin || '',
          github: savedData.github || '',
          summary: savedData.summary,
        };
        onChange(formattedData);
      } else {
        onChange(normalizedData);
      }

      if (onSave) {
        onSave();
      }
    } catch (error) {
      console.error('Validation or save error:', error);
      message.error('Please fix the form errors before saving');
    } finally {
      setSaving(false);
    }
  };

  // Load data and set initial section visibility
  useEffect(() => {
    const loadPersonalInfo = async () => {
      try {
        const { data: savedData, error } =
          await personalInfoService.loadPersonalInfo();

        if (error) {
          console.error('Error loading personal info:', error);
          if (error.code !== 'PGRST116') {
            message.error('Failed to load saved data');
          }
        } else if (savedData) {
          form.setFieldsValue(savedData);
          onChange(savedData);

          // Show sections that have data
          if (savedData.jobTitle) setShowJobTitle(true);
          if (savedData.location) setShowLocation(true);
          if (savedData.summary) setShowSummary(true);
          if (savedData.website || savedData.linkedin || savedData.github) {
            setShowLinks(true);
          }
        } else {
          form.setFieldsValue(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
        setHasLoaded(true);
      }
    };

    loadPersonalInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync form with parent data
  useEffect(() => {
    if (hasLoaded && data) {
      form.setFieldsValue(data);
    }
  }, [data, form, hasLoaded]);

  // Modal handler: updates section visibility based on form values
  const handleModalOk = () => {
    const values = form.getFieldsValue();
    setShowJobTitle(!!values.jobTitle);
    setShowLocation(!!values.location);
    setShowSummary(!!values.summary);
    setShowLinks(!!values.website || !!values.linkedin || !!values.github);
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card
      title={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '20px', fontWeight: '600' }}>
            <UserOutlined style={{ marginRight: '8px', color: '#3498db' }} />
            Personal Information
          </span>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={saving}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      }
      className="mb-8"
      style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={data}
        onValuesChange={handleValuesChange}
      >
        {/* --- Essential Information --- */}
        <h3
          style={{ color: '#1890ff', marginBottom: '16px', fontSize: '16px' }}
        >
          <UserOutlined style={{ marginRight: '8px' }} />
          Essential Information
        </h3>
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

        {/* --- Conditionally Rendered Sections on Main Form --- */}
        {showJobTitle && (
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <h3 style={{ color: '#1890ff', margin: 0, fontSize: '16px' }}>
                <EditOutlined style={{ marginRight: '8px' }} />
                Professional Title
              </h3>
              <Button
                type="text"
                size="small"
                style={{ color: '#ff4d4f' }}
                onClick={() => {
                  setShowJobTitle(false);
                  form.setFieldValue('jobTitle', '');
                  onChange({ ...data, jobTitle: '' });
                }}
              >
                Remove
              </Button>
            </div>
            <Form.Item name="jobTitle" label="Job Title">
              <Input readOnly placeholder="e.g., Senior Software Engineer" />
            </Form.Item>
          </div>
        )}

        {showLocation && (
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <h3 style={{ color: '#1890ff', margin: 0, fontSize: '16px' }}>
                <EnvironmentOutlined style={{ marginRight: '8px' }} />
                Location
              </h3>
              <Button
                type="text"
                size="small"
                style={{ color: '#ff4d4f' }}
                onClick={() => {
                  setShowLocation(false);
                  form.setFieldValue('location', '');
                  onChange({ ...data, location: '' });
                }}
              >
                Remove
              </Button>
            </div>
            <Form.Item name="location" label="Location">
              <Input
                readOnly
                prefix={<CompassOutlined />}
                placeholder="e.g., San Francisco, CA"
              />
            </Form.Item>
          </div>
        )}

        {showSummary && (
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <h3 style={{ color: '#1890ff', margin: 0, fontSize: '16px' }}>
                <FileTextOutlined style={{ marginRight: '8px' }} />
                Professional Summary
              </h3>
              <Button
                type="text"
                size="small"
                style={{ color: '#ff4d4f' }}
                onClick={() => {
                  setShowSummary(false);
                  form.setFieldValue('summary', '');
                  onChange({ ...data, summary: '' });
                }}
              >
                Remove
              </Button>
            </div>
            <Form.Item name="summary" label="About You">
              <Input.TextArea
                readOnly
                rows={4}
                placeholder="Brief professional summary..."
              />
            </Form.Item>
          </div>
        )}

        {showLinks && (
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <h3 style={{ color: '#1890ff', margin: 0, fontSize: '16px' }}>
                <LinkOutlined style={{ marginRight: '8px' }} />
                Professional Links
              </h3>
              <Button
                type="text"
                size="small"
                style={{ color: '#ff4d4f' }}
                onClick={() => {
                  setShowLinks(false);
                  const newValues = { website: '', linkedin: '', github: '' };
                  form.setFieldsValue(newValues);
                  onChange({ ...data, ...newValues });
                }}
              >
                Remove All
              </Button>
            </div>
            <Row gutter={[24, 16]}>
              <Col xs={24} md={8}>
                <Form.Item name="website" label="Website">
                  <Input readOnly prefix={<GlobalOutlined />} />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="linkedin" label="LinkedIn">
                  <Input readOnly prefix={<LinkedinOutlined />} />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="github" label="GitHub">
                  <Input readOnly prefix={<GithubOutlined />} />
                </Form.Item>
              </Col>
            </Row>
          </div>
        )}

        {/* --- Single Button to Open Modal --- */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
            style={{
              height: '50px',
              width: '250px',
              border: '2px dashed #d9d9d9',
            }}
          >
            Add / Edit Optional Details
          </Button>
        </div>
      </Form>

      {/* --- Modal with Form Fields --- */}
      <Modal
        title="Manage Optional Details"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleModalOk}>
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
    </Card>
  );
};
