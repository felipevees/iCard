import React from "react";
import { Form, Button, Checkbox } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./AddEditUserForm.scss";
import { useUser } from "../../../../hooks";

export function AddEditUserForm({ onClose, onRefetch, user }) {
  const { addUser, updateUser } = useUser();

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: yup.object(user ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (user) await updateUser(user.id, formValue);
        else await addUser(formValue);
        onRefetch();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <div>
      <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          name="username"
          placeholder="Nombre de usuario"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username}
        />
        <Form.Input
          name="email"
          placeholder="Correo electronico"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Form.Input
          name="first_name"
          placeholder="Nombre"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          error={formik.errors.first_name}
        />
        <Form.Input
          name="last_name"
          placeholder="Apellidos"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          error={formik.errors.last_name}
        />
        <Form.Input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <div className="add-edit-user-form__active">
          <Checkbox
            toggle
            checked={formik.values.is_active}
            onChange={(_, data) =>
              formik.setFieldValue("is_active", data.checked)
            }
          />
          Usuario activo
        </div>
        <div className="add-edit-user-form__staff">
          <Checkbox
            toggle
            checked={formik.values.is_staff}
            onChange={(_, data) =>
              formik.setFieldValue("is_staff", data.checked)
            }
          />
          Usuario administrador
        </div>
        <Button
          type="submit"
          content={user ? "Actualizar" : "Crear"}
          primary
          fluid
        />
      </Form>
    </div>
  );
}

function initialValues(user) {
  return {
    username: user?.username || "",
    email: user?.email || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    password: "",
    is_active: user?.is_active ? true : false,
    is_staff: user?.is_staff ? true : false,
  };
}
function newSchema() {
  return {
    username: yup.string().required(true),
    email: yup.string().email().required(true),
    first_name: yup.string(),
    last_name: yup.string(),
    password: yup.string().required(true),
    is_active: yup.bool().required(true),
    is_staff: yup.bool().required(true),
  };
}
function updateSchema() {
  return {
    username: yup.string().required(true),
    email: yup.string().email().required(true),
    first_name: yup.string(),
    last_name: yup.string(),
    password: yup.string(),
    is_active: yup.bool().required(true),
    is_staff: yup.bool().required(true),
  };
}
