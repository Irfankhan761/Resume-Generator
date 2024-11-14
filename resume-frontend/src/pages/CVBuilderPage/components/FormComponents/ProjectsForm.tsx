import { Card, Button, Form, Input, DatePicker, Space } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Project } from "../types";
import TextArea from "antd/es/input/TextArea";

interface ProjectFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectForm = ({ data, onChange }: ProjectFormProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onChange(values.projects);
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    onChange(allValues.projects);
  };

  const onAdd = () => {
    form.setFieldsValue({
      projects: [
        ...data,
        {
          id: Date.now().toString(),
          title: "",
          description: "",
          technologies: [],
          startDate: "",
          endDate: "",
          link: "",
        },
      ],
    });
  };

  const onRemove = (index: number) => {
    const projects = form.getFieldValue("projects");
    projects.splice(index, 1);
    form.setFieldsValue({ projects });
  };

  return (
    <Card className="mb-8">
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        initialValues={{ projects: data }}
      >
        <Form.List name="projects">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="border p-4 rounded-lg space-y-4">
                  <Form.Item
                    {...restField}
                    name={[name, "title"]}
                    label="Project Title"
                    rules={[{ required: true, message: "Title is required" }]}
                    className="w-full"
                  >
                    <Input placeholder="Enter project title" />
                  </Form.Item>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      {...restField}
                      name={[name, "startDate"]}
                      label="Start Date"
                      rules={[
                        { required: true, message: "Start date is required" },
                      ]}
                    >
                      <DatePicker className="w-full" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "endDate"]}
                      label="End Date"
                    >
                      <DatePicker className="w-full" />
                    </Form.Item>
                  </div>

                  <Form.Item
                    {...restField}
                    name={[name, "description"]}
                    label="Description"
                    rules={[
                      { required: true, message: "Description is required" },
                    ]}
                  >
                    <TextArea
                      placeholder="Describe the project, your role, and key achievements"
                      rows={4}
                      className="w-full"
                    />
                  </Form.Item>

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
                                <Input placeholder="Technology (e.g., React, Node.js)" />
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

                  <Form.Item
                    {...restField}
                    name={[name, "link"]}
                    label="Project Link"
                  >
                    <Input placeholder="Optional: Add project link (e.g., GitHub)" />
                  </Form.Item>

                  <Button
                    type="link"
                    danger
                    onClick={() => onRemove(name)}
                    icon={<MinusCircleOutlined />}
                  >
                    Remove Project
                  </Button>
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={onAdd} block>
                  <PlusOutlined /> Add Project
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Projects
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
