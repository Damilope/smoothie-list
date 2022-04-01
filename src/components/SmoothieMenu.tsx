import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Modal } from "antd";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { ISmoothie } from "../lib/smoothie";
import { appClasses } from "./theme";
import { MenuInfo } from "./types";

export interface ISmoothieProps {
  smoothie: ISmoothie;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

enum MenuKeys {
  EditSmoothie = "edit-smoothie",
  DeleteSmoothie = "delete-smoothie",
}

const SmoothieMenu: React.FC<ISmoothieProps> = (props) => {
  const { smoothie, onEdit, onDelete } = props;
  const onSelectMenuItem = React.useCallback(
    (info: MenuInfo) => {
      if (info.key === MenuKeys.EditSmoothie) {
        onEdit(smoothie.smoothieId);
      } else if (info.key === MenuKeys.DeleteSmoothie) {
        Modal.confirm({
          title: "Are you sure you want to delete this smoothie?",
          okText: "Yes",
          cancelText: "No",
          okType: "primary",
          okButtonProps: { danger: true },
          onOk: async () => {
            onDelete(smoothie.smoothieId);
          },
          onCancel() {
            // do nothing
          },
        });
      }
    },
    [smoothie, onEdit, onDelete]
  );

  return (
    <Dropdown
      trigger={["click"]}
      overlay={
        <Menu onClick={onSelectMenuItem} style={{ minWidth: "150px" }}>
          <Menu.Item key={MenuKeys.EditSmoothie} icon={<EditOutlined />}>
            Edit Smoothie
          </Menu.Item>
          <Menu.Divider key="divider-01" />
          <Menu.Item key={MenuKeys.DeleteSmoothie} icon={<DeleteOutlined />}>
            Delete Smoothie
          </Menu.Item>
        </Menu>
      }
      placement="bottomRight"
    >
      <Button className={appClasses.iconBtn} icon={<BsThreeDots />}></Button>
    </Dropdown>
  );
};

export default SmoothieMenu;
