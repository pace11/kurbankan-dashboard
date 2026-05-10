"use client";

import type { TableProps } from "antd";
import { Table, Typography } from "antd";
import type { QurbanPeriod } from "@/hooks/use-qurban-periods";
import { useQurbanPeriods } from "@/hooks/use-qurban-periods";

const { Text } = Typography;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const columns: TableProps<QurbanPeriod>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 60,
  },
  {
    title: "Tahun",
    dataIndex: "year",
    key: "year",
    width: 80,
  },
  {
    title: "Tanggal Mulai",
    dataIndex: "start_date",
    key: "start_date",
    render: (value: string) => formatDate(value),
  },
  {
    title: "Tanggal Selesai",
    dataIndex: "end_date",
    key: "end_date",
    render: (value: string) => formatDate(value),
  },
  {
    title: "Deskripsi",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Dibuat",
    dataIndex: "created_at",
    key: "created_at",
    render: (value: string) => formatDate(value),
  },
];

export default function QurbanPeriodsPage() {
  const { data, isLoading, isError, error } = useQurbanPeriods();

  if (isError) {
    return <Text type="danger">{(error as Error).message}</Text>;
  }

  return (
    <Table<QurbanPeriod>
      columns={columns}
      dataSource={data?.data}
      rowKey="id"
      loading={isLoading}
      pagination={{
        current: data?.meta.page,
        pageSize: data?.meta.limit,
        total: data?.meta.total,
      }}
    />
  );
}
