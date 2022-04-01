import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, InputNumber, Space } from "antd";
import React from "react";

export interface IIngredientUpdateButtonProps {
  count: number;
  onChange: (value: number) => void;
}

const IngredientUpdateButton: React.FC<IIngredientUpdateButtonProps> = (
  props
) => {
  const { count, onChange } = props;
  return (
    <Space size="middle">
      <Button
        shape="circle"
        icon={<MinusOutlined />}
        onClick={() => count && onChange(count - 1)}
      />
      <InputNumber
        value={count}
        onChange={onChange}
        style={{ width: "54px" }}
      />
      <Button
        shape="circle"
        icon={<PlusOutlined />}
        onClick={() => onChange(count + 1)}
      />
    </Space>
  );
};

export default IngredientUpdateButton;
