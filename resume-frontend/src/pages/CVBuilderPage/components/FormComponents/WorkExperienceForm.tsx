import { Card, Button, Form, Input, DatePicker, Space } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { WorkExperience } from "../types";
import TextArea from "antd/es/input/TextArea";

interface WorkExperienceFormProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

export const WorkExperienceForm = ({
  data,
  onChange,
}: WorkExperienceFormProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onChange(values.workExperience);
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    onChange(allValues.workExperience);
  };

  const onAdd = () => {
    form.setFieldsValue({
      workExperience: [
        ...data,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          description: [],
          technologies: [],
        },
      ],
    });
  };

  const onRemove = (index: number) => {
    const workExperience = form.getFieldValue("workExperience");
    workExperience.splice(index, 1);
    form.setFieldsValue({ workExperience });
  };

  return (
    <Card className="mb-8">
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        initialValues={{ workExperience: data }}
      >
        <Form.List name="workExperience">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="border p-4 rounded-lg space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name={[name, "company"]}
                      label="Company"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={[name, "position"]}
                      label="Position"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={[name, "location"]}
                      label="Location"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={[name, "startDate"]}
                      label="Start Date"
                      rules={[{ required: true }]}
                    >
                      <DatePicker className="w-full" />
                    </Form.Item>
                    <Form.Item
                      name={[name, "endDate"]}
                      label="End Date"
                      rules={[{ required: true }]}
                    >
                      <DatePicker className="w-full" />
                    </Form.Item>
                  </div>

                  <Form.List name={[name, "description"]}>
                    {(descriptionFields, { add, remove }) => (
                      <>
                        {descriptionFields.map(
                          ({
                            key,
                            name: descriptionName,
                            ...restDescriptionField
                          }) => (
                            <Space
                              key={key}
                              align="baseline"
                              className="w-full"
                            >
                              <Form.Item
                                {...restDescriptionField}
                                name={[descriptionName]}
                                className="w-full"
                              >
                                <TextArea
                                  placeholder="Job Description"
                                  rows={2}
                                />
                              </Form.Item>
                              <Button
                                type="link"
                                danger
                                onClick={() => remove(descriptionName)}
                                icon={<MinusCircleOutlined />}
                              />
                            </Space>
                          )
                        )}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block>
                            Add Description
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>

                  <Form.List name={[name, "technologies"]}>
                    {(technologyFields, { add, remove }) => (
                      <>
                        {technologyFields.map(
                          ({
                            key,
                            name: technologyName,
                            ...restTechnologyField
                          }) => (
                            <Space
                              key={key}
                              align="baseline"
                              className="w-full"
                            >
                              <Form.Item
                                {...restTechnologyField}
                                name={[technologyName]}
                                className="w-full"
                              >
                                <Input placeholder="Technology" />
                              </Form.Item>
                              <Button
                                type="link"
                                danger
                                onClick={() => remove(technologyName)}
                                icon={<MinusCircleOutlined />}
                              />
                            </Space>
                          )
                        )}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block>
                            Add Technology
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>

                  <Button
                    type="link"
                    danger
                    onClick={() => onRemove(name)}
                    icon={<MinusCircleOutlined />}
                  >
                    Remove Work Experience
                  </Button>
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={onAdd} block>
                  <PlusOutlined /> Add Work Experience
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
