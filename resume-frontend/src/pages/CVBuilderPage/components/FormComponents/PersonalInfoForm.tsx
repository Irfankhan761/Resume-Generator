import React from "react";
import { CVData } from "../../types";
import { Form, Input } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CompassOutlined,
  GlobalOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from "@ant-design/icons";

interface PersonalInfoFormProps {
  cvData: CVData;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ cvData }) => {
  return (
    <Form.Item
      name={["personalInfo"]}
      label="Personal Information"
      initialValue={cvData.personalInfo}
    >
      <Form.Item
        name={["fullName"]}
        label="Full Name"
        rules={[{ required: true }]}
      >
        <Input prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item name={["jobTitle"]} label="Job Title">
        <Input />
      </Form.Item>
      <Form.Item name={["email"]} label="Email">
        <Input prefix={<MailOutlined />} />
      </Form.Item>
      <Form.Item name={["phone"]} label="Phone">
        <Input prefix={<PhoneOutlined />} />
      </Form.Item>
      <Form.Item name={["location"]} label="Location">
        <Input prefix={<CompassOutlined />} />
      </Form.Item>
      <Form.Item name={["website"]} label="Website">
        <Input prefix={<GlobalOutlined />} />
      </Form.Item>
      <Form.Item name={["linkedin"]} label="LinkedIn">
        <Input prefix={<LinkedinOutlined />} />
      </Form.Item>
      <Form.Item name={["github"]} label="GitHub">
        <Input prefix={<GithubOutlined />} />
      </Form.Item>
      <Form.Item name={["profileSummary"]} label="Profile Summary">
        <Input.TextArea rows={4} />
      </Form.Item>
    </Form.Item>
  );
};

export default PersonalInfoForm;
