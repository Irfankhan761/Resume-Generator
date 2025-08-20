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

  // Section visibility states
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

      // --- PRIMARY FIX: NORMALIZE THE DATA BEFORE SAVING ---
      // This ensures that any 'undefined' or null fields from the form are converted
      // to empty strings. This is crucial because Supabase's .update() method
      // ignores 'undefined' keys, leaving the old data in the database.
      // By providing an empty string, we explicitly tell the database to clear the field.
      const normalizedData: PersonalInfo = {
        fullName: formData.fullName || '',
        jobTitle: formData.jobTitle || '',
        email: formData.email || '',
        phone: formData.phone || '',
        location: formData.location || '',
        website: formData.website || '',
        linkedin: formData.linkedin || '',
        github: formData.github || '',
        summary: formData.summary || '',
      };

      const { error, data: savedData } =
        // Use the new normalizedData object to save
        await personalInfoService.savePersonalInfo(normalizedData);

      if (error) {
        console.error('Error saving personal info:', error);
        message.error('Failed to save personal information');
        return;
      }

      message.success('Personal information saved successfully!');

      if (savedData) {
        // The data returned from the DB is the source of truth, so we format and use it
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
        // Fallback to the normalized data if for some reason savedData isn't returned
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

  // Load data on component mount
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

  useEffect(() => {
    if (hasLoaded && data) {
      const currentValues = form.getFieldsValue();
      const hasChanges = Object.keys(data).some(
        (key) => currentValues[key] !== data[key as keyof PersonalInfo]
      );

      if (hasChanges) {
        form.setFieldsValue(data);
      }
    }
  }, [data, form, hasLoaded]);

  if (loading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}
      >
        <Spin size="large" />
      </div>
    );
  }

  const AddSectionButton = ({
    onClick,
    icon,
    text,
  }: {
    onClick: () => void;
    icon: React.ReactNode;
    text: string;
  }) => (
    <Button
      type="dashed"
      onClick={onClick}
      style={{
        height: '60px',
        width: '100%',
        border: '2px dashed #d9d9d9',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.3s ease',
        background: '#fafafa',
      }}
      className="hover:border-blue-400 hover:bg-blue-50"
    >
      <div style={{ fontSize: '18px', color: '#1890ff' }}>{icon}</div>
      <span style={{ fontWeight: '500', color: '#262626', fontSize: '14px' }}>
        {text}
      </span>
    </Button>
  );

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
          <span
            style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#2c3e50',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <UserOutlined style={{ color: '#3498db' }} />
            Personal Information
          </span>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={saving}
            onClick={handleSave}
            style={{
              background: '#1890ff',
              borderColor: '#1890ff',
              borderRadius: '6px',
              fontWeight: '500',
            }}
          >
            Save
          </Button>
        </div>
      }
      className="mb-8"
      headStyle={{ borderBottom: '1px solid #e8e8e8', padding: '0 24px' }}
      bodyStyle={{ padding: '24px' }}
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e8e8e8',
        transition: 'all 0.3s ease',
      }}
      hoverable
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={data}
        onValuesChange={handleValuesChange}
        style={{ width: '100%' }}
      >
        {/* Essential Information */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              color: '#1890ff',
              marginBottom: '16px',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <UserOutlined />
            Essential Information
          </h3>

          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="fullName"
                label={
                  <span style={{ fontWeight: '500', color: '#34495e' }}>
                    Full Name
                  </span>
                }
                rules={[
                  { required: true, message: 'Full Name is required' },
                  { min: 2, message: 'Name must be at least 2 characters' },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: '#7f8c8d' }} />}
                  placeholder="Enter your full name"
                  style={{
                    background: '#ffffff',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    border: '1px solid #e0e0e0',
                  }}
                  className="hoverable-input"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label={
                  <span style={{ fontWeight: '500', color: '#34495e' }}>
                    Email
                  </span>
                }
                rules={[
                  { required: true, message: 'Email is required' },
                  { type: 'email', message: 'Invalid email format' },
                ]}
              >
                <Input
                  prefix={<MailOutlined style={{ color: '#7f8c8d' }} />}
                  placeholder="Enter your email"
                  style={{
                    background: '#ffffff',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    border: '1px solid #e0e0e0',
                  }}
                  className="hoverable-input"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="phone"
                label={
                  <span style={{ fontWeight: '500', color: '#34495e' }}>
                    Phone
                  </span>
                }
                rules={[
                  { required: true, message: 'Phone is required' },
                  {
                    pattern: /^\+?[\d\s-]{10,}$/,
                    message: 'Enter a valid phone number',
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined style={{ color: '#7f8c8d' }} />}
                  placeholder="Enter your phone number"
                  style={{
                    background: '#ffffff',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    border: '1px solid #e0e0e0',
                  }}
                  className="hoverable-input"
                />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <Divider />

        {/* Job Title Section */}
        {showJobTitle ? (
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <h3
                style={{
                  color: '#1890ff',
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <EditOutlined />
                Professional Title
              </h3>
              <Button
                type="text"
                size="small"
                onClick={() => {
                  setShowJobTitle(false);
                  form.setFieldValue('jobTitle', '');
                  // --- UI FIX: Update parent state immediately ---
                  onChange({ ...data, jobTitle: '' });
                }}
                style={{ color: '#ff4d4f' }}
              >
                Remove
              </Button>
            </div>
            <Row gutter={[24, 16]}>
              <Col xs={24}>
                <Form.Item
                  name="jobTitle"
                  label={
                    <span style={{ fontWeight: '500', color: '#34495e' }}>
                      Job Title
                    </span>
                  }
                  rules={[{ required: true, message: 'Job Title is required' }]}
                >
                  <Input
                    placeholder="e.g., Senior Software Engineer"
                    style={{
                      background: '#ffffff',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                    }}
                    className="hoverable-input"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        ) : null}

        {/* Location Section */}
        {showLocation ? (
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <h3
                style={{
                  color: '#1890ff',
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <EnvironmentOutlined />
                Location
              </h3>
              <Button
                type="text"
                size="small"
                onClick={() => {
                  setShowLocation(false);
                  form.setFieldValue('location', '');
                  // --- UI FIX: Update parent state immediately ---
                  onChange({ ...data, location: '' });
                }}
                style={{ color: '#ff4d4f' }}
              >
                Remove
              </Button>
            </div>
            <Row gutter={[24, 16]}>
              <Col xs={24}>
                <Form.Item
                  name="location"
                  label={
                    <span style={{ fontWeight: '500', color: '#34495e' }}>
                      Location
                    </span>
                  }
                >
                  <Input
                    prefix={<CompassOutlined style={{ color: '#7f8c8d' }} />}
                    placeholder="e.g., San Francisco, CA"
                    style={{
                      background: '#ffffff',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                    }}
                    className="hoverable-input"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        ) : null}

        {/* Summary Section */}
        {showSummary ? (
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <h3
                style={{
                  color: '#1890ff',
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <FileTextOutlined />
                Professional Summary
              </h3>
              <Button
                type="text"
                size="small"
                onClick={() => {
                  setShowSummary(false);
                  form.setFieldValue('summary', '');
                  // --- UI FIX: Update parent state immediately ---
                  onChange({ ...data, summary: '' });
                }}
                style={{ color: '#ff4d4f' }}
              >
                Remove
              </Button>
            </div>
            <Row gutter={[24, 16]}>
              <Col xs={24}>
                <Form.Item
                  name="summary"
                  label={
                    <span style={{ fontWeight: '500', color: '#34495e' }}>
                      About You
                    </span>
                  }
                  rules={[
                    { required: true, message: 'Summary is required' },
                    {
                      min: 50,
                      message: 'Summary should be at least 50 characters',
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Write a brief professional summary..."
                    style={{
                      background: '#ffffff',
                      borderRadius: '8px',
                      padding: '12px',
                      border: '1px solid #e0e0e0',
                    }}
                    className="hoverable-input"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        ) : null}

        {/* Links Section */}
        {showLinks ? (
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <h3
                style={{
                  color: '#1890ff',
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <LinkOutlined />
                Professional Links
              </h3>
              <Button
                type="text"
                size="small"
                onClick={() => {
                  setShowLinks(false);
                  const newValues = { website: '', linkedin: '', github: '' };
                  form.setFieldsValue(newValues);
                  // --- UI FIX: Update parent state immediately ---
                  onChange({ ...data, ...newValues });
                }}
                style={{ color: '#ff4d4f' }}
              >
                Remove All
              </Button>
            </div>
            <Row gutter={[24, 16]}>
              <Col xs={24} md={8}>
                <Form.Item
                  name="website"
                  label={
                    <span style={{ fontWeight: '500', color: '#34495e' }}>
                      Website
                    </span>
                  }
                >
                  <Input
                    prefix={<GlobalOutlined style={{ color: '#7f8c8d' }} />}
                    placeholder="https://yourwebsite.com"
                    style={{
                      background: '#ffffff',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                    }}
                    className="hoverable-input"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  name="linkedin"
                  label={
                    <span style={{ fontWeight: '500', color: '#34495e' }}>
                      LinkedIn
                    </span>
                  }
                >
                  <Input
                    prefix={<LinkedinOutlined style={{ color: '#0077b5' }} />}
                    placeholder="linkedin.com/in/yourprofile"
                    style={{
                      background: '#ffffff',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                    }}
                    className="hoverable-input"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  name="github"
                  label={
                    <span style={{ fontWeight: '500', color: '#34495e' }}>
                      GitHub
                    </span>
                  }
                >
                  <Input
                    prefix={<GithubOutlined style={{ color: '#333' }} />}
                    placeholder="github.com/yourusername"
                    style={{
                      background: '#ffffff',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                    }}
                    className="hoverable-input"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        ) : null}

        {/* Add Section Buttons */}
        {(!showJobTitle || !showLocation || !showSummary || !showLinks) && (
          <div style={{ marginTop: '32px' }}>
            <Row gutter={[12, 12]} justify="center">
              {!showJobTitle && (
                <Col xs={12} sm={8} md={6} lg={5}>
                  <AddSectionButton
                    onClick={() => setShowJobTitle(true)}
                    icon={<EditOutlined />}
                    text="Job Title"
                  />
                </Col>
              )}
              {!showLocation && (
                <Col xs={12} sm={8} md={6} lg={5}>
                  <AddSectionButton
                    onClick={() => setShowLocation(true)}
                    icon={<EnvironmentOutlined />}
                    text="Location"
                  />
                </Col>
              )}
              {!showSummary && (
                <Col xs={12} sm={8} md={6} lg={5}>
                  <AddSectionButton
                    onClick={() => setShowSummary(true)}
                    icon={<FileTextOutlined />}
                    text="Summary"
                  />
                </Col>
              )}
              {!showLinks && (
                <Col xs={12} sm={8} md={6} lg={5}>
                  <AddSectionButton
                    onClick={() => setShowLinks(true)}
                    icon={<LinkOutlined />}
                    text="Links"
                  />
                </Col>
              )}
            </Row>
          </div>
        )}
      </Form>
    </Card>
  );
};
