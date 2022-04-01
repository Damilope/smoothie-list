import { css } from "@emotion/css";
import { Empty } from "antd";
import React from "react";

export interface IPageMessageProps {
  description: string;
}

const classes = {
  empty: css({ margin: "64px auto" }),
};

const PageMessage: React.FC<IPageMessageProps> = (props) => {
  const { description } = props;
  return <Empty description={description} className={classes.empty} />;
};

export default PageMessage;
