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
import {
  PlusOutlined,
  DeleteOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Education } from '../../types/types';

const { Title, Text } = Typography;

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationForm = ({ data, onChange }: EducationFormProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: { education: Education[] }) => {
    onChange(values.education);
  };

  const onValuesChange = (
    changedValues: any,
    allValues: { education: Education[] }
  ) => {
    onChange(allValues.education);
  };

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
      }
    >
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        initialValues={{ education: data }}
        layout="vertical"
      >
        <Form.List name="education">
          {(fields, { add, remove }) => (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="education-card"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item
                      {...restField}
                      name={[name, 'institution']}
                      label={
                        <Text
                          strong
                          style={{ color: '#1a3353', marginBottom: 4 }}
                        >
                          Institution
                        </Text>
                      }
                      rules={[
                        { required: true, message: 'Institution is required' },
                      ]}
                    >
                      <Input
                        placeholder="University name"
                        style={{
                          borderRadius: '8px',
                          padding: '12px',
                          border: '1px solid #d0d7e0',
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'degree']}
                      label={
                        <Text
                          strong
                          style={{ color: '#1a3353', marginBottom: 4 }}
                        >
                          Degree
                        </Text>
                      }
                      rules={[
                        { required: true, message: 'Degree is required' },
                      ]}
                    >
                      <Input
                        placeholder="Bachelor's, Master's, etc."
                        style={{
                          borderRadius: '8px',
                          padding: '12px',
                          border: '1px solid #d0d7e0',
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'field']}
                      label={
                        <Text
                          strong
                          style={{ color: '#1a3353', marginBottom: 4 }}
                        >
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
                        placeholder="Computer Science, Business, etc."
                        style={{
                          borderRadius: '8px',
                          padding: '12px',
                          border: '1px solid #d0d7e0',
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'gpa']}
                      label={
                        <Text
                          strong
                          style={{ color: '#1a3353', marginBottom: 4 }}
                        >
                          GPA/Marks
                        </Text>
                      }
                    >
                      <Input
                        placeholder="3.8/4.0 or 90%"
                        style={{
                          borderRadius: '8px',
                          padding: '12px',
                          border: '1px solid #d0d7e0',
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'startDate']}
                      label={
                        <Text
                          strong
                          style={{ color: '#1a3353', marginBottom: 4 }}
                        >
                          Start Date
                        </Text>
                      }
                      rules={[
                        { required: true, message: 'Start date is required' },
                      ]}
                    >
                      <DatePicker
                        placeholder="Select start date"
                        className="w-full"
                        style={{
                          borderRadius: '8px',
                          padding: '10px',
                          border: '1px solid #d0d7e0',
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'endDate']}
                      label={
                        <Text
                          strong
                          style={{ color: '#1a3353', marginBottom: 4 }}
                        >
                          End Date
                        </Text>
                      }
                      rules={[
                        { required: true, message: 'End date is required' },
                      ]}
                    >
                      <DatePicker
                        placeholder="Select end date"
                        className="w-full"
                        style={{
                          borderRadius: '8px',
                          padding: '10px',
                          border: '1px solid #d0d7e0',
                        }}
                        disabled={form.getFieldValue([
                          'education',
                          name,
                          'current',
                        ])}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'current']}
                      label={
                        <Text
                          strong
                          style={{ color: '#1a3353', marginBottom: 4 }}
                        >
                          Currently Studying
                        </Text>
                      }
                      valuePropName="checked"
                    >
                      <Switch
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                        onChange={(checked) => {
                          form.setFieldsValue({
                            education: form
                              .getFieldValue('education')
                              .map((edu: Education, index: number) =>
                                index === name
                                  ? { ...edu, current: checked }
                                  : edu
                              ),
                          });
                          onChange(form.getFieldValue('education'));
                        }}
                      />
                    </Form.Item>
                  </div>

                  <Divider
                    orientation="left"
                    plain
                    style={{
                      margin: '16px 0 20px',
                      borderColor: '#e0e7f0',
                      color: '#4a6ea9',
                      fontWeight: 500,
                    }}
                  >
                    <span
                      style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                    >
                      <TrophyOutlined style={{ color: '#ffc53d' }} />
                      Achievements
                    </span>
                  </Divider>

                  <Form.List name={[name, 'achievements']}>
                    {(achievementFields, { add: addAchievement, remove }) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                        }}
                      >
                        {achievementFields.map(
                          ({
                            key: achievementKey,
                            name: achievementName,
                            ...restAchievementField
                          }) => (
                            <Row
                              key={achievementKey}
                              align="middle"
                              gutter={8}
                              style={{ marginBottom: 8 }}
                            >
                              <Col flex="auto">
                                <Form.Item
                                  {...restAchievementField}
                                  name={[achievementName]}
                                  style={{ marginBottom: 0 }}
                                >
                                  <Input
                                    placeholder="Notable achievement (e.g., Honors, Awards)"
                                    style={{
                                      borderRadius: '8px',
                                      padding: '12px',
                                      border: '1px solid #d0d7e0',
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                              <Col>
                                <Button
                                  type="text"
                                  danger
                                  onClick={() => remove(achievementName)}
                                  icon={<DeleteOutlined />}
                                  style={{ color: '#ff4d4f', height: '100%' }}
                                />
                              </Col>
                            </Row>
                          )
                        )}
                        <Button
                          type="dashed"
                          onClick={() => addAchievement('')}
                          icon={<PlusOutlined />}
                          style={{
                            borderRadius: '8px',
                            borderColor: '#4096ff',
                            color: '#4096ff',
                            marginTop: '8px',
                          }}
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
                    id: Date.now().toString(),
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
                style={{
                  borderRadius: '8px',
                  height: '44px',
                  borderColor: '#13c2c2',
                  color: '#13c2c2',
                  fontWeight: 500,
                  fontSize: '15px',
                  borderWidth: '1.5px',
                }}
              >
                Add Education
              </Button>
            </div>
          )}
        </Form.List>
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              borderRadius: '8px',
              height: '42px',
              background: '#1a73e8',
              borderColor: '#1a73e8',
              fontWeight: 500,
              padding: '0 32px',
              fontSize: '15px',
              boxShadow: '0 2px 8px rgba(26, 115, 232, 0.3)',
            }}
          >
            Save Education Details
          </Button>
        </div>
      </Form>
    </Card>
  );
};
