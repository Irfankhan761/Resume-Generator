import React, { useState, useEffect, useCallback } from 'react';
import { Card, Form, Input, Row, Col, Button, message, Spin } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  CompassOutlined,
  GithubOutlined,
  SaveOutlined,
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

      const { error, data: savedData } =
        await personalInfoService.savePersonalInfo(formData);

      if (error) {
        console.error('Error saving personal info:', error);
        message.error('Failed to save personal information');
        return;
      }

      message.success('Personal information saved successfully!');

      // Update the parent component with the saved data
      // This ensures the preview gets the latest data
      if (savedData) {
        // Convert database format back to component format
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
        // Fallback: use form data if savedData is not available
        onChange(formData);
      }

      // Call the onSave callback if provided
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
          // Update form with saved data
          form.setFieldsValue(savedData);
          // Update parent component with saved data
          onChange(savedData);
        } else {
          // If no saved data, set form with current prop data
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
  }, []); // Only run on mount - we intentionally ignore dependencies here

  // Update form when data prop changes from parent (but only after initial load)
  useEffect(() => {
    if (hasLoaded && data) {
      const currentValues = form.getFieldsValue();
      // Only update if the data is significantly different to avoid unnecessary re-renders
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
        <Row gutter={[24, 16]}>
          {/* Full Name */}
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
                  transition: 'all 0.3s',
                }}
                className="hoverable-input"
              />
            </Form.Item>
          </Col>

          {/* Job Title */}
          <Col xs={24} md={12}>
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
                placeholder="Enter your job title"
                style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.3s',
                }}
                className="hoverable-input"
              />
            </Form.Item>
          </Col>

          {/* Email */}
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
                  transition: 'all 0.3s',
                }}
                className="hoverable-input"
              />
            </Form.Item>
          </Col>

          {/* Phone */}
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
                  transition: 'all 0.3s',
                }}
                className="hoverable-input"
              />
            </Form.Item>
          </Col>

          {/* Location */}
          <Col xs={24} md={12}>
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
                placeholder="Enter your location"
                style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.3s',
                }}
                className="hoverable-input"
              />
            </Form.Item>
          </Col>

          {/* Website */}
          <Col xs={24} md={12}>
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
                placeholder="Enter your website"
                style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.3s',
                }}
                className="hoverable-input"
              />
            </Form.Item>
          </Col>

          {/* LinkedIn */}
          <Col xs={24} md={12}>
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
                placeholder="Enter your LinkedIn profile"
                style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.3s',
                }}
                className="hoverable-input"
              />
            </Form.Item>
          </Col>

          {/* GitHub */}
          <Col xs={24} md={12}>
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
                placeholder="Enter your GitHub profile"
                style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.3s',
                }}
                className="hoverable-input"
              />
            </Form.Item>
          </Col>

          {/* Summary */}
          <Col xs={24}>
            <Form.Item
              name="summary"
              label={
                <span style={{ fontWeight: '500', color: '#34495e' }}>
                  Summary
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
                placeholder="Write a brief professional summary"
                style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.3s',
                }}
                className="hoverable-input"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
