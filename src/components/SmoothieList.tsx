import { PlusOutlined } from "@ant-design/icons";
import { css } from "@emotion/css";
import { Button, List, PageHeader, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { appIngredientList } from "../data/ingredients";
import { appPaths } from "../lib/paths";
import { findSmoothie, ISmoothie } from "../lib/smoothie";
import SmoothieForm, { ISmoothieFormValue } from "./SmoothieForm";
import SmoothieMenu from "./SmoothieMenu";
import { appClasses } from "./theme";

export interface ISmoothieListProps {
  smoothies: ISmoothie[];
  onAddSmoothie: (smoothie: ISmoothieFormValue) => void;
  onDeleteSmoothie: (id: string) => void;
  onUpdateSmoothie: (id: string, smoothie: ISmoothieFormValue) => void;
  checkSmoothieExists: (name: string) => boolean;
}

const classes = {
  list: css({
    "& .ant-list-item-action > li": {
      padding: "0px",
    },
  }),
};

const SmoothieList: React.FC<ISmoothieListProps> = (props) => {
  const {
    smoothies,
    onAddSmoothie,
    onDeleteSmoothie,
    checkSmoothieExists,
    onUpdateSmoothie,
  } = props;
  const [showNewSmoothieForm, setNewSmoothieFormVisibility] =
    React.useState(false);
  const [editSmoothieWithId, setEditSmoothieId] = React.useState<string>();
  const toggleNewSmoothieFormVisibility = React.useCallback(() => {
    setNewSmoothieFormVisibility(!showNewSmoothieForm);
  }, [showNewSmoothieForm]);

  const closeEditSmoothieFormVisibility = React.useCallback(() => {
    setEditSmoothieId("");
  }, []);

  const listNode = (
    <List
      bordered
      className={classes.list}
      dataSource={smoothies}
      renderItem={(item) => (
        <List.Item
          actions={[
            <SmoothieMenu
              smoothie={item}
              onEdit={setEditSmoothieId}
              onDelete={onDeleteSmoothie}
            />,
          ]}
        >
          <List.Item.Meta
            title={
              <Link to={appPaths.smoothie(item.smoothieId)}>{item.name}</Link>
            }
            description={item.description}
          />
        </List.Item>
      )}
    />
  );

  if (showNewSmoothieForm) {
    return (
      <div className={appClasses.main}>
        <SmoothieForm
          ingredients={appIngredientList}
          onSubmit={onAddSmoothie}
          onCancel={toggleNewSmoothieFormVisibility}
          checkSmoothieExists={checkSmoothieExists}
        />
      </div>
    );
  } else if (editSmoothieWithId) {
    const smoothie = findSmoothie(smoothies, editSmoothieWithId);

    if (smoothie) {
      return (
        <div className={appClasses.main}>
          <SmoothieForm
            smoothie={smoothie}
            ingredients={appIngredientList}
            onSubmit={(update) => onUpdateSmoothie(editSmoothieWithId, update)}
            onCancel={closeEditSmoothieFormVisibility}
            checkSmoothieExists={checkSmoothieExists}
          />
        </div>
      );
    }
  }

  return (
    <div className={appClasses.main}>
      <Space
        direction="vertical"
        size="large"
        className={appClasses.spaceVertical}
      >
        <PageHeader
          title="Smoothies"
          extra={[
            <Button
              icon={<PlusOutlined />}
              onClick={toggleNewSmoothieFormVisibility}
            />,
          ]}
          style={{ padding: "0px" }}
        />
        {listNode}
      </Space>
    </div>
  );
};

export default SmoothieList;
