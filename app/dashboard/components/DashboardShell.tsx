"use client";

import { Layout, theme } from "antd";
import { useState } from "react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

const { Content } = Layout;

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <DashboardSidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout>
        <DashboardNavbar collapsed={collapsed} />
        <Content
          style={{
            margin: token.marginLG,
            padding: token.paddingLG,
            backgroundColor: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
            minHeight: 360,
          }}
        >
          {children}
        </Content>
        <DashboardFooter />
      </Layout>
    </Layout>
  );
}
