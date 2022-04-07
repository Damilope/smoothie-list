import { PageHeader, Space, Typography } from "antd";
import React from "react";
import { IIngredient } from "../lib/ingredient";
import { ISmoothie } from "../lib/smoothie";
import IngredientList from "./IngredientList";
import { appClasses } from "./theme";
import { noop } from "../lib/fns";
import SmoothieForm, { ISmoothieFormValue } from "./SmoothieForm";
import SmoothieMenu from "./SmoothieMenu";
import { useNavigate } from "react-router-dom";
import { appPaths } from "../lib/paths";

export interface ISmoothieProps {
  smoothie: ISmoothie;
  ingredients: IIngredient[];
  onUpdate: (id: string, smoothie: ISmoothieFormValue) => void;
  onDelete: (id: string) => void;
  checkSmoothieExists: (name: string) => boolean;
}

const Smoothie: React.FC<ISmoothieProps> = (props) => {
  const { smoothie, ingredients, onUpdate, onDelete, checkSmoothieExists } =
    props;
  const navigate = useNavigate();
  const [isEditing, setEditingState] = React.useState(false);
  const toggleEditing = React.useCallback(() => {
    setEditingState(!isEditing);
  }, [isEditing]);

  const onCompleteSaveSmoothie = React.useCallback(
    (update: ISmoothieFormValue) => {
      onUpdate(smoothie.smoothieId, update);
      toggleEditing();
    },
    [smoothie, onUpdate, toggleEditing]
  );

  if (isEditing) {
    return (
      <div className={appClasses.main}>
        <SmoothieForm
          ingredients={ingredients}
          smoothie={smoothie}
          onSubmit={onCompleteSaveSmoothie}
          onCancel={toggleEditing}
          checkSmoothieExists={checkSmoothieExists}
        />
      </div>
    );
  }

  const controlsNode = (
    <SmoothieMenu
      smoothie={smoothie}
      onEdit={toggleEditing}
      onDelete={onDelete}
    />
  );

  return (
    <div className={appClasses.main}>
      <Space
        direction="vertical"
        size="large"
        className={appClasses.spaceVertical}
      >
        <PageHeader
          title={smoothie.name}
          extra={[controlsNode]}
          style={{ padding: "0px" }}
          onBack={() => navigate(appPaths.smoothieList)}
        />
        {smoothie.description && (
          <Typography.Paragraph style={{ margin: 0 }}>
            {smoothie.description}
          </Typography.Paragraph>
        )}
        {smoothie.ingredients.length > 0 && (
          <IngredientList
            useSmoothieIngredientAsDataSource
            ingredients={ingredients}
            smoothieIngredients={smoothie.ingredients}
            onChange={noop}
          />
        )}
      </Space>
    </div>
  );
};

export default Smoothie;
