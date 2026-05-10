"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Form, Input, Typography } from "antd";
import Image from "next/image";
import { useState } from "react";

const { Text } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(values: LoginFormValues) {
    setLoading(true);
    setError(null);
    try {
      // TODO: replace with actual auth call
      console.log("login values:", values);
    } catch {
      setError("Username or password is incorrect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      style={{
        width: 400,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        borderRadius: 12,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      }}
      styles={{ body: { background: "transparent" } }}
    >
      {/* Logo & heading */}
      <div
        style={{
          display: "grid",
          justifyItems: "center",
          rowGap: 8,
          marginBottom: 16,
        }}
      >
        <Image
          style={{ borderRadius: "1rem" }}
          src="/brand.png"
          alt="Kurbankan Logo"
          width={160}
          height={160}
        />
        <Text type="secondary">Sign in to your account</Text>
      </div>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      <Form<LoginFormValues>
        name="login"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email",
              type: "email",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Email"
            size="large"
            autoComplete="username"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            size="large"
            autoComplete="current-password"
          />
        </Form.Item>

        {/* <Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Button type="link" style={{ padding: 0 }}>
              Forgot password?
            </Button>
          </div>
        </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            block
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: "center" }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          © {new Date().getFullYear()} Kurbankan. All rights reserved.
        </Text>
      </div>
    </Card>
  );
}
