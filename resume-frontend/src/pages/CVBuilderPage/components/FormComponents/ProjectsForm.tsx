import { Card, Button, Form, Input, DatePicker } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Project } from "../types";

interface ProjectFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectForm = ({ data, onChange }: ProjectFormProps) => {
  const [form] = Form.useForm();

  // const onFinish = (values: any) => {
  //   onChange(values.projects);
  // };

  const onFinish = (values: any) => {
    const projects = values.projects.map((project: any) => ({
      ...project,
      technologies:
        typeof project.technologies === "string"
          ? project.technologies.split(",").map((tech: string) => tech.trim())
          : project.technologies,
    }));
    onChange(projects);
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name={[name, "title"]}
                      label="Project Title"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={[name, "description"]}
                      label="Description"
                      rules={[{ required: true }]}
                    >
                      <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                      name={[name, "technologies"]}
                      label="Technologies Used"
                      rules={[{ required: true, type: "array" }]}
                    >
                      <Input placeholder="Comma-separated values" />
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
                    <Form.Item name={[name, "link"]} label="Project Link">
                      <Input />
                    </Form.Item>
                  </div>
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
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
