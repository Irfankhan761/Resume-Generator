import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Card,
  Form,
  Input,
  Row,
  Col,
  Button,
  message,
  Spin,
  Typography,
  Divider,
} from 'antd';
import {
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
import CvProfilePictureUploader from './cv-profile-picture';

const { Title, Text } = Typography;

interface PersonalInfoFormProps {
  data: PersonalInfo & { profileImage?: string };
  onChange: (data: PersonalInfo & { profileImage?: string }) => void;
  onSave?: () => void;
}

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
  const [isUploadingProfileImage, setIsUploadingProfileImage] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [visibility, setVisibility] = useState<SectionVisibility>({
    jobTitle: false,
    location: false,
    summary: false,
    links: false,
  });

  const hasLoaded = useRef(false);

  const handleValuesChange = useCallback(
    (_: any, allValues: PersonalInfo) => {
      if (hasLoaded.current) {
        onChange({ ...allValues, profileImage: data.profileImage });
      }
    },
    [onChange, data.profileImage]
  );

  const handleProfileImageUploadSuccess = useCallback(
    (publicUrl: string | null) => {
      const updatedData = { ...data, profileImage: publicUrl || undefined };
      onChange(updatedData);
      form.setFieldsValue({ profileImage: publicUrl });
    },
    [data, onChange, form]
  );

  const handleSave = async () => {
    try {
      setSaving(true);
      const formData = await form.validateFields();

      const normalizedData: PersonalInfo & { profileImage?: string } = {
        ...formData,
        jobTitle: visibility.jobTitle ? formData.jobTitle || '' : '',
        location: visibility.location ? formData.location || '' : '',
        summary: visibility.summary ? formData.summary || '' : '',
        website: visibility.links ? formData.website || '' : '',
        linkedin: visibility.links ? formData.linkedin || '' : '',
        github: visibility.links ? formData.github || '' : '',
        profileImage: data.profileImage,
      };

      const { error } = await personalInfoService.savePersonalInfo(
        normalizedData
      );

      if (error) {
        message.error('Failed to save personal information.');
        return;
      }

      message.success('Personal information saved successfully!');
      onSave?.();
    } catch (error) {
      console.error('Save error:', error);
      message.error('Please complete all required fields before saving.');
    } finally {
      setSaving(false);
    }
  };

  const loadPersonalInfo = useCallback(async () => {
    try {
      const { data: savedData, error } =
        await personalInfoService.loadPersonalInfo();

      if (error && (error as any).code !== 'PGRST116') {
        message.error('Failed to load your information.');
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
      console.error('Unexpected error during load:', err);
      message.error('An unexpected error occurred while loading your data.');
    } finally {
      setLoading(false);
      hasLoaded.current = true;
    }
  }, [form, onChange, data]);

  useEffect(() => {
    loadPersonalInfo();
  }, [loadPersonalInfo]);

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

  const currentUserId = 'user_abc_123';

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Spin size="large" />
        <Text className="mt-4 text-gray-500">Loading your profile...</Text>
      </div>
    );
  }

  return (
    <Card
      title={
        <Title level={4} style={{ margin: 0 }}>
          Personal Information
        </Title>
      }
      extra={
        <Button
          type="primary"
          icon={<SaveOutlined />}
          loading={saving || isUploadingProfileImage}
          onClick={handleSave}
          size="large"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      }
      className="mb-8 shadow-sm"
    >
      <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
        <Row gutter={32}>
          <Col xs={24} md={8}>
            <Title level={5}>Profile Picture</Title>
            <CvProfilePictureUploader
              initialImageUrl={data.profileImage}
              userId={currentUserId}
              onUploadSuccess={handleProfileImageUploadSuccess}
              loading={isUploadingProfileImage} // <-- THIS LINE IS THE FIX
              onUploadStart={() => setIsUploadingProfileImage(true)}
              onUploadEnd={() => setIsUploadingProfileImage(false)}
            />
            <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
              Recommended: Square image, max 5MB (JPG, PNG).
            </Text>
          </Col>
          <Col xs={24} md={16}>
            <EssentialInfoFields />
          </Col>
        </Row>

        <Divider />

        <div className="flex justify-between items-center mb-4">
          <Title level={5}>Optional Information</Title>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Add / Edit Optional Details
          </Button>
        </div>

        {visibility.jobTitle && (
          <OptionalInfoSection
            title="Professional Title"
            icon={<EditOutlined />}
            onRemove={createRemoveHandler('jobTitle', ['jobTitle'])}
          >
            <Form.Item name="jobTitle" label="Job Title">
              <Input placeholder="e.g., Senior Software Engineer" />
            </Form.Item>
          </OptionalInfoSection>
        )}

        {visibility.location && (
          <OptionalInfoSection
            title="Location"
            icon={<EnvironmentOutlined />}
            onRemove={createRemoveHandler('location', ['location'])}
          >
            <Form.Item name="location" label="Location">
              <Input
                prefix={<CompassOutlined />}
                placeholder="e.g., San Francisco, CA"
              />
            </Form.Item>
          </OptionalInfoSection>
        )}

        {visibility.summary && (
          <OptionalInfoSection
            title="Professional Summary"
            icon={<FileTextOutlined />}
            onRemove={createRemoveHandler('summary', ['summary'])}
          >
            <Form.Item name="summary" label="About You">
              <Input.TextArea
                rows={4}
                placeholder="A brief summary of your professional background..."
                showCount
                maxLength={500}
              />
            </Form.Item>
          </OptionalInfoSection>
        )}

        {visibility.links && (
          <OptionalInfoSection
            title="Professional Links"
            icon={<LinkOutlined />}
            onRemove={createRemoveHandler('links', [
              'website',
              'linkedin',
              'github',
            ])}
          >
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Form.Item name="website" label="Website">
                  <Input
                    prefix={<GlobalOutlined />}
                    placeholder="https://yourwebsite.com"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item name="linkedin" label="LinkedIn">
                  <Input
                    prefix={<LinkedinOutlined />}
                    placeholder="https://linkedin.com/in/username"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item name="github" label="GitHub">
                  <Input
                    prefix={<GithubOutlined />}
                    placeholder="https://github.com/username"
                  />
                </Form.Item>
              </Col>
            </Row>
          </OptionalInfoSection>
        )}
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
