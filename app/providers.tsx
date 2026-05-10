"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { App, ConfigProvider } from "antd";
import { useState } from "react";
import { makeQueryClient } from "@/lib/query-client";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  // useState ensures the QueryClient is created once per component lifecycle,
  // never shared across requests in SSR.
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
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
            Layout: {
              triggerBg: "#092D22",
              triggerColor: "#D4AF37",
              siderBg: "#0B3D2E",
            },
            Menu: {
              darkItemBg: "#0B3D2E",
              darkPopupBg: "#092D22",
            },
          },
        }}
      >
        <App>{children}</App>
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
