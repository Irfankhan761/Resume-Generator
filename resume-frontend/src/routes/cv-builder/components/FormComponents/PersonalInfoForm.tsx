import React from "react";
import { Card, Form, Input, Row, Col } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  CompassOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import type { PersonalInfo } from "../../types/types";

// Props Interface
interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  onChange,
}) => {
  const [form] = Form.useForm();

  // Handle Form Value Changes
  const handleValuesChange = (_: any, allValues: PersonalInfo) => {
    onChange(allValues);
  };

  return (
    <Card
      title="Personal Information"
      className="mb-8"
      style={{ background: "#fafafa", borderRadius: "8px", padding: "20px" }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={data}
        onValuesChange={handleValuesChange}
        style={{ width: "100%" }}
      >
        <Row gutter={[16, 16]}>
          {/* Full Name */}
          <Col xs={24} md={12}>
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[
                { required: true, message: "Full Name is required" },
                { min: 2, message: "Name must be at least 2 characters" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your full name"
                style={{ background: "#f5f5f5", borderRadius: "4px" }}
              />
            </Form.Item>
          </Col>

          {/* Job Title */}
          <Col xs={24} md={12}>
            <Form.Item
              name="jobTitle"
              label="Job Title"
              rules={[{ required: true, message: "Job Title is required" }]}
            >
              <Input
                placeholder="Enter your job title"
                style={{ background: "#f5f5f5", borderRadius: "4px" }}
              />
            </Form.Item>
          </Col>

          {/* Email */}
          <Col xs={24} md={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter your email"
                style={{ background: "#f5f5f5", borderRadius: "4px" }}
              />
            </Form.Item>
          </Col>

          {/* Phone */}
          <Col xs={24} md={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true, message: "Phone is required" },
                {
                  pattern: /^\+?[\d\s-]{10,}$/,
                  message: "Enter a valid phone number",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Enter your phone number"
                style={{ background: "#f5f5f5", borderRadius: "4px" }}
              />
            </Form.Item>
          </Col>

          {/* Location */}
          <Col xs={24} md={12}>
            <Form.Item name="location" label="Location">
              <Input
                prefix={<CompassOutlined />}
                placeholder="Enter your location"
                style={{ background: "#f5f5f5", borderRadius: "4px" }}
              />
            </Form.Item>
          </Col>

          {/* Website */}
          <Col xs={24} md={12}>
            <Form.Item name="website" label="Website">
              <Input
                prefix={<GlobalOutlined />}
                placeholder="Enter your website"
                style={{ background: "#f5f5f5", borderRadius: "4px" }}
              />
            </Form.Item>
          </Col>

          {/* LinkedIn */}
          <Col xs={24} md={12}>
            <Form.Item name="linkedin" label="LinkedIn">
              <Input
                prefix={<LinkedinOutlined />}
                placeholder="Enter your LinkedIn profile"
                style={{ background: "#f5f5f5", borderRadius: "4px" }}
              />
            </Form.Item>
          </Col>

          {/* GitHub */}
          <Col xs={24} md={12}>
            <Form.Item name="github" label="GitHub">
              <Input
                prefix={<GithubOutlined />}
                placeholder="Enter your GitHub profile"
                style={{ background: "#f5f5f5", borderRadius: "4px" }}
              />
            </Form.Item>
          </Col>

          {/* Summary */}
          <Col xs={24}>
            <Form.Item
              name="summary"
              label="Summary"
              rules={[
                { required: true, message: "Summary is required" },
                {
                  min: 50,
                  message: "Summary should be at least 50 characters",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Write a brief professional summary"
                style={{ background: "#f5f5f5", borderRadius: "4px" }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
