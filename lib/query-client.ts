import { QueryClient } from "@tanstack/react-query";

/**
 * Factory function — always called per-request on the server,
 * and once on the client (via `useState` in the provider).
 * This prevents sharing state between requests in SSR.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 60 seconds — avoids redundant refetches
        // when navigating between routes.
        staleTime: 60 * 1000,
        // Keep inactive query data in cache for 5 minutes.
        gcTime: 5 * 60 * 1000,
        // Do not retry on 4xx errors (client errors should not be retried).
        retry: (failureCount, error) => {
          if (error instanceof Error && "status" in error) {
            const status = (error as { status: number }).status;
            if (status >= 400 && status < 500) return false;
          }
          return failureCount < 2;
        },
        refetchOnWindowFocus: false,
      },
      mutations: {
        // Retry mutations once on network errors only.
        retry: 0,
      },
    },
  });
}
