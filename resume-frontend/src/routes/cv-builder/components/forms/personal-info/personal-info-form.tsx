// src/components/personal-info-form/PersonalInfoForm.tsx
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  memo,
  useLayoutEffect,
} from 'react';
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

// --- Custom Hook for Breakpoints ---
const useBreakpoint = (breakpoint = 768) => {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(
    window.innerWidth < breakpoint
  );

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsBelowBreakpoint(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isBelowBreakpoint;
};

// --- Component Definition ---

type PersonalInfoData = PersonalInfo & { profileImage?: string };

interface PersonalInfoFormProps {
  data: PersonalInfoData;
  onChange: (data: PersonalInfoData) => void;
  onSave?: () => void;
}

interface SectionVisibility {
  jobTitle: boolean;
  location: boolean;
  summary: boolean;
  links: boolean;
}

const PersonalInfoFormComponent: React.FC<PersonalInfoFormProps> = ({
  data,
  onChange,
  onSave,
}) => {
  const [form] = Form.useForm<PersonalInfoData>();
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

  const [currentProfileImage, setCurrentProfileImage] = useState<
    string | undefined
  >(data.profileImage);

  const isMobile = useBreakpoint(768);

  const isMounted = useRef(false);
  const onChangeRef = useRef(onChange);
  const onSaveRef = useRef(onSave);

  useEffect(() => {
    onChangeRef.current = onChange;
    onSaveRef.current = onSave;
  }, [onChange, onSave]);

  useEffect(() => {
    setCurrentProfileImage(data.profileImage);
  }, [data.profileImage]);

  const loadPersonalInfo = useCallback(async () => {
    try {
      const { data: savedData, error } =
        await personalInfoService.loadPersonalInfo();

      if (error && (error as any).code !== 'PGRST116') {
        throw new Error('Failed to load your information.');
      }

      const initialData = savedData || data;
      form.setFieldsValue(initialData);
      setCurrentProfileImage(initialData.profileImage);
      onChangeRef.current(initialData);
      setVisibility({
        jobTitle: !!initialData.jobTitle,
        location: !!initialData.location,
        summary: !!initialData.summary,
        links: !!(
          initialData.website ||
          initialData.linkedin ||
          initialData.github
        ),
      });
    } catch (err) {
      message.error(
        err instanceof Error ? err.message : 'An unexpected error occurred.'
      );
    } finally {
      setLoading(false);
      isMounted.current = true;
    }
  }, [form, data]);

  useEffect(() => {
    loadPersonalInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleValuesChange = useCallback(() => {
    if (isMounted.current) {
      const allValues = form.getFieldsValue();
      const updatedData = {
        ...allValues,
        profileImage: currentProfileImage,
      };
      onChangeRef.current(updatedData);
    }
  }, [form, currentProfileImage]);

  const handleProfileImageUploadSuccess = useCallback(
    async (publicUrl: string | null) => {
      const newProfileImage = publicUrl || undefined;
      setCurrentProfileImage(newProfileImage);

      const formData = form.getFieldsValue();
      const updatedData = {
        ...formData,
        profileImage: newProfileImage,
      };
      onChangeRef.current(updatedData);

      setSaving(true);
      try {
        const { error } = await personalInfoService.updateProfileImage(
          publicUrl
        );

        if (error) {
          const pretty =
            (error &&
              (error.message ||
                (error as any).error ||
                JSON.stringify(error))) ||
            'Unknown error';
          console.error('Failed to persist profile image change:', error);
          message.error(`Failed to persist profile image change: ${pretty}`);
        } else {
          message.success(
            `Profile picture ${publicUrl ? 'saved' : 'removed'}.`
          );
        }
      } catch (err) {
        console.error('Unexpected error saving profile image change:', err);
        message.error(
          err instanceof Error
            ? `Failed to persist profile image change: ${err.message}`
            : 'Failed to persist profile image change (unknown error).'
        );
      } finally {
        setSaving(false);
      }
    },
    [form]
  );

  const handleSave = useCallback(async () => {
    try {
      const formData = await form.validateFields();
      setSaving(true);

      const normalizedData: PersonalInfoData = {
        ...formData,
        jobTitle: visibility.jobTitle ? formData.jobTitle || '' : '',
        location: visibility.location ? formData.location || '' : '',
        summary: visibility.summary ? formData.summary || '' : '',
        website: visibility.links ? formData.website || '' : '',
        linkedin: visibility.links ? formData.linkedin || '' : '',
        github: visibility.links ? formData.github || '' : '',
        profileImage: currentProfileImage,
      };

      const { error } = await personalInfoService.savePersonalInfo(
        normalizedData
      );
      if (error) throw new Error('Failed to save personal information.');

      message.success('Personal information saved successfully!');
      onSaveRef.current?.();
    } catch (error) {
      if (error && (error as any).errorFields) {
        message.error('Please complete all required fields before saving.');
      } else {
        message.error(
          error instanceof Error
            ? error.message
            : 'An unknown save error occurred.'
        );
      }
    } finally {
      setSaving(false);
    }
  }, [form, visibility, currentProfileImage]);

  const handleModalOk = useCallback(() => {
    const values = form.getFieldsValue();
    setVisibility({
      jobTitle: !!values.jobTitle,
      location: !!values.location,
      summary: !!values.summary,
      links: !!(values.website || values.linkedin || values.github),
    });
    setIsModalVisible(false);
  }, [form]);

  const createRemoveHandler = useCallback(
    (field: keyof SectionVisibility, relatedFields: (keyof PersonalInfo)[]) =>
      () => {
        setVisibility((prev) => ({ ...prev, [field]: false }));
        const resetValues = relatedFields.reduce(
          (acc, key) => ({ ...acc, [key]: undefined }),
          {}
        );
        form.setFieldsValue(resetValues);
        handleValuesChange();
      },
    [form, handleValuesChange]
  );

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
        <Row
          justify={isMobile ? 'center' : 'space-between'}
          align="middle"
          gutter={[16, 16]}
        >
          <Col>
            <Title level={4} style={{ margin: 0 }}>
              Personal Information
            </Title>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={saving || isUploadingProfileImage}
              onClick={handleSave}
              size="large"
            >
              {!isMobile && (saving ? 'Saving...' : 'Save Changes')}
            </Button>
          </Col>
        </Row>
      }
      className="mb-8 shadow-sm"
    >
      <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
        <Row gutter={32}>
          <Col
            xs={24}
            md={8}
            style={
              isMobile
                ? {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '24px',
                  }
                : {}
            }
          >
            <Title level={5}>Profile Picture</Title>
            <CvProfilePictureUploader
              initialImageUrl={currentProfileImage}
              userId={currentUserId}
              onUploadSuccess={handleProfileImageUploadSuccess}
              loading={isUploadingProfileImage}
              onUploadStart={() => setIsUploadingProfileImage(true)}
              onUploadEnd={() => setIsUploadingProfileImage(false)}
            />
            <Text
              type="secondary"
              style={{
                display: 'block',
                marginTop: 8,
                textAlign: 'center',
              }}
            >
              Recommended: Square image, max 5MB (JPG, PNG).
            </Text>
          </Col>
          <Col xs={24} md={16}>
            <EssentialInfoFields />
          </Col>
        </Row>

        <Divider />

        <Row
          justify={isMobile ? 'center' : 'space-between'}
          align="middle"
          gutter={[16, 16]}
          className="mb-4"
        >
          <Col>
            <Title level={5} style={{ margin: 0 }}>
              Optional Information
            </Title>
          </Col>
          <Col>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              Add / Edit Optional Details
            </Button>
          </Col>
        </Row>

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

export const PersonalInfoForm = memo(PersonalInfoFormComponent);
