import { api } from "@/lib/axios";
import { JSX } from "react/jsx-runtime";

export interface GetOrdersResponse {
  orders: {
    map(arg0: (order: any) => JSX.Element): import("react").ReactNode;
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number
  };
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function getOders() {
  const response = await api.get<GetOrdersResponse>("/orders", {
    params: {
      pageIndex: 0,
    },
  });
  return response.data;
}
