"use client";

import { Avatar, Layout, Space, Typography, theme } from "antd";

const { Header } = Layout;
const { Text } = Typography;

interface DashboardNavbarProps {
  collapsed: boolean;
}

export default function DashboardNavbar({ collapsed: _collapsed }: DashboardNavbarProps) {
  const { token } = theme.useToken();

  return (
    <Header
      style={{
        backgroundColor: token.colorBgContainer,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${token.paddingLG}px`,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div />
      <Space>
        <Text style={{ fontWeight: 500 }}>Admin</Text>
        <Avatar
          style={{
            backgroundColor: token.colorPrimary,
            color: "#D4AF37",
            fontWeight: 700,
          }}
        >
          A
        </Avatar>
      </Space>
    </Header>
  );
}
