import Cookies from "js-cookie";

export const AUTH_COOKIE = "auth_token";

/** Save token to cookie — accessible by middleware (httpOnly: false required for client write). */
export function setAuthToken(token: string) {
  Cookies.set(AUTH_COOKIE, token, { expires: 7, path: "/", sameSite: "Lax" });
}

/** Remove auth cookie — called on logout. */
export function removeAuthToken() {
  Cookies.remove(AUTH_COOKIE, { path: "/" });
}

/** Read auth token from cookie string (works on both client and server). */
export function getAuthToken(cookieString: string): string | undefined {
  const match = cookieString
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${AUTH_COOKIE}=`));
  if (!match) return undefined;
  return decodeURIComponent(match.slice(AUTH_COOKIE.length + 1));
}
