import type { Metadata } from "next";
import MainLayout from "./components/MainLayout";

export const metadata: Metadata = {
  title: "Dashboard — Kurbankan",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
