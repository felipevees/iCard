import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useProduct } from "../../hooks";
import { Link, useParams } from "react-router-dom";
import { size } from "lodash";
import { getProductsCart } from "../../api/cart";
import { ListProductsCart } from "../../components/Client";

export function Cart() {
  const { getProductById } = useProduct();
  const [products, setProducts] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const { tableNumber } = useParams();

  useEffect(() => {
    (async () => {
      const idProductCart = getProductsCart();
      const productsArray = [];
      for await (const idProduct of idProductCart) {
        const response = await getProductById(idProduct);
        productsArray.push(response);
      }
      setProducts(productsArray);
    })();
  }, [reloadCart]);

  const onReloadCart = () => setReloadCart((prev) => !prev);

  return (
    <div>
      <h1>Carrito</h1>
      {!products ? (
        <p>Cargando...</p>
      ) : size(products) === 0 ? (
        <div style={{ textAlign: "center" }}>
          <p>Tu carrito esta vacio</p>
          <Link to={`/client/${tableNumber}/orders`}>
            <Button primary>Ver pedidos</Button>
          </Link>
        </div>
      ) : (
        <ListProductsCart products={products} onReloadCart={onReloadCart} />
      )}
    </div>
  );
}
