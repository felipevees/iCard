import React, { useState, useEffect } from "react";
import "./ListProductsCart.scss";
import { useOrder, useTable } from "../../../hooks";
import { Image, Button, Icon } from "semantic-ui-react";
import { map, forEach } from "lodash";
import { useParams, useNavigate } from "react-router-dom";
import { removeProductCartApi, cleanProductCartApi } from "../../../api/cart";

export function ListProductsCart({ products, onReloadCart }) {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const { addOrderToTable } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();

  useEffect(() => {
    let totalTemp = 0;
    forEach(products, (product) => {
      totalTemp += Number(product.price);
    });
    setTotal(totalTemp.toFixed(3));
  }, [products]);

  const removeProduct = (index) => {
    removeProductCartApi(index);
    onReloadCart();
  };

  const createOrder = async () => {
    const tableData = await getTableByNumber(tableNumber);
    const idTable = tableData[0].id;
    console.log(idTable);
    for await (const product of products) {
      await addOrderToTable(idTable, product.id);
    }
    cleanProductCartApi();
    navigate(`/client/${tableNumber}/orders`);
  };

  return (
    <div className="list-products-cart">
      {map(products, (product, index) => (
        <div key={index} className="list-products-cart__product">
          <div>
            <Image src={product.image} avatar />
            <span>{product.title}</span>
          </div>
          <span>{product.price} $</span>
          <Icon name="close" onClick={() => removeProduct(index)} />
        </div>
      ))}

      <Button primary fluid onClick={createOrder}>
        realizar pedido {total} $
      </Button>
    </div>
  );
}
