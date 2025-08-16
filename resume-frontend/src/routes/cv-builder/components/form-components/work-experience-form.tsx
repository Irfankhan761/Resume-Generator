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
} from 'antd';
import { PlusOutlined, DeleteOutlined, CodeOutlined } from '@ant-design/icons';
import { WorkExperience } from '../../types/types';
import { BriefcaseBusinessIcon } from 'lucide-react';

const { Title, Text } = Typography;

interface WorkExperienceFormProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
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

export const WorkExperienceForm = ({
  data,
  onChange,
}: WorkExperienceFormProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: { workExperience: WorkExperience[] }) => {
    onChange(values.workExperience);
  };

  const onValuesChange = (
    _changedValues: any,
    allValues: { workExperience: WorkExperience[] }
  ) => {
    onChange(allValues.workExperience);
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
                d="M20 6H4V8H20V6ZM12 10H4V12H12V10ZM16 14H4V16H16V14Z"
                fill="#1a3353"
              />
            </svg>
            Work Experience
          </span>
        </Title>
      }
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        initialValues={{ workExperience: data }}
        style={{ width: '100%' }}
      >
        <Form.List name="workExperience">
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

                  <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'company']}
                        label={
                          <Text
                            strong
                            style={{ color: '#1a3353', fontSize: '14px' }}
                          >
                            Company
                          </Text>
                        }
                        rules={[
                          { required: true, message: 'Company is required' },
                        ]}
                        style={{ marginBottom: 0 }}
                      >
                        <Input placeholder="Company name" style={inputStyle} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'position']}
                        label={
                          <Text
                            strong
                            style={{ color: '#1a3353', fontSize: '14px' }}
                          >
                            Position
                          </Text>
                        }
                        rules={[
                          { required: true, message: 'Position is required' },
                        ]}
                        style={{ marginBottom: 0 }}
                      >
                        <Input placeholder="Job title" style={inputStyle} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
                    <Col xs={24} sm={16}>
                      <Form.Item
                        {...restField}
                        name={[name, 'location']}
                        label={
                          <Text
                            strong
                            style={{ color: '#1a3353', fontSize: '14px' }}
                          >
                            Location
                          </Text>
                        }
                        rules={[
                          { required: true, message: 'Location is required' },
                        ]}
                        style={{ marginBottom: 0 }}
                      >
                        <Input placeholder="City, Country" style={inputStyle} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                      <Form.Item
                        name={[name, 'currentlyWorking']}
                        valuePropName="checked"
                        label={
                          <Text
                            strong
                            style={{ color: '#1a3353', fontSize: '14px' }}
                          >
                            Currently Working
                          </Text>
                        }
                        style={{ marginBottom: 0 }}
                      >
                        <Switch
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                          style={{
                            width: 80,
                            fontSize: 14,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          onChange={(checked) => {
                            form.setFieldsValue({
                              workExperience: form
                                .getFieldValue('workExperience')
                                .map((exp: WorkExperience, index: number) =>
                                  index === name
                                    ? {
                                        ...exp,
                                        currentlyWorking: checked,
                                        endDate: checked ? null : exp.endDate,
                                      }
                                    : exp
                                ),
                            });
                            onChange(form.getFieldValue('workExperience'));
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

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
                        style={{ marginBottom: 0 }}
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
                        rules={[
                          {
                            required: !form.getFieldValue([
                              'workExperience',
                              name,
                              'currentlyWorking',
                            ]),
                            message: 'End date is required',
                          },
                        ]}
                        style={{ marginBottom: 0 }}
                      >
                        <DatePicker
                          style={{ ...inputStyle, width: '100%' }}
                          disabled={form.getFieldValue([
                            'workExperience',
                            name,
                            'currentlyWorking',
                          ])}
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
                      Job Description
                    </span>
                  </Divider>

                  <Form.List name={[name, 'description']}>
                    {(descriptionFields, { add: addDescription, remove }) => (
                      <div style={{ marginBottom: '20px' }}>
                        {descriptionFields.map(
                          ({
                            key,
                            name: descName,
                            ...restDescriptionField
                          }) => (
                            <Row
                              key={key}
                              gutter={[8, 8]}
                              style={{ marginBottom: '12px' }}
                            >
                              <Col flex="1">
                                <Form.Item
                                  {...restDescriptionField}
                                  name={[descName]}
                                  style={{ marginBottom: 0 }}
                                >
                                  <Input.TextArea
                                    rows={3}
                                    placeholder="Describe your responsibilities and achievements"
                                    style={textareaStyle}
                                  />
                                </Form.Item>
                              </Col>
                              <Col>
                                <Button
                                  type="text"
                                  danger
                                  icon={<DeleteOutlined />}
                                  onClick={() => remove(descName)}
                                  style={{
                                    ...deleteButtonStyle,
                                    color: '#ff4d4f',
                                    height: '92px',
                                  }}
                                />
                              </Col>
                            </Row>
                          )
                        )}
                        <Button
                          type="dashed"
                          onClick={() => addDescription('')}
                          icon={<PlusOutlined />}
                          style={{
                            ...buttonStyle,
                            borderColor: '#4096ff',
                            color: '#4096ff',
                            width: '100%',
                          }}
                        >
                          Add Description Point
                        </Button>
                      </div>
                    )}
                  </Form.List>

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
                          ({ key, name: techName, ...restTechnologyField }) => (
                            <Row
                              key={key}
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
                    company: '',
                    position: '',
                    location: '',
                    startDate: null,
                    endDate: null,
                    currentlyWorking: false,
                    description: [],
                    technologies: [],
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
                Add Work Experience
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
            Save Work Experience
          </Button>
        </div>
      </Form>
    </Card>
  );
};
