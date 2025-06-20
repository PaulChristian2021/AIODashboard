import { useQuery } from "@tanstack/react-query";
import type { OrdersResponse, Order } from "../types/Orders.ts";

export const useOrders = () =>
  useQuery<OrdersResponse>({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/generated_orders_response.json");
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
  });

export const useOrderDetail = (id: string) =>
  useQuery<Order>({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await fetch(`/generated_orders_response.json`);

      if (!res.ok) throw new Error(`Failed to fetch order '${id}'`);

      const jsonOrders = await res.json();
      const foundOrder = jsonOrders.orders.find(
        (o: any) => String(o.id) === String(id)
      );

      if (!foundOrder) throw new Error(`Order '${id}' not found`);

      return foundOrder;
    },
    enabled: !!id,
  });
