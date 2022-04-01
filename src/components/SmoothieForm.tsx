import { Button, Form, Input, PageHeader, Space, Typography } from "antd";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { IIngredient } from "../lib/ingredient";
import { appMessages } from "../lib/messages";
import {
  ISmoothie,
  ISmoothieIngredient,
  smoothieConstants,
} from "../lib/smoothie";
import IngredientList from "./IngredientList";

export interface ISmoothieFormValue {
  name: string;
  ingredients: ISmoothieIngredient[];
  description?: string;
}

export interface ISmoothieFormProps {
  smoothie?: ISmoothie;
  ingredients: IIngredient[];
  onSubmit: (smoothie: ISmoothieFormValue) => void;
  onCancel: () => void;
  checkSmoothieExists: (name: string) => boolean;
}

const smoothieValidationSchema = yup.object().shape({
  name: yup
    .string()
    .max(
      smoothieConstants.maxNameLength,
      `Name is longer than ${smoothieConstants.maxNameLength}`
    )
    .required(appMessages.requiredField),
  description: yup
    .string()
    .max(
      smoothieConstants.maxDescriptionLength,
      `Description is longer than ${smoothieConstants.maxNameLength}`
    ),
});

const smoothieInitialValues: ISmoothieFormValue = {
  name: "",
  description: "",
  ingredients: [],
};

function getFormValueFromSmoothie(smoothie: ISmoothie): ISmoothieFormValue {
  return {
    name: smoothie.name,
    description: smoothie.description,
    ingredients: smoothie.ingredients,
  };
}

const SmoothieForm: React.FC<ISmoothieFormProps> = (props) => {
  const { smoothie, ingredients, onSubmit, onCancel, checkSmoothieExists } =
    props;
  const formik = useFormik({
    onSubmit,
    initialValues: smoothie
      ? getFormValueFromSmoothie(smoothie)
      : smoothieInitialValues,
    validationSchema: smoothieValidationSchema,
  });

  const nameNode = (
    <Form.Item
      required
      label="Smoothie Name"
      help={
        formik.touched.name && (
          <Typography.Text type="danger">{formik.errors.name}</Typography.Text>
        )
      }
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <Input
        value={formik.values.name}
        maxLength={smoothieConstants.maxNameLength}
        placeholder="Enter smoothie name"
        name="name"
        onBlur={formik.handleBlur}
        onChange={(evt) => {
          const name = evt.target.value;

          if (checkSmoothieExists(name)) {
            formik.setFieldValue("name", name, false);
            formik.setFieldError("name", appMessages.smoothieExists);
          } else {
            formik.setFieldValue("name", name);
          }
        }}
      />
    </Form.Item>
  );

  const descriptionNode = (
    <Form.Item
      label="Description"
      help={
        formik.touched.description && (
          <Typography.Text type="danger">
            {formik.errors.description}
          </Typography.Text>
        )
      }
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <Input.TextArea
        value={formik.values.description}
        maxLength={smoothieConstants.maxDescriptionLength}
        placeholder="Enter smoothie description"
        name="description"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        autoSize={{ minRows: 2, maxRows: 5 }}
      />
    </Form.Item>
  );

  const ingredientsNode = (
    <Form.Item
      label="Ingredients"
      help={
        formik.touched.ingredients && (
          <Typography.Text type="danger">
            {formik.errors.ingredients}
          </Typography.Text>
        )
      }
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <IngredientList
        editable
        ingredients={ingredients}
        smoothieIngredients={formik.values.ingredients}
        onChange={(smoothieIngredients) => {
          formik.setFieldValue("ingredients", smoothieIngredients);
        }}
      />
    </Form.Item>
  );

  const controlsNode = (
    <Form.Item>
      <Space size="middle">
        <Button danger htmlType="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button htmlType="submit">Save</Button>
      </Space>
    </Form.Item>
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <Form.Item>
        <PageHeader
          title="Smoothie Form"
          style={{ padding: 0 }}
          onBack={onCancel}
        />
      </Form.Item>
      {nameNode}
      {descriptionNode}
      {ingredientsNode}
      {controlsNode}
    </form>
  );
};

export default SmoothieForm;
