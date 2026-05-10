"use client";

import {
  CalendarOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  OrderedListOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider } = Layout;

const navItems = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: <Link href="/dashboard">Dashboard</Link>,
  },
  {
    key: "/dashboard/orders",
    icon: <OrderedListOutlined />,
    label: <Link href="/dashboard/orders">Orders</Link>,
  },
  {
    key: "/dashboard/animals",
    icon: <CalendarOutlined />,
    label: <Link href="/dashboard/animals">Animals</Link>,
  },
  {
    key: "/dashboard/customers",
    icon: <TeamOutlined />,
    label: <Link href="/dashboard/customers">Customers</Link>,
  },
  {
    key: "/dashboard/distribution",
    icon: <EnvironmentOutlined />,
    label: <Link href="/dashboard/distribution">Distribution</Link>,
  },
];

interface DashboardSidebarProps {
  collapsed: boolean;
  onCollapse: (value: boolean) => void;
}

export default function DashboardSidebar({ collapsed, onCollapse }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={220}
    >
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#D4AF37",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 1,
          borderBottom: `1px solid rgba(255,255,255,0.1)`,
        }}
      >
        {collapsed ? "K" : "KURBANKAN"}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        items={navItems}
      />
    </Sider>
  );
}
