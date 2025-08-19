import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  Switch,
  Divider,
  Typography,
  Row,
  Col,
  message,
  Spin,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  TrophyOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import type { Education } from '../../types/types';
import { educationService } from 'core/services/education-services'; // Adjust this path if needed
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
  onSave?: () => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  data,
  onChange,
  onSave,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const { data: savedData, error } = await educationService.loadEducation();

      if (error) {
        console.error('Error loading education:', error);
        if (error.code !== 'PGRST116') {
          // PGRST116 means no rows found, which is not an error
          message.error('Failed to load education details.');
        }
      } else if (savedData && savedData.length > 0) {
        const formattedForForm = savedData.map((edu) => ({
          ...edu,
          startDate: edu.startDate ? dayjs(edu.startDate) : null,
          endDate: edu.endDate ? dayjs(edu.endDate) : null,
        }));
        form.setFieldsValue({ education: formattedForForm });
        onChange(savedData);
      } else {
        form.setFieldsValue({ education: data });
      }
      setLoading(false);
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      await form.validateFields();
      const values = form.getFieldsValue();
      const educationData = values.education || [];

      // Convert dayjs objects back to a consistent string format for the database
      const formattedForDb = educationData.map((edu: any) => ({
        ...edu,
        startDate: edu.startDate
          ? dayjs(edu.startDate).format('YYYY-MM-DD')
          : null,
        endDate: edu.endDate ? dayjs(edu.endDate).format('YYYY-MM-DD') : null,
      }));

      const { error, data: savedData } = await educationService.saveEducation(
        formattedForDb
      );

      if (error) {
        throw error;
      }

      message.success('Education details saved successfully!');

      if (savedData) {
        onChange(savedData);
      }

      if (onSave) {
        onSave();
      }
    } catch (errorInfo) {
      console.error('Validation or save error:', errorInfo);
      message.error('Please fix the form errors before saving.');
    } finally {
      setSaving(false);
    }
  };

  const handleValuesChange = (
    _: any,
    allValues: { education: Education[] }
  ) => {
    if (onChange) {
      onChange(allValues.education);
    }
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
      className="mb-8"
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: 'none',
      }}
      title={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Title
            level={4}
            style={{ color: '#1a3353', margin: 0, fontWeight: 600 }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 14L14 12M12 14L10 12M12 14L12 8M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z"
                  stroke="#1a3353"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Education Details
            </span>
          </Title>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={saving}
            onClick={handleSave}
            style={{ borderRadius: '6px' }}
          >
            Save
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        onValuesChange={handleValuesChange}
        initialValues={{ education: data }}
        layout="vertical"
        autoComplete="off"
      >
        <Form.List name="education">
          {(fields, { add, remove }) => (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              {fields.map(({ key, name, ...restField }, index) => (
                <div
                  key={key}
                  style={{
                    background: '#f9fbfd',
                    borderRadius: '10px',
                    padding: '24px',
                    border: '1px solid #e6f0ff',
                    position: 'relative',
                  }}
                >
                  <Button
                    type="text"
                    danger
                    onClick={() => remove(name)}
                    icon={<DeleteOutlined />}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      color: '#ff4d4f',
                      zIndex: 1,
                    }}
                  />
                  <Row gutter={24}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'institution']}
                        label={
                          <Text strong style={{ color: '#1a3353' }}>
                            Institution
                          </Text>
                        }
                        rules={[
                          {
                            required: true,
                            message: 'Institution is required',
                          },
                        ]}
                      >
                        <Input
                          placeholder="e.g., University of Technology"
                          style={{ borderRadius: '8px', padding: '10px' }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'degree']}
                        label={
                          <Text strong style={{ color: '#1a3353' }}>
                            Degree
                          </Text>
                        }
                        rules={[
                          { required: true, message: 'Degree is required' },
                        ]}
                      >
                        <Input
                          placeholder="e.g., Bachelor of Science"
                          style={{ borderRadius: '8px', padding: '10px' }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'field']}
                        label={
                          <Text strong style={{ color: '#1a3353' }}>
                            Field of Study
                          </Text>
                        }
                        rules={[
                          {
                            required: true,
                            message: 'Field of Study is required',
                          },
                        ]}
                      >
                        <Input
                          placeholder="e.g., Computer Science"
                          style={{ borderRadius: '8px', padding: '10px' }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'gpa']}
                        label={
                          <Text strong style={{ color: '#1a3353' }}>
                            GPA/Marks
                          </Text>
                        }
                      >
                        <Input
                          placeholder="e.g., 3.8/4.0 or 90%"
                          style={{ borderRadius: '8px', padding: '10px' }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'startDate']}
                        label={
                          <Text strong style={{ color: '#1a3353' }}>
                            Start Date
                          </Text>
                        }
                        rules={[
                          { required: true, message: 'Start date is required' },
                        ]}
                      >
                        <DatePicker
                          picker="month"
                          placeholder="Select start date"
                          className="w-full"
                          style={{ borderRadius: '8px', padding: '10px' }}
                        />
                      </Form.Item>
                    </Col>
                    {/* FIXED SECTION */}
                    <Col xs={24} md={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'endDate']}
                        label={
                          <Text strong style={{ color: '#1a3353' }}>
                            End Date
                          </Text>
                        }
                        rules={[
                          ({ getFieldValue }) => ({
                            required: !getFieldValue([
                              'education',
                              name,
                              'current',
                            ]),
                            message:
                              'End date is required when not currently studying.',
                          }),
                        ]}
                      >
                        <DatePicker
                          picker="month"
                          placeholder="Select end date"
                          className="w-full"
                          style={{ borderRadius: '8px', padding: '10px' }}
                          disabled={form.getFieldValue([
                            'education',
                            name,
                            'current',
                          ])}
                        />
                      </Form.Item>
                    </Col>
                    {/* END OF FIXED SECTION */}
                    <Col xs={24}>
                      <Form.Item
                        {...restField}
                        name={[name, 'current']}
                        label={
                          <Text strong style={{ color: '#1a3353' }}>
                            Currently Studying
                          </Text>
                        }
                        valuePropName="checked"
                      >
                        <Switch
                          onChange={() =>
                            form.validateFields([
                              ['education', name, 'endDate'],
                            ])
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider
                    orientation="left"
                    plain
                    style={{ color: '#4a6ea9', fontWeight: 500 }}
                  >
                    <span
                      style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                    >
                      {' '}
                      <TrophyOutlined style={{ color: '#ffc53d' }} />{' '}
                      Achievements (Optional)
                    </span>
                  </Divider>
                  <Form.List name={[name, 'achievements']}>
                    {(
                      achievementFields,
                      { add: addAchievement, remove: removeAchievement }
                    ) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                        }}
                      >
                        {achievementFields.map(
                          ({ key: achKey, name: achName, ...restAchField }) => (
                            <Row key={achKey} align="middle" gutter={8}>
                              <Col flex="auto">
                                <Form.Item
                                  {...restAchField}
                                  name={achName}
                                  style={{ marginBottom: 0 }}
                                >
                                  <Input
                                    placeholder="e.g., Dean's List, Scholarship Recipient"
                                    style={{
                                      borderRadius: '8px',
                                      padding: '10px',
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                              <Col>
                                <Button
                                  type="text"
                                  danger
                                  onClick={() => removeAchievement(achName)}
                                  icon={<DeleteOutlined />}
                                />
                              </Col>
                            </Row>
                          )
                        )}
                        <Button
                          type="dashed"
                          onClick={() => addAchievement('')}
                          icon={<PlusOutlined />}
                          style={{ borderRadius: '8px' }}
                        >
                          Add Achievement
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() =>
                  add({
                    id: `temp-${Date.now()}`,
                    institution: '',
                    degree: '',
                    field: '',
                    startDate: null,
                    endDate: null,
                    gpa: '',
                    achievements: [],
                    current: false,
                  })
                }
                icon={<PlusOutlined />}
                style={{ height: '44px', fontWeight: 500 }}
              >
                Add Another Education
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
    </Card>
  );
};
