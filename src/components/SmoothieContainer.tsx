import React from "react";
import { useParams } from "react-router-dom";
import { appIngredientList } from "../data/ingredients";
import { appMessages } from "../lib/messages";
import { findSmoothie } from "../lib/smoothie";
import PageMessage from "./PageMessage";
import Smoothie from "./Smoothie";
import SmoothieListContainer, {
  ISmoothieListRenderFnProps,
} from "./SmoothieListContainer";

export interface ISmoothieContainerProps {}
export type ISmoothieContainerPathParams = {
  smoothieId: string;
};

const SmoothieContainer: React.FC<ISmoothieContainerProps> = (props) => {
  const params = useParams<ISmoothieContainerPathParams>();

  const renderSmoothie = React.useCallback(
    (smoothieRenderProps: ISmoothieListRenderFnProps) => {
      const {
        isInitialized,
        handleUpdateSmoothie,
        handleDeleteSmoothie,
        smoothies,
        checkSmoothieExists,
      } = smoothieRenderProps;

      const smoothie =
        params.smoothieId && findSmoothie(smoothies, params.smoothieId);

      if (!isInitialized) {
        return <PageMessage description={appMessages.loading} />;
      } else if (!smoothie) {
        return <PageMessage description={appMessages.smoothieNotFound} />;
      }

      return (
        <Smoothie
          smoothie={smoothie}
          ingredients={appIngredientList}
          onUpdate={handleUpdateSmoothie}
          onDelete={handleDeleteSmoothie}
          checkSmoothieExists={checkSmoothieExists}
        />
      );
    },
    [params.smoothieId]
  );

  return <SmoothieListContainer render={renderSmoothie} />;
};

export default SmoothieContainer;
