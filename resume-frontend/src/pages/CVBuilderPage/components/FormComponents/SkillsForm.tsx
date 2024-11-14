import { Card, Button, Form, Input, Space } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Skill } from "../types";

interface SkillFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export const SkillForm = ({ data, onChange }: SkillFormProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onChange(values.skills);
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    onChange(allValues.skills);
  };

  const onAdd = () => {
    form.setFieldsValue({
      skills: [
        ...data,
        {
          id: Date.now().toString(),
          category: "",
          skills: [],
        },
      ],
    });
  };

  const onRemove = (index: number) => {
    const skills = form.getFieldValue("skills");
    skills.splice(index, 1);
    form.setFieldsValue({ skills });
  };

  return (
    <Card className="mb-8">
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        initialValues={{ skills: data }}
      >
        <Form.List name="skills">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="border p-4 rounded-lg space-y-4">
                  <Form.Item
                    {...restField}
                    name={[name, "category"]}
                    label="Category"
                    rules={[
                      { required: true, message: "Category is required" },
                    ]}
                    className="w-full"
                  >
                    <Input placeholder="Enter skill category (e.g., Frontend, Backend)" />
                  </Form.Item>

                  <Form.List name={[name, "skills"]}>
                    {(skillFields, { add, remove }) => (
                      <>
                        {skillFields.map(
                          ({ key, name: skillName, ...restSkillField }) => (
                            <Space
                              key={key}
                              align="baseline"
                              className="w-full"
                            >
                              <Form.Item
                                {...restSkillField}
                                name={[skillName]}
                                className="w-full"
                              >
                                <Input placeholder="Skill (e.g., React, Node.js)" />
                              </Form.Item>
                              <Button
                                type="link"
                                danger
                                onClick={() => remove(skillName)}
                                icon={<MinusCircleOutlined />}
                              />
                            </Space>
                          )
                        )}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block>
                            Add Skill
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
                    Remove Category
                  </Button>
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={onAdd} block>
                  <PlusOutlined /> Add Skill Category
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Skills
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
