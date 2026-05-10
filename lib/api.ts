import { getClientToken } from "@/lib/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Base fetch wrapper.
 *
 * - Throws `ApiError` for non-2xx responses so TanStack Query catches it as
 *   an error state automatically.
 * - Accepts standard `RequestInit` so Next.js fetch extensions
 *   (`next.revalidate`, `next.tags`) work when called from Server Components.
 */
export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const token = getClientToken();
  const authHeader: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
      ...init?.headers,
    },
    ...init,
  });

  if (!res.ok) {
    const message = await res.text().catch(() => `HTTP ${res.status}`);
    throw new ApiError(res.status, message);
  }

  // 204 No Content — return null cast to T
  if (res.status === 204) return null as T;

  return res.json() as Promise<T>;
}
