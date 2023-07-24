import React, { useEffect, useState, useCallback } from "react";
import "./AddEditProductForm.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { map } from "lodash";
import { useDropzone } from "react-dropzone";
import { useCategory, useProduct } from "../../../../hooks";
import { Form, Button, Image, Dropdown, Checkbox } from "semantic-ui-react";

export function AddEditProductForm({ onClose, onRefetch, product }) {
  const [categoriesFormat, setCategoriesFormat] = useState([]);
  const [previewImage, setPreviewImage] = useState(
    product ? product?.image : null
  );
  const { getCategories, categories } = useCategory();
  const { addProduct, updateProduct } = useProduct();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setCategoriesFormat(formatDropDownData(categories));
  }, [categories]);

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: yup.object(product ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (product) await updateProduct(product.id, formValue);
      else await addProduct(formValue);
      onRefetch();
      onClose();
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Nombre del producto"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <Form.Input
        type="number"
        name="price"
        placeholder="Precio"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.errors.price}
      />
      <Dropdown
        value={formik.values.category}
        error={formik.errors.category}
        onChange={(_, data) => formik.setFieldValue("category", data.value)}
        placeholder="Categoria"
        fluid
        selection
        search
        options={categoriesFormat}
      />
      <div className="add-edit-product-form__active">
        <Checkbox
          toggle
          checked={formik.values.active}
          onChange={(_, data) => formik.setFieldValue("active", data.checked)}
        />
        Producto activo
      </div>
      <Button
        type="button"
        fluid
        {...getRootProps()}
        color={formik.errors.image && "red"}
      >
        {previewImage ? "Cambiar imagen" : "Subir Imagen"}
      </Button>
      <input {...getInputProps()} />
      <Image src={previewImage} />
      <Button
        type="submit"
        primary
        fluid
        content={product ? "Actualizar" : "Crear"}
      />
    </Form>
  );
}

function formatDropDownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }));
}

function initialValues(product) {
  return {
    title: product?.title || "",
    price: product?.price || "",
    category: product?.category || "",
    active: product?.active ? true : false,
    image: "",
  };
}

function newSchema() {
  return {
    title: yup.string().required(true),
    price: yup.number().required(true),
    category: yup.number().required(true),
    active: yup.boolean().required(true),
    image: yup.string().required(true),
  };
}

function updateSchema() {
  return {
    title: yup.string().required(true),
    price: yup.number().required(true),
    category: yup.number().required(true),
    active: yup.boolean().required(true),
    image: yup.string(),
  };
}
