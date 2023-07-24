import React, { useState, useEffect } from "react";
import "./PaymentProductList.scss";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { useOrder } from "../../../../hooks";

export function PaymentProductList({ payment }) {
  const { getOrdersByPayment } = useOrder();
  const [orders, setOrders] = useState();

  useEffect(() => {
    (async () => {
      const response = await getOrdersByPayment(payment.id);
      setOrders(response);
    })();
  }, []);
  return (
    <div className="payment-product-list">
      {map(orders, (order) => (
        <div className="payment-product-list__product">
          <div>
            <Image src={order.product_data.image} avatar size="tiny" />
            <span>{order.product_data.title}</span>
          </div>
          <span>{order.product_data.price} $</span>
        </div>
      ))}
    </div>
  );
}
