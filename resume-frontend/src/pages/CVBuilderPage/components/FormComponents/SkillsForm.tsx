import { Card, Button, Form, Input, Space, Select } from "antd";
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

  const onValuesChange = (_: any, allValues: any) => {
    onChange(allValues.skills);
  };

  const onAdd = () => {
    form.setFieldsValue({
      skills: [
        ...data,
        {
          id: Date.now().toString(),
          category: "",
          skills: [{ name: "", level: 25 }],
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
                    label="Skill Category"
                    rules={[
                      {
                        required: true,
                        message: "Please input skill category!",
                      },
                    ]}
                  >
                    <Input placeholder="e.g., Frontend, Backend, Database" />
                  </Form.Item>

                  <Form.List name={[name, "skills"]}>
                    {(skillFields, { add: addSkill, remove: removeSkill }) => (
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
                                name={[skillName, "name"]}
                                label="Skill"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input skill name!",
                                  },
                                ]}
                              >
                                <Input placeholder="Skill Name" />
                              </Form.Item>
                              <Form.Item
                                {...restSkillField}
                                name={[skillName, "level"]}
                                label="Level"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select skill level!",
                                  },
                                ]}
                              >
                                <Select style={{ width: 120 }}>
                                  <Select.Option value={25}>Low</Select.Option>
                                  <Select.Option value={50}>
                                    Medium
                                  </Select.Option>
                                  <Select.Option value={80}>High</Select.Option>
                                  <Select.Option value={100}>
                                    Expert
                                  </Select.Option>
                                </Select>
                              </Form.Item>
                              <Button
                                type="link"
                                danger
                                onClick={() => removeSkill(skillName)}
                                icon={<MinusCircleOutlined />}
                              />
                            </Space>
                          )
                        )}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => addSkill()}
                            block
                          >
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
                    Remove Skill Category
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
