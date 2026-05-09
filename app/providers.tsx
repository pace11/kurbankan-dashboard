"use client";

import { App, ConfigProvider } from "antd";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Brand — Primary
          colorPrimary: "#0B3D2E",
          // Semantic
          colorSuccess: "#28A745",
          colorError: "#DC3545",
          colorWarning: "#FFC107",
          colorInfo: "#17A2B8",
          // Neutrals
          colorBgBase: "#F8F9FA",
          colorTextBase: "#343A40",
          colorBorder: "#E9ECEF",
          // Typography
          fontFamily:
            "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          // Shape
          borderRadius: 4,
          borderRadiusLG: 12,
        },
        components: {
          Button: {
            colorPrimaryHover: "#1A5C4E",
            colorPrimaryActive: "#092D22",
          },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
