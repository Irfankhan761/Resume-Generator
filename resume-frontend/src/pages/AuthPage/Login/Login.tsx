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
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Form, Input, Button, message, Checkbox } from "antd";
// import {
//   UserOutlined,
//   LockOutlined,
//   MailOutlined,
//   GoogleOutlined,
//   GithubOutlined,
// } from "@ant-design/icons";

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   const backgroundVariants = {
//     initial: { opacity: 0, scale: 0.9 },
//     animate: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         duration: 0.7,
//         type: "spring",
//       },
//     },
//   };

//   const formVariants = {
//     initial: {
//       opacity: 0,
//       x: isLogin ? -100 : 100,
//     },
//     animate: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.5,
//         type: "tween",
//       },
//     },
//     exit: {
//       opacity: 0,
//       x: isLogin ? 100 : -100,
//       transition: {
//         duration: 0.5,
//         type: "tween",
//       },
//     },
//   };

//   const handleLogin = () => {
//     message.success("Login Successful!");
//   };

//   const handleSignup = () => {
//     message.success("Signup Successful!");
//   };

//   return (
//     <motion.div
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white"
//       variants={backgroundVariants}
//       initial="initial"
//       animate="animate"
//     >
//       <div className="w-full max-w-md p-6">
//         <AnimatePresence mode="wait">
//           {isLogin ? (
//             <motion.div
//               key="login"
//               variants={formVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               className="bg-white shadow-2xl rounded-2xl p-8"
//             >
//               <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
//                 Welcome Back
//               </h2>

//               <Form onFinish={handleLogin} layout="vertical">
//                 <Form.Item
//                   name="username"
//                   rules={[{ required: true, message: "Username required" }]}
//                 >
//                   <Input
//                     prefix={<UserOutlined className="text-blue-500" />}
//                     placeholder="Username"
//                     className="py-2 rounded-full"
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   name="password"
//                   rules={[{ required: true, message: "Password required" }]}
//                 >
//                   <Input.Password
//                     prefix={<LockOutlined className="text-blue-500" />}
//                     placeholder="Password"
//                     className="py-2 rounded-full"
//                   />
//                 </Form.Item>

//                 <div className="flex justify-between items-center mb-4">
//                   <Checkbox>Remember me</Checkbox>
//                   <a href="#s" className="text-blue-600">
//                     Forgot password?
//                   </a>
//                 </div>

//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   className="w-full py-2 rounded-full bg-blue-600 hover:bg-blue-700"
//                 >
//                   Login
//                 </Button>
//               </Form>

//               <div className="text-center mt-6">
//                 <div className="flex justify-center space-x-4 mb-4">
//                   <Button
//                     icon={<GoogleOutlined />}
//                     className="rounded-full p-2"
//                   />
//                   <Button
//                     icon={<GithubOutlined />}
//                     className="rounded-full p-2"
//                   />
//                 </div>

//                 <p>
//                   Don't have an account?
//                   <Button
//                     type="link"
//                     onClick={() => setIsLogin(false)}
//                     className="text-blue-600 font-bold"
//                   >
//                     Sign Up
//                   </Button>
//                 </p>
//               </div>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="signup"
//               variants={formVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               className="bg-white shadow-2xl rounded-2xl p-8"
//             >
//               <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
//                 Create Account
//               </h2>

//               <Form onFinish={handleSignup} layout="vertical">
//                 <Form.Item
//                   name="fullName"
//                   rules={[{ required: true, message: "Full name required" }]}
//                 >
//                   <Input
//                     prefix={<UserOutlined className="text-blue-500" />}
//                     placeholder="Full Name"
//                     className="py-2 rounded-full"
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   name="email"
//                   rules={[
//                     {
//                       required: true,
//                       type: "email",
//                       message: "Valid email required",
//                     },
//                   ]}
//                 >
//                   <Input
//                     prefix={<MailOutlined className="text-blue-500" />}
//                     placeholder="Email"
//                     className="py-2 rounded-full"
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   name="password"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Password required",
//                       min: 6,
//                     },
//                   ]}
//                 >
//                   <Input.Password
//                     prefix={<LockOutlined className="text-blue-500" />}
//                     placeholder="Password"
//                     className="py-2 rounded-full"
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   name="confirm"
//                   dependencies={["password"]}
//                   rules={[
//                     { required: true, message: "Confirm your password" },
//                     ({ getFieldValue }) => ({
//                       validator(_, value) {
//                         if (!value || getFieldValue("password") === value) {
//                           return Promise.resolve();
//                         }
//                         return Promise.reject(
//                           new Error("Passwords do not match")
//                         );
//                       },
//                     }),
//                   ]}
//                 >
//                   <Input.Password
//                     prefix={<LockOutlined className="text-blue-500" />}
//                     placeholder="Confirm Password"
//                     className="py-2 rounded-full"
//                   />
//                 </Form.Item>

//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   className="w-full py-2 rounded-full bg-blue-600 hover:bg-blue-700"
//                 >
//                   Sign Up
//                 </Button>
//               </Form>

//               <div className="text-center mt-6">
//                 <div className="flex justify-center space-x-4 mb-4">
//                   <Button
//                     icon={<GoogleOutlined />}
//                     className="rounded-full p-2"
//                   />
//                   <Button
//                     icon={<GithubOutlined />}
//                     className="rounded-full p-2"
//                   />
//                 </div>

//                 <p>
//                   Already have an account?
//                   <Button
//                     type="link"
//                     onClick={() => setIsLogin(true)}
//                     className="text-blue-600 font-bold"
//                   >
//                     Login
//                   </Button>
//                 </p>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.div>
//   );
// };

// export default AuthPage;
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    controls.start({
      scale: [1, 1.02, 1],
      transition: { duration: 0.3 },
    });
  };

  const Particles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${
            isDarkMode ? "bg-purple-400/30" : "bg-blue-400/30"
          }`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
            x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
            y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );

  const formVariants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: -20 },
  };

  const inputVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
    },
    tap: { scale: 0.95 },
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen relative flex items-center justify-center p-4 transition-all duration-500 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <Particles />

      <motion.div
        className={`relative w-full max-w-md p-8 rounded-2xl backdrop-blur-lg ${
          isDarkMode ? "bg-gray-800/80 text-white" : "bg-white/80 text-gray-800"
        }`}
        variants={formVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        {/* Mouse follower gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            background: `radial-gradient(circle 200px at ${mousePosition.x}px ${
              mousePosition.y
            }px, 
              ${
                isDarkMode
                  ? "rgba(147, 51, 234, 0.15)"
                  : "rgba(59, 130, 246, 0.15)"
              } 0%, 
              transparent 70%)`,
          }}
          transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
        />

        <motion.button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100/10"
          whileHover={{ rotate: 180, scale: 1.1 }}
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-blue-600" />
          )}
        </motion.button>

        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <motion.div
            className="inline-block"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          >
            <Sparkles
              className={`w-8 h-8 mb-4 ${
                isDarkMode ? "text-purple-400" : "text-blue-500"
              }`}
            />
          </motion.div>
          <motion.h2 className="text-3xl font-bold" animate={controls}>
            {isLogin ? "Welcome Back" : "Join Us"}
          </motion.h2>
        </motion.div>

        <form className="space-y-6">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                variants={inputVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover="hover"
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <User
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-purple-400" : "text-blue-500"
                    }`}
                  />
                </div>
                <input
                  type="text"
                  name="name"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg outline-none transition-all ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600 focus:border-purple-400"
                      : "bg-gray-50 text-gray-900 border-gray-200 focus:border-blue-500"
                  } border-2`}
                  placeholder="Full Name"
                  onChange={handleInputChange}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            variants={inputVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Mail
                className={`w-5 h-5 ${
                  isDarkMode ? "text-purple-400" : "text-blue-500"
                }`}
              />
            </div>
            <input
              type="email"
              name="email"
              className={`w-full pl-10 pr-4 py-3 rounded-lg outline-none transition-all ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:border-purple-400"
                  : "bg-gray-50 text-gray-900 border-gray-200 focus:border-blue-500"
              } border-2`}
              placeholder="Email Address"
              onChange={handleInputChange}
            />
          </motion.div>

          <motion.div
            variants={inputVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Lock
                className={`w-5 h-5 ${
                  isDarkMode ? "text-purple-400" : "text-blue-500"
                }`}
              />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={`w-full pl-10 pr-12 py-3 rounded-lg outline-none transition-all ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:border-purple-400"
                  : "bg-gray-50 text-gray-900 border-gray-200 focus:border-blue-500"
              } border-2`}
              placeholder="Password"
              onChange={handleInputChange}
            />
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff
                  className={`w-5 h-5 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                />
              ) : (
                <Eye
                  className={`w-5 h-5 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                />
              )}
            </motion.button>
          </motion.div>

          <motion.button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold ${
              isDarkMode
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </motion.span>
          </motion.button>
        </form>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <motion.button
              onClick={() => setIsLogin(!isLogin)}
              className={`ml-2 font-semibold ${
                isDarkMode ? "text-purple-400" : "text-blue-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </motion.button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
