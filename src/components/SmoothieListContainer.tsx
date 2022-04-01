import React from "react";
import { useNavigate } from "react-router-dom";
import { appStorageKeys } from "../lib/constants";
import { getNewId } from "../lib/fns";
import { appPaths } from "../lib/paths";
import {
  findSmoothieByName,
  findSmoothieIndex,
  ISmoothie,
} from "../lib/smoothie";
import { ISmoothieFormValue } from "./SmoothieForm";
import SmoothieList from "./SmoothieList";

export interface ISmoothieListRenderFnProps {
  isInitialized?: boolean;
  smoothies: ISmoothie[];
  handleUpdateSmoothie: (id: string, smoothie: ISmoothieFormValue) => void;
  handleAddSmoothie: (smoothie: ISmoothieFormValue) => void;
  handleDeleteSmoothie: (id: string) => void;
  checkSmoothieExists: (name: string) => boolean;
}

export interface ISmoothieListContainerProps {
  render?: (props: ISmoothieListRenderFnProps) => React.ReactElement;
}

function getSmoothieListFromStorage(): ISmoothie[] {
  const smoothiesJSON = window.localStorage.getItem(
    appStorageKeys.smoothieList
  );

  return smoothiesJSON ? JSON.parse(smoothiesJSON) : [];
}

function setSmoothieListInStorage(smoothies: ISmoothie[]) {
  window.localStorage.setItem(
    appStorageKeys.smoothieList,
    JSON.stringify(smoothies)
  );
}

const SmoothieListContainer: React.FC<ISmoothieListContainerProps> = (
  props
) => {
  const { render } = props;
  const [smoothies, setSmoothies] = React.useState<ISmoothie[]>([]);
  const [isInitialized, setInitializationState] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Initialize smoothie list
    setSmoothies(getSmoothieListFromStorage());
    setInitializationState(true);
  }, []);

  const internalSetSmoothies = React.useCallback(
    (updatedSmoothies: ISmoothie[]) => {
      setSmoothies(updatedSmoothies);
      setSmoothieListInStorage(updatedSmoothies);
    },
    []
  );

  const handleUpdateSmoothie = React.useCallback(
    (id: string, smoothieUpdate: ISmoothieFormValue) => {
      const index = findSmoothieIndex(smoothies, id);

      if (index === -1) {
        return;
      }

      const updatedSmoothie = {
        ...smoothies[index],
        ...smoothieUpdate,
        updatedAt: new Date().toUTCString(),
      };

      const updatedSmoothies = [...smoothies];
      updatedSmoothies[index] = updatedSmoothie;
      internalSetSmoothies(updatedSmoothies);
      navigate(appPaths.smoothie(updatedSmoothie.smoothieId));
    },
    [smoothies, internalSetSmoothies]
  );

  const handleDeleteSmoothie = React.useCallback(
    (id: string) => {
      const updatedSmoothies = smoothies.filter((item) => {
        return item.smoothieId !== id;
      });

      internalSetSmoothies(updatedSmoothies);
      navigate(appPaths.smoothieList);
    },
    [smoothies, internalSetSmoothies]
  );

  const handleAddSmoothie = React.useCallback(
    (smoothie: ISmoothieFormValue) => {
      const newSmoothie: ISmoothie = {
        ...smoothie,
        smoothieId: getNewId(),
        createdAt: new Date().toUTCString(),
      };

      const updatedSmoothies: ISmoothie[] = [...smoothies, newSmoothie];
      internalSetSmoothies(updatedSmoothies);
      navigate(appPaths.smoothie(newSmoothie.smoothieId));
    },
    [smoothies, internalSetSmoothies]
  );

  const checkSmoothieExists = React.useCallback(
    (name: string) => {
      return !!findSmoothieByName(smoothies, name);
    },
    [smoothies]
  );

  if (render) {
    return render({
      isInitialized,
      smoothies,
      handleAddSmoothie,
      handleUpdateSmoothie,
      handleDeleteSmoothie,
      checkSmoothieExists,
    });
  }

  return (
    <SmoothieList
      smoothies={smoothies}
      onAddSmoothie={handleAddSmoothie}
      onDeleteSmoothie={handleDeleteSmoothie}
      onUpdateSmoothie={handleUpdateSmoothie}
      checkSmoothieExists={checkSmoothieExists}
    />
  );
};

export default SmoothieListContainer;
