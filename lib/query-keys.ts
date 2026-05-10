/**
 * Centralised query key factory.
 *
 * Keeps all keys in one place — avoids typos and makes targeted
 * invalidation straightforward.
 *
 * Usage:
 *   queryClient.invalidateQueries({ queryKey: queryKeys.orders.all })
 *   queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(id) })
 */
export const queryKeys = {
  orders: {
    all: ["orders"] as const,
    list: (params?: Record<string, unknown>) =>
      ["orders", "list", params] as const,
    detail: (id: string | number) => ["orders", "detail", id] as const,
  },
  animals: {
    all: ["animals"] as const,
    list: (params?: Record<string, unknown>) =>
      ["animals", "list", params] as const,
    detail: (id: string | number) => ["animals", "detail", id] as const,
  },
  customers: {
    all: ["customers"] as const,
    list: (params?: Record<string, unknown>) =>
      ["customers", "list", params] as const,
    detail: (id: string | number) => ["customers", "detail", id] as const,
  },
  distribution: {
    all: ["distribution"] as const,
    list: (params?: Record<string, unknown>) =>
      ["distribution", "list", params] as const,
  },
  qurbanPeriods: {
    all: ["qurban-periods"] as const,
    list: (params?: Record<string, unknown>) =>
      ["qurban-periods", "list", params] as const,
    detail: (id: number) => ["qurban-periods", "detail", id] as const,
  },
} as const;
