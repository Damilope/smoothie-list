import { Menu } from "antd";

export type MenuInfo = Parameters<
  Required<React.ComponentProps<typeof Menu>>["onClick"]
>[0];
