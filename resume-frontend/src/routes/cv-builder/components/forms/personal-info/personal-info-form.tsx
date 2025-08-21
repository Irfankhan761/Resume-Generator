import React, { useCallback, useEffect, useState } from 'react';
import { Card, Form, Input, Row, Col, Button, message, Spin } from 'antd';
import {
  UserOutlined,
  SaveOutlined,
  EditOutlined,
  FileTextOutlined,
  LinkOutlined,
  EnvironmentOutlined,
  PlusOutlined,
  GlobalOutlined,
  LinkedinOutlined,
  GithubOutlined,
  CompassOutlined,
} from '@ant-design/icons';
import type { PersonalInfo } from '@routes/cv-builder/types/types';
import { EssentialInfoFields } from './essential-info-fields';
import { OptionalDetailsModal } from './optional-details-modal';
import { OptionalInfoSection } from './optional-info-section';
import { personalInfoService } from '../../../services/personal-info-sevice';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  onSave?: () => void;
}

// State to manage visibility of optional sections
interface SectionVisibility {
  jobTitle: boolean;
  location: boolean;
  summary: boolean;
  links: boolean;
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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [visibility, setVisibility] = useState<SectionVisibility>({
    jobTitle: false,
    location: false,
    summary: false,
    links: false,
  });

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

      const normalizedData: PersonalInfo = {
        fullName: formData.fullName || '',
        email: formData.email || '',
        phone: formData.phone || '',
        jobTitle: visibility.jobTitle ? formData.jobTitle || '' : '',
        location: visibility.location ? formData.location || '' : '',
        summary: visibility.summary ? formData.summary || '' : '',
        website: visibility.links ? formData.website || '' : '',
        linkedin: visibility.links ? formData.linkedin || '' : '',
        github: visibility.links ? formData.github || '' : '',
      };

      const { error, data: savedData } =
        await personalInfoService.savePersonalInfo(normalizedData);
      if (error) {
        message.error('Failed to save personal information');
        return;
      }
      message.success('Personal information saved successfully!');

      if (savedData) {
        onChange({
          fullName: savedData.full_name,
          jobTitle: savedData.job_title,
          email: savedData.email,
          phone: savedData.phone,
          location: savedData.location || '',
          website: savedData.website || '',
          linkedin: savedData.linkedin || '',
          github: savedData.github || '',
          summary: savedData.summary,
        });
      } else {
        onChange(normalizedData);
      }

      onSave?.();
    } catch (error) {
      message.error('Please fix the form errors before saving');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const loadPersonalInfo = async () => {
      try {
        const { data: savedData, error } =
          await personalInfoService.loadPersonalInfo();
        if (error && error.code !== 'PGRST116') {
          message.error('Failed to load saved data');
        } else if (savedData) {
          form.setFieldsValue(savedData);
          onChange(savedData);
          setVisibility({
            jobTitle: !!savedData.jobTitle,
            location: !!savedData.location,
            summary: !!savedData.summary,
            links: !!(
              savedData.website ||
              savedData.linkedin ||
              savedData.github
            ),
          });
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
    if (hasLoaded && data) form.setFieldsValue(data);
  }, [data, form, hasLoaded]);

  const handleModalOk = () => {
    const values = form.getFieldsValue();
    setVisibility({
      jobTitle: !!values.jobTitle,
      location: !!values.location,
      summary: !!values.summary,
      links: !!(values.website || values.linkedin || values.github),
    });
    setIsModalVisible(false);
  };

  const createRemoveHandler =
    (field: keyof SectionVisibility, relatedFields: (keyof PersonalInfo)[]) =>
    () => {
      setVisibility((prev) => ({ ...prev, [field]: false }));
      const resetValues = relatedFields.reduce(
        (acc, key) => ({ ...acc, [key]: '' }),
        {}
      );
      form.setFieldsValue(resetValues);
      onChange({ ...data, ...resetValues });
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
      <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
        <EssentialInfoFields />

        {visibility.jobTitle && (
          <OptionalInfoSection
            title="Professional Title"
            icon={<EditOutlined style={{ marginRight: '8px' }} />}
            onRemove={createRemoveHandler('jobTitle', ['jobTitle'])}
          >
            <Form.Item name="jobTitle" label="Job Title">
              <Input readOnly placeholder="e.g., Senior Software Engineer" />
            </Form.Item>
          </OptionalInfoSection>
        )}

        {visibility.location && (
          <OptionalInfoSection
            title="Location"
            icon={<EnvironmentOutlined style={{ marginRight: '8px' }} />}
            onRemove={createRemoveHandler('location', ['location'])}
          >
            <Form.Item name="location" label="Location">
              <Input
                readOnly
                prefix={<CompassOutlined />}
                placeholder="e.g., San Francisco, CA"
              />
            </Form.Item>
          </OptionalInfoSection>
        )}

        {visibility.summary && (
          <OptionalInfoSection
            title="Professional Summary"
            icon={<FileTextOutlined style={{ marginRight: '8px' }} />}
            onRemove={createRemoveHandler('summary', ['summary'])}
          >
            <Form.Item name="summary" label="About You">
              <Input.TextArea
                readOnly
                rows={4}
                placeholder="Brief professional summary..."
              />
            </Form.Item>
          </OptionalInfoSection>
        )}

        {visibility.links && (
          <OptionalInfoSection
            title="Professional Links"
            icon={<LinkOutlined style={{ marginRight: '8px' }} />}
            onRemove={createRemoveHandler('links', [
              'website',
              'linkedin',
              'github',
            ])}
          >
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
          </OptionalInfoSection>
        )}

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

      <OptionalDetailsModal
        form={form}
        isVisible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      />
    </Card>
  );
};
