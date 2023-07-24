import React, { useState, useEffect } from "react";
import "./AddOrderForm.scss";
import { useProduct, useOrder } from "../../../../hooks";
import { map } from "lodash";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form, Image, Button, Dropdown } from "semantic-ui-react";

export function AddOrderForm({ idTable, openCloseModal, onReloadOrders }) {
  const { getProducts, products, getProductById } = useProduct();
  const { addOrderToTable } = useOrder();

  const [productsFormat, setProductsFormat] = useState([]);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setProductsFormat(formatDropdownData(products));
  }, [products]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      for await (const idProduct of formValue.products) {
        await addOrderToTable(idTable, idProduct);
      }
      onReloadOrders();
      openCloseModal();
    },
  });

  useEffect(() => {
    addProductList();
  }, [formik.values]);

  const addProductList = async () => {
    try {
      const productsId = formik.values.products;

      const arrayTemp = [];
      for await (const idProduct of productsId) {
        const response = await getProductById(idProduct);
        arrayTemp.push(response);
      }
      setProductsData(arrayTemp);
    } catch (error) {
      console.log(error);
    }
  };

  const removeProductList = (index) => {
    const idProducts = [...formik.values.products];
    idProducts.splice(index, 1);
    formik.setFieldValue("products", idProducts);
  };

  return (
    <Form className="add-order-form" onSubmit={formik.handleSubmit}>
      <Dropdown
        placeholder="Productos"
        fluid
        selection
        search
        options={productsFormat}
        value={null}
        onChange={(_, data) =>
          formik.setFieldValue("products", [
            ...formik.values.products,
            data.value,
          ])
        }
      />

      <div className="add-order-form__list">
        {map(productsData, (product, index) => (
          <div className="add-order-form__list-product" key={index}>
            <div>
              <Image src={product.image} avatar size="tiny" />
              <span>{product.title}</span>
            </div>
            <Button
              type="button"
              content="Eliminar"
              basic
              color="red"
              onClick={() => removeProductList(index)}
            />
          </div>
        ))}
      </div>

      <Button
        type="submit"
        primary
        fluid
        content="Añadir productos a la mesa"
      />
    </Form>
  );
}

function formatDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }));
}

function initialValues() {
  return {
    products: [],
  };
}

function validationSchema() {
  return {
    products: yup.array().required(true),
  };
}
