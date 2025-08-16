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
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Skill } from '../../types/types';

const { Title, Text } = Typography;

interface SkillFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

const inputStyle: React.CSSProperties = {
  borderRadius: '8px',
  height: '40px',
  border: '1px solid #d0d7e0',
  fontSize: '14px',
};

const buttonStyle: React.CSSProperties = {
  borderRadius: '8px',
  height: '40px',
  fontWeight: 500,
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const deleteButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  minWidth: '40px',
  width: '40px',
  padding: '0',
};

export const SkillForm = ({ data, onChange }: SkillFormProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: { skills: Skill[] }) => {
    onChange(values.skills);
  };

  const onValuesChange = (
    _changedValues: any,
    allValues: { skills: Skill[] }
  ) => {
    onChange(allValues.skills);
  };

  return (
    <Card
      className="mb-8"
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: 'none',
        overflow: 'hidden',
      }}
      title={
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
      }
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
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
                    overflow: 'hidden',
                    width: '100%',
                    boxSizing: 'border-box',
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

                  {/* Skill Category */}
                  <div style={{ marginBottom: '16px' }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'category']}
                      label={
                        <Text
                          strong
                          style={{ color: '#1a3353', fontSize: '14px' }}
                        >
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
                  </div>

                  <Divider
                    orientation="left"
                    plain
                    style={{
                      borderColor: '#e0e7f0',
                      color: '#4a6ea9',
                      margin: '16px 0',
                    }}
                  >
                    <span
                      style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                          fill="#52c41a"
                        />
                      </svg>
                      Skills in this Category
                    </span>
                  </Divider>

                  <Form.List name={[name, 'skills']}>
                    {(skillFields, { add: addSkill, remove }) => (
                      <div>
                        {skillFields.map(
                          ({
                            key: skillKey,
                            name: skillName,
                            ...restSkillField
                          }) => (
                            <Row
                              key={skillKey}
                              gutter={[16, 16]}
                              style={{ marginBottom: '16px' }}
                            >
                              <Col xs={24} sm={14}>
                                <Form.Item
                                  {...restSkillField}
                                  name={[skillName, 'name']}
                                  label={
                                    <Text
                                      style={{
                                        color: '#1a3353',
                                        fontSize: '14px',
                                      }}
                                    >
                                      Skill Name
                                    </Text>
                                  }
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Skill name is required',
                                    },
                                  ]}
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
                                  label={
                                    <Text
                                      style={{
                                        color: '#1a3353',
                                        fontSize: '14px',
                                      }}
                                    >
                                      Proficiency
                                    </Text>
                                  }
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Proficiency level is required',
                                    },
                                  ]}
                                >
                                  <Select
                                    style={{ ...inputStyle, width: '100%' }}
                                  >
                                    <Select.Option value={25}>
                                      Low
                                    </Select.Option>
                                    <Select.Option value={50}>
                                      Medium
                                    </Select.Option>
                                    <Select.Option value={75}>
                                      High
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
                                  onClick={() => remove(skillName)}
                                  style={{
                                    ...deleteButtonStyle,
                                    color: '#ff4d4f',
                                    marginTop: '30px',
                                  }}
                                />
                              </Col>
                            </Row>
                          )
                        )}
                        <Button
                          type="dashed"
                          onClick={() => addSkill({ name: '', level: 25 })}
                          icon={<PlusOutlined />}
                          style={{
                            ...buttonStyle,
                            borderColor: '#4096ff',
                            color: '#4096ff',
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
                    id: Date.now().toString(),
                    category: '',
                    skills: [{ name: '', level: 25 }],
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

        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{
              ...buttonStyle,
              background: '#1a73e8',
              borderColor: '#1a73e8',
              padding: '0 32px',
              fontSize: '15px',
              boxShadow: '0 2px 8px rgba(26, 115, 232, 0.3)',
            }}
          >
            Save Skills
          </Button>
        </div>
      </Form>
    </Card>
  );
};
