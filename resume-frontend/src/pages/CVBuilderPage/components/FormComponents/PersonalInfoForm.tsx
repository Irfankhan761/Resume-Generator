// components/preview/PersonalInfoForm.tsx

import { Card, Form, Input } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  CompassOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import type { PersonalInfo } from "../types";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm = ({ data, onChange }: PersonalInfoFormProps) => {
  const [form] = Form.useForm();

  const handleValuesChange = (_: any, allValues: PersonalInfo) => {
    onChange(allValues);
  };

  return (
    <Card title="Personal Information" style={{ margin: "20px" }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={data}
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[
            { required: true, message: "Full Name is required" },
            { min: 2, message: "Name is too short" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          name="jobTitle"
          label="Job Title"
          rules={[{ required: true, message: "Job Title is required" }]}
        >
          <Input placeholder="Job Title" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: "Phone is required" },
            {
              pattern: /^\+?[\d\s-]{10,}$/,
              message: "Invalid phone format",
            },
          ]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Phone" />
        </Form.Item>

        <Form.Item name="location" label="Location">
          <Input prefix={<CompassOutlined />} placeholder="Location" />
        </Form.Item>

        <Form.Item name="website" label="Website">
          <Input prefix={<GlobalOutlined />} placeholder="Website" />
        </Form.Item>

        <Form.Item name="linkedin" label="LinkedIn">
          <Input prefix={<LinkedinOutlined />} placeholder="LinkedIn" />
        </Form.Item>

        <Form.Item name="github" label="GitHub">
          <Input prefix={<GithubOutlined />} placeholder="GitHub" />
        </Form.Item>

        <Form.Item
          name="summary"
          label="summary"
          rules={[
            { required: true, message: "Summary is required" },
            { min: 50, message: "Summary should be at least 50 characters" },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Profile Summary" />
        </Form.Item>
      </Form>
    </Card>
  );
};
