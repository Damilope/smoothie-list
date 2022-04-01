import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PageMessage from "./components/PageMessage";
import SmoothieContainer from "./components/SmoothieContainer";
import SmoothieListContainer from "./components/SmoothieListContainer";
import { appMessages } from "./lib/messages";
import { appPaths } from "./lib/paths";

const App: React.FC<{}> = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (window.location.pathname === appPaths.empty) {
      navigate(appPaths.smoothieList);
    }
  }, [navigate]);

  return (
    <Routes>
      <Route
        path={appPaths.smoothieList}
        element={<SmoothieListContainer />}
      ></Route>
      <Route
        path={appPaths.smoothie(":smoothieId")}
        element={<SmoothieContainer />}
      ></Route>
      <Route
        path={appPaths.wildcard}
        element={<PageMessage description={appMessages.pageNotFound} />}
      ></Route>
    </Routes>
  );
};

export default App;
