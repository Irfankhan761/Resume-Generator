import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  Select,
  Divider,
  Typography,
  Row,
  Col,
  Spin,
  message,
} from 'antd';
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Skill } from '../../types/types';
import { skillService } from 'core/services/skill-services'; // Adjust path if needed

const { Title, Text } = Typography;

interface SkillFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
  onSave?: () => void;
}

const inputStyle: React.CSSProperties = {
  /* ... */
};
const buttonStyle: React.CSSProperties = {
  /* ... */
};
const deleteButtonStyle: React.CSSProperties = {
  /* ... */
};

export const SkillForm: React.FC<SkillFormProps> = ({
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
      const { data: savedData, error } = await skillService.loadSkills();

      if (error) {
        console.error('Error loading skills:', error);
        if (error.code !== 'PGRST116') {
          // Ignore "no rows found" error
          message.error('Failed to load skill details.');
        }
      } else if (savedData && savedData.length > 0) {
        form.setFieldsValue({ skills: savedData });
        onChange(savedData);
      } else {
        form.setFieldsValue({ skills: data });
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
      const skillData = values.skills || [];

      const { error, data: savedData } = await skillService.saveSkills(
        skillData
      );

      if (error) {
        throw error;
      }

      message.success('Skill details saved successfully!');

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

  const handleValuesChange = (_: any, allValues: { skills: Skill[] }) => {
    if (onChange) {
      onChange(allValues.skills);
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
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM14 10.5H10V8.5H14V10.5ZM14 15.5H10V13.5H14V15.5Z"
                  fill="#1a3353"
                />
              </svg>
              Skills
            </span>
          </Title>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={saving}
            onClick={handleSave}
            style={{
              borderRadius: '6px',
              background: '#1a73e8',
              borderColor: '#1a73e8',
            }}
          >
            Save Skills
          </Button>
        </div>
      }
    >
      <Form
        layout="vertical"
        form={form}
        onValuesChange={handleValuesChange}
        initialValues={{ skills: data }}
        style={{ width: '100%' }}
      >
        <Form.List name="skills">
          {(fields, { add, remove }) => (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  style={{
                    background: '#f9fbfd',
                    borderRadius: '10px',
                    padding: '20px',
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
                      ...deleteButtonStyle,
                    }}
                  />

                  <Form.Item
                    {...restField}
                    name={[name, 'category']}
                    label={
                      <Text strong style={{ color: '#1a3353' }}>
                        Skill Category
                      </Text>
                    }
                    rules={[
                      { required: true, message: 'Category is required' },
                    ]}
                  >
                    <Input
                      placeholder="e.g., Frontend, Backend, Database"
                      style={inputStyle}
                    />
                  </Form.Item>

                  <Divider
                    orientation="left"
                    plain
                    style={{ color: '#4a6ea9' }}
                  >
                    Skills in this Category
                  </Divider>

                  <Form.List name={[name, 'skills']}>
                    {(skillFields, { add: addSkill, remove: removeSkill }) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                        }}
                      >
                        {skillFields.map(
                          ({
                            key: skillKey,
                            name: skillName,
                            ...restSkillField
                          }) => (
                            <Row key={skillKey} gutter={16} align="bottom">
                              <Col xs={24} sm={14}>
                                <Form.Item
                                  {...restSkillField}
                                  name={[skillName, 'name']}
                                  label="Skill Name"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Skill name is required',
                                    },
                                  ]}
                                  style={{ marginBottom: 0 }}
                                >
                                  <Input
                                    placeholder="e.g., React, Node.js"
                                    style={inputStyle}
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={8}>
                                <Form.Item
                                  {...restSkillField}
                                  name={[skillName, 'level']}
                                  label="Proficiency"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Level is required',
                                    },
                                  ]}
                                  style={{ marginBottom: 0 }}
                                >
                                  <Select
                                    placeholder="Select level"
                                    style={{ ...inputStyle, width: '100%' }}
                                  >
                                    <Select.Option value={25}>
                                      Beginner
                                    </Select.Option>
                                    <Select.Option value={50}>
                                      Intermediate
                                    </Select.Option>
                                    <Select.Option value={75}>
                                      Advanced
                                    </Select.Option>
                                    <Select.Option value={100}>
                                      Expert
                                    </Select.Option>
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={2}>
                                <Button
                                  type="text"
                                  danger
                                  icon={<DeleteOutlined />}
                                  onClick={() => removeSkill(skillName)}
                                  style={{ marginBottom: 0 }}
                                />
                              </Col>
                            </Row>
                          )
                        )}
                        <Button
                          type="dashed"
                          onClick={() => addSkill({ name: '', level: 50 })}
                          icon={<PlusOutlined />}
                          style={{
                            ...buttonStyle,
                            width: '100%',
                            marginTop: '8px',
                          }}
                        >
                          Add Skill
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
                    category: '',
                    skills: [{ name: '', level: 50 }],
                  })
                }
                icon={<PlusOutlined />}
                style={{
                  ...buttonStyle,
                  borderColor: '#13c2c2',
                  color: '#13c2c2',
                  fontSize: '15px',
                  width: '100%',
                }}
              >
                Add Skill Category
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
    </Card>
  );
};
