import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../../hooks";
import { ListProducts } from "../../components/Client";

export function Products() {
  const { tableNumber, idCategory } = useParams();
  const { getProductsByCategory, loading, products } = useProduct();

  useEffect(() => {
    getProductsByCategory(idCategory);
  }, [idCategory]);
  return (
    <div>
      <Link to={`/client/${tableNumber}`}>Volver a categorias</Link>
      {loading ? (
        <Loader active inline="centered">
          Cargando
        </Loader>
      ) : (
        <ListProducts products={products} />
      )}
    </div>
  );
}
