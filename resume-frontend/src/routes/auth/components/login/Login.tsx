import {
  Form,
  Input,
  Button,
  Card,
  Checkbox,
  Divider,
  Breadcrumb,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  TwitterOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import { useState } from "react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Login successful:", values);
      message.success("Login successful!");
    } catch (error) {
      message.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <Card
        className="w-full max-w-md p-0 overflow-hidden shadow-2xl rounded-xl border-0"
        bodyStyle={{ padding: 0 }}
      >
        {/* Decorative header */}
        <div className="text-center mt-5">
          <h1 className="text-2xl font-bold bg-gradient-to-br from-blue-400 to-indigo-700 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="opacity-90">Sign in to continue to your account</p>
        </div>

        <div className="p-8">
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="mb-6 text-sm">
            <Breadcrumb.Item>
              <a href="/" className="text-blue-600 hover:text-blue-800">
                Home
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="text-gray-500">Sign In</Breadcrumb.Item>
          </Breadcrumb>

          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              name="username"
              label={
                <span className="text-gray-700 font-medium">
                  Email or Username
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your username or email!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email!",
                  validator: (_, value) =>
                    !value || value.includes("@")
                      ? Promise.resolve()
                      : Promise.reject(),
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter your email or username"
                className="rounded-lg h-12 px-4 border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:shadow-sm"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span className="text-gray-700 font-medium">Password</span>
              }
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter your password"
                className="rounded-lg h-12 px-4 border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:shadow-sm"
                size="large"
              />
            </Form.Item>

            <div className="flex justify-between items-center">
              <Form.Item
                name="remember"
                valuePropName="checked"
                className="mb-0"
              >
                <Checkbox className="text-gray-600 hover:text-blue-600">
                  Remember me
                </Checkbox>
              </Form.Item>

              <a
                href="#ForgotPassword"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 shadow-sm transition-all transform hover:scale-[1.01]"
                size="large"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <Divider className="text-gray-400 before:bg-gray-200 after:bg-gray-200">
            or continue with
          </Divider>

          <div className="grid grid-cols-3 gap-3">
            <Button
              icon={<GoogleOutlined />}
              className="flex items-center justify-center h-12 rounded-lg border-gray-300 hover:border-blue-400 hover:text-blue-600 transition-all"
              size="large"
            >
              <span className="sr-only">Google</span>
            </Button>
            <Button
              icon={<FacebookFilled />}
              className="flex items-center justify-center h-12 rounded-lg border-gray-300 hover:border-gray-800 hover:text-gray-800 transition-all"
              size="large"
            >
              <span className="sr-only">GitHub</span>
            </Button>
            <Button
              icon={<TwitterOutlined />}
              className="flex items-center justify-center h-12 rounded-lg border-gray-300 hover:border-blue-400 hover:text-blue-400 transition-all"
              size="large"
            >
              <span className="sr-only">Twitter</span>
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Sign up now
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
