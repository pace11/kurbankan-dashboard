import { Layout, Typography } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

export default function DashboardFooter() {
  return (
    <Footer style={{ textAlign: "center" }}>
      <Text type="secondary" style={{ fontSize: 12 }}>
        © {new Date().getFullYear()} Kurbankan. All rights reserved.
      </Text>
    </Footer>
  );
}
