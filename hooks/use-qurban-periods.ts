"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QurbanPeriod {
  id: number;
  year: number;
  start_date: string;
  end_date: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface QurbanPeriodMeta {
  limit: number;
  page: number;
  total: number;
  total_pages: number;
}

export interface QurbanPeriodsResponse {
  data: QurbanPeriod[];
  message: string;
  meta: QurbanPeriodMeta;
  status: string;
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useQurbanPeriods(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.qurbanPeriods.list(params),
    queryFn: () => apiFetch<QurbanPeriodsResponse>("/api/qurban-periods"),
  });
}
