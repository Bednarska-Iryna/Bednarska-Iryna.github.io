import styles from "./common/Main.module.css";
import { Routes, Route } from "react-router-dom";
import { AppRoutes } from "./Route/AppRoutes";
import React, { useEffect } from "react";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import CV from "./MainPage/CV";
import LogIn from "./LogIn/LogIn";
import "rsuite/dist/rsuite.min.css";
import "./common/Overrides-rsuite.css";
import PrivateRoute, { PublicRoute } from "./HOC/PrivateRoute";
import AdminPage from "./Admin/AdminPage";

function App() { 

  return (
    <div className={styles.main}>
      <Routes>
        <Route path={AppRoutes.MAIN_PAGE} element={<CV />} />
        <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
        <Route path={AppRoutes.LOGIN} element={<LogIn/>} />
        <Route path={AppRoutes.ADMIN} element={<PrivateRoute Component={AdminPage} />} />
      </Routes>
    </div>
  );
}

export default App;
