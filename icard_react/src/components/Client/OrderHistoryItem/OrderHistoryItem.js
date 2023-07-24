import React from "react";
import "./OrderHistoryItem.scss";
import { Image } from "semantic-ui-react";
import classNames from "classnames";
import { ORDER_STATUS } from "../../../utils/constants";
import moment from "moment";
import "moment/locale/es";

export function OrderHistoryItem({ order }) {
  const { title, image } = order.product_data;

  return (
    <div
      className={classNames("order-history-item", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="order-history-item__time">
        <span>
          Pedido {moment(order.created_at).startOf("second").fromNow()}
        </span>
      </div>

      <div className="order-history-item__product">
        <Image src={image} />
        <p>{title}</p>
      </div>

      {order.status === ORDER_STATUS.PENDING ? (
        <span>En marcha</span>
      ) : (
        <span>Entregado</span>
      )}
    </div>
  );
}
