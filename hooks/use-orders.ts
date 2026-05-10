"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Order {
  id: number;
  customerName: string;
  animalType: string;
  quantity: number;
  status: "pending" | "confirmed" | "distributed";
  createdAt: string;
}

export interface CreateOrderPayload {
  customerName: string;
  animalType: string;
  quantity: number;
}

export interface UpdateOrderPayload {
  status?: Order["status"];
  quantity?: number;
}

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Fetch paginated order list.
 * Pass `initialData` from a Server Component to avoid loading flash on
 * first render.
 */
export function useOrders(
  params?: Record<string, unknown>,
  initialData?: Order[],
) {
  return useQuery({
    queryKey: queryKeys.orders.list(params),
    queryFn: () =>
      apiFetch<Order[]>(
        `/api/orders?${new URLSearchParams(params as Record<string, string>)}`,
      ),
    initialData,
  });
}

/** Fetch single order by id. */
export function useOrder(id: number) {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => apiFetch<Order>(`/api/orders/${id}`),
    enabled: !!id,
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/** Create a new order. Invalidates the orders list on success. */
export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) =>
      apiFetch<Order>("/api/orders", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      message.success("Order created successfully.");
    },
    onError: (error: Error) => {
      message.error(error.message ?? "Failed to create order.");
    },
  });
}

/** Update an existing order. Performs optimistic update. */
export function useUpdateOrder(id: number) {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: (payload: UpdateOrderPayload) =>
      apiFetch<Order>(`/api/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    // Optimistic update — immediately reflect changes in the UI.
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.orders.detail(id),
      });
      const previous = queryClient.getQueryData<Order>(
        queryKeys.orders.detail(id),
      );
      queryClient.setQueryData<Order>(queryKeys.orders.detail(id), (old) =>
        old ? { ...old, ...payload } : old,
      );
      return { previous };
    },
    // Rollback on error.
    onError: (error: Error, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.orders.detail(id), context.previous);
      }
      message.error(error.message ?? "Failed to update order.");
    },
    // Always sync with server after success or error.
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
}

/** Delete an order. Optimistically removes it from the list cache. */
export function useDeleteOrder() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: (id: number) =>
      apiFetch<void>(`/api/orders/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      message.success("Order deleted.");
    },
    onError: (error: Error) => {
      message.error(error.message ?? "Failed to delete order.");
    },
  });
}
