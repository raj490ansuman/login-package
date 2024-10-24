import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message as antMessage } from "antd";
import axios from "axios";

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (values: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        values
      );
      if (response.data) {
        antMessage.success("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      antMessage.error("Error registering user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Register</h2>
      <Form layout="vertical" onFinish={handleRegister}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
