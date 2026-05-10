import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login — Kurbankan",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      {/* Blurred background layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/bg-lighter.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(5px)",
          transform: "scale(1.05)",
        }}
      />
      {/* Dark overlay for contrast */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.25)",
        }}
      />
      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
