// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React from "react";
// import { Form, Input, Button, Card, Checkbox, Space } from "antd";
// import { UserOutlined, LockOutlined } from "@ant-design/icons";

// const LoginPage = () => {
//   const onFinish = (values: any) => {
//     console.log("Login successful:", values);
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-50">
//       <Card className="w-full max-w-sm p-8 shadow-lg rounded-xl">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//           Welcome Back!
//         </h2>
//         <Form
//           name="login"
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//           layout="vertical"
//         >
//           <Form.Item
//             name="username"
//             rules={[{ required: true, message: "Please input your username!" }]}
//           >
//             <Input
//               prefix={<UserOutlined />}
//               placeholder="Username"
//               className="rounded-md"
//             />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             rules={[{ required: true, message: "Please input your password!" }]}
//           >
//             <Input.Password
//               prefix={<LockOutlined />}
//               placeholder="Password"
//               className="rounded-md"
//             />
//           </Form.Item>

//           <Form.Item name="remember" valuePropName="checked">
//             <Checkbox className="text-sm">Remember me</Checkbox>
//           </Form.Item>

//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               className="w-full py-3 text-lg"
//             >
//               Log In
//             </Button>
//           </Form.Item>

//           <div className="flex justify-between text-sm">
//             <a href="#" className="text-blue-600">
//               Forgot password?
//             </a>
//             <a href="/signup" className="text-blue-600">
//               Create an account
//             </a>
//           </div>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Form, Input, Button, message, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  GoogleOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const backgroundVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        type: "spring",
      },
    },
  };

  const formVariants = {
    initial: {
      opacity: 0,
      x: isLogin ? -100 : 100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        type: "tween",
      },
    },
    exit: {
      opacity: 0,
      x: isLogin ? 100 : -100,
      transition: {
        duration: 0.5,
        type: "tween",
      },
    },
  };

  const handleLogin = () => {
    message.success("Login Successful!");
  };

  const handleSignup = () => {
    message.success("Signup Successful!");
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white"
      variants={backgroundVariants}
      initial="initial"
      animate="animate"
    >
      <div className="w-full max-w-md p-6">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white shadow-2xl rounded-2xl p-8"
            >
              <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                Welcome Back
              </h2>

              <Form onFinish={handleLogin} layout="vertical">
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: "Username required" }]}
                >
                  <Input
                    prefix={<UserOutlined className="text-blue-500" />}
                    placeholder="Username"
                    className="py-2 rounded-full"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Password required" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-blue-500" />}
                    placeholder="Password"
                    className="py-2 rounded-full"
                  />
                </Form.Item>

                <div className="flex justify-between items-center mb-4">
                  <Checkbox>Remember me</Checkbox>
                  <a href="#s" className="text-blue-600">
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full py-2 rounded-full bg-blue-600 hover:bg-blue-700"
                >
                  Login
                </Button>
              </Form>

              <div className="text-center mt-6">
                <div className="flex justify-center space-x-4 mb-4">
                  <Button
                    icon={<GoogleOutlined />}
                    className="rounded-full p-2"
                  />
                  <Button
                    icon={<GithubOutlined />}
                    className="rounded-full p-2"
                  />
                </div>

                <p>
                  Don't have an account?
                  <Button
                    type="link"
                    onClick={() => setIsLogin(false)}
                    className="text-blue-600 font-bold"
                  >
                    Sign Up
                  </Button>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white shadow-2xl rounded-2xl p-8"
            >
              <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                Create Account
              </h2>

              <Form onFinish={handleSignup} layout="vertical">
                <Form.Item
                  name="fullName"
                  rules={[{ required: true, message: "Full name required" }]}
                >
                  <Input
                    prefix={<UserOutlined className="text-blue-500" />}
                    placeholder="Full Name"
                    className="py-2 rounded-full"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Valid email required",
                    },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="text-blue-500" />}
                    placeholder="Email"
                    className="py-2 rounded-full"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Password required",
                      min: 6,
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-blue-500" />}
                    placeholder="Password"
                    className="py-2 rounded-full"
                  />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Confirm your password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-blue-500" />}
                    placeholder="Confirm Password"
                    className="py-2 rounded-full"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full py-2 rounded-full bg-blue-600 hover:bg-blue-700"
                >
                  Sign Up
                </Button>
              </Form>

              <div className="text-center mt-6">
                <div className="flex justify-center space-x-4 mb-4">
                  <Button
                    icon={<GoogleOutlined />}
                    className="rounded-full p-2"
                  />
                  <Button
                    icon={<GithubOutlined />}
                    className="rounded-full p-2"
                  />
                </div>

                <p>
                  Already have an account?
                  <Button
                    type="link"
                    onClick={() => setIsLogin(true)}
                    className="text-blue-600 font-bold"
                  >
                    Login
                  </Button>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AuthPage;
