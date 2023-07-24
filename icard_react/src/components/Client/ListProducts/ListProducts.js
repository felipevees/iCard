import React from "react";
import { Image, Button, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { map } from "lodash";
import { addProductCart } from "../../../api/cart";
import "./ListProducts.scss";

export function ListProducts({ products }) {
  const addToCart = (product) => {
    addProductCart(product.id);
    toast.success(`${product.title} añadido al carrito`);
  };
  return (
    <div className="list-products">
      {map(products, (product) => (
        <div key={product.id} className="list-products__product">
          <div>
            <Image src={product.image} />
            <span>{product.title}</span>
          </div>
          <Button primary icon onClick={() => addToCart(product)}>
            <Icon name="add" />
          </Button>
        </div>
      ))}
    </div>
  );
}
