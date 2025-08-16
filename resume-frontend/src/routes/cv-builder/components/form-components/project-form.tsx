import {
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  Divider,
  Typography,
  Row,
  Col,
} from 'antd';
import { PlusOutlined, DeleteOutlined, CodeOutlined } from '@ant-design/icons';
import { Project } from '../../types/types';
import { BriefcaseBusinessIcon } from 'lucide-react';

const { Title, Text } = Typography;

interface ProjectFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

const inputStyle: React.CSSProperties = {
  borderRadius: '8px',
  height: '40px',
  border: '1px solid #d0d7e0',
  fontSize: '14px',
};

const textareaStyle: React.CSSProperties = {
  borderRadius: '8px',
  border: '1px solid #d0d7e0',
  fontSize: '14px',
  resize: 'vertical' as const,
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

export const ProjectForm = ({ data, onChange }: ProjectFormProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: { projects: Project[] }) => {
    onChange(values.projects);
  };

  const onValuesChange = (
    _changedValues: any,
    allValues: { projects: Project[] }
  ) => {
    onChange(allValues.projects);
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
                d="M3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3ZM12 15V17H18V15H12ZM8.414 12L5.586 14.828L7 16.243L11.243 12L7 7.757L5.586 9.172L8.414 12Z"
                fill="#1a3353"
              />
            </svg>
            Projects
          </span>
        </Title>
      }
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        initialValues={{ projects: data }}
        style={{ width: '100%' }}
      >
        <Form.List name="projects">
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

                  <div style={{ marginBottom: '16px' }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'title']}
                      label={
                        <Text
                          strong
                          style={{ color: '#1a3353', fontSize: '14px' }}
                        >
                          Project Title
                        </Text>
                      }
                      rules={[
                        {
                          required: true,
                          message: 'Project title is required',
                        },
                      ]}
                    >
                      <Input placeholder="Project name" style={inputStyle} />
                    </Form.Item>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'link']}
                      label={
                        <Text
                          strong
                          style={{ color: '#1a3353', fontSize: '14px' }}
                        >
                          Project Link
                        </Text>
                      }
                    >
                      <Input
                        placeholder="GitHub link, live demo, etc."
                        style={inputStyle}
                      />
                    </Form.Item>
                  </div>

                  <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'startDate']}
                        label={
                          <Text
                            strong
                            style={{ color: '#1a3353', fontSize: '14px' }}
                          >
                            Start Date
                          </Text>
                        }
                        rules={[
                          { required: true, message: 'Start date is required' },
                        ]}
                      >
                        <DatePicker style={{ ...inputStyle, width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'endDate']}
                        label={
                          <Text
                            strong
                            style={{ color: '#1a3353', fontSize: '14px' }}
                          >
                            End Date
                          </Text>
                        }
                      >
                        <DatePicker
                          style={{ ...inputStyle, width: '100%' }}
                          placeholder="Select end date"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

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
                      <BriefcaseBusinessIcon
                        size={16}
                        style={{ color: '#52c41a' }}
                      />
                      Project Description
                    </span>
                  </Divider>

                  <div style={{ marginBottom: '20px' }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      rules={[
                        { required: true, message: 'Description is required' },
                      ]}
                    >
                      <Input.TextArea
                        rows={4}
                        placeholder="Describe your project, your role, and key achievements"
                        style={textareaStyle}
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
                      <CodeOutlined style={{ color: '#722ed1' }} />
                      Technologies Used
                    </span>
                  </Divider>

                  <Form.List name={[name, 'technologies']}>
                    {(technologyFields, { add: addTechnology, remove }) => (
                      <div>
                        {technologyFields.map(
                          ({
                            key: techKey,
                            name: techName,
                            ...restTechnologyField
                          }) => (
                            <Row
                              key={techKey}
                              gutter={[8, 8]}
                              style={{ marginBottom: '12px' }}
                            >
                              <Col flex="1">
                                <Form.Item
                                  {...restTechnologyField}
                                  name={[techName]}
                                  style={{ marginBottom: 0 }}
                                >
                                  <Input
                                    placeholder="Technology or tool used"
                                    style={inputStyle}
                                  />
                                </Form.Item>
                              </Col>
                              <Col>
                                <Button
                                  type="text"
                                  danger
                                  icon={<DeleteOutlined />}
                                  onClick={() => remove(techName)}
                                  style={{
                                    ...deleteButtonStyle,
                                    color: '#ff4d4f',
                                  }}
                                />
                              </Col>
                            </Row>
                          )
                        )}
                        <Button
                          type="dashed"
                          onClick={() => addTechnology('')}
                          icon={<PlusOutlined />}
                          style={{
                            ...buttonStyle,
                            borderColor: '#4096ff',
                            color: '#4096ff',
                            width: '100%',
                          }}
                        >
                          Add Technology
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
                    title: '',
                    description: '',
                    technologies: [],
                    startDate: null,
                    endDate: null,
                    link: '',
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
                Add Project
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
            Save Projects
          </Button>
        </div>
      </Form>
    </Card>
  );
};
