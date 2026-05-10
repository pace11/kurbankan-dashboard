"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { setAuthToken } from "@/lib/auth";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginUser {
  id: number;
  email: string;
  platform_role: string | null;
  created_at: string;
  updated_at: string;
}

interface LoginResponse {
  data: {
    token: string;
    user: LoginUser;
  };
  message: string;
  status: string;
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: ({ data }) => {
      setAuthToken(data.token);
      router.replace("/dashboard");
    },
  });
}
