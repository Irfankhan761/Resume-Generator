import {
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  Space,
  Switch,
  FormListFieldData,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Education } from "../types";

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

interface EducationFormListField extends FormListFieldData {
  id: string;
}

export const EducationForm = ({ data, onChange }: EducationFormProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onChange(values.education);
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    onChange(allValues.education);
  };

  const onAdd = () => {
    form.setFieldsValue({
      education: [
        ...data,
        {
          id: Date.now().toString(),
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          gpa: "",
          achievements: [],
          current: false,
        },
      ],
    });
  };

  const onRemove = (index: number) => {
    const education = form.getFieldValue("education");
    education.splice(index, 1);
    form.setFieldsValue({ education });
  };

  return (
    <Card className="mb-8">
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        initialValues={{ education: data }}
      >
        <Form.List name="education">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="border p-4 rounded-lg space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name={[name, "institution"]}
                      label="Institution"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={[name, "degree"]}
                      label="Degree"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={[name, "field"]}
                      label="Field of Study"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item name={[name, "gpa"]} label="GPA">
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
                      <DatePicker
                        className="w-full"
                        disabled={form.getFieldValue([
                          "education",
                          name,
                          "current",
                        ])}
                      />
                    </Form.Item>
                    <Form.Item
                      name={[name, "current"]}
                      label="Currently studying here"
                      valuePropName="checked"
                    >
                      <Switch
                        onChange={(checked) => {
                          form.setFieldsValue({
                            education: form
                              .getFieldValue("education")
                              .map((edu: Education) =>
                                edu.id ===
                                (fields as EducationFormListField[]).find(
                                  (field) => field.name === name
                                )?.id
                                  ? { ...edu, current: checked }
                                  : edu
                              ),
                          });
                          onChange(form.getFieldValue("education"));
                        }}
                      />
                    </Form.Item>
                  </div>

                  <Form.List name={[name, "achievements"]}>
                    {(achievementFields, { add, remove }) => (
                      <>
                        {achievementFields.map(
                          ({
                            key,
                            name: achievementName,
                            ...restAchievementField
                          }) => (
                            <Space
                              key={key}
                              align="baseline"
                              className="w-full"
                            >
                              <Form.Item
                                {...restAchievementField}
                                name={[achievementName]}
                                className="w-full"
                              >
                                <Input placeholder="Achievement" />
                              </Form.Item>
                              <Button
                                type="link"
                                danger
                                onClick={() => remove(achievementName)}
                                icon={<MinusCircleOutlined />}
                              />
                            </Space>
                          )
                        )}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block>
                            Add Achievement
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
                    Remove Education
                  </Button>
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={onAdd} block>
                  <PlusOutlined /> Add Education
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
