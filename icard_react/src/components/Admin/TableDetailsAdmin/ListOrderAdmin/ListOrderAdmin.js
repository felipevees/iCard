import React from "react";
import { map } from "lodash";
import { OrderItemAdmin } from "../OrderItemAdmin";
import "./ListOrderAdmin.scss";

export function ListOrderAdmin({ orders, onReloadOrders }) {
  return (
    <div className="list-order-admin">
      {map(orders, (order) => (
        <OrderItemAdmin
          key={order.id}
          order={order}
          onReloadOrders={onReloadOrders}
        />
      ))}
    </div>
  );
}
