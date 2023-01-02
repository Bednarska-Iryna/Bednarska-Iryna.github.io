import styles from "./common/Main.module.css";
import { Routes, Route } from "react-router-dom";
import { AppRoutes } from "./Route/AppRoutes";
import React, { useEffect } from "react";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import CV from "./MainPage/CV";
import LogIn from "./LogIn/LogIn";
import "rsuite/dist/rsuite.min.css";
import "./common/Overrides-rsuite.css";
import PrivateRoute from "./HOC/PrivateRoute";
import AdminPage from "./Admin/AdminPage";

function App() {
  // const authUser = JSON.parse(localStorage.getItem("authUser"));
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    localStorage.setItem(
      "authUser",
      JSON.stringify({ user: "Iryna", role: "" })
    );
  }, []);
  return (
    <div className={styles.main}>
      <Routes>
        <Route path={AppRoutes.MAIN_PAGE} element={<CV />} />
        <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
        <Route path={AppRoutes.LOGIN} element={<LogIn />} />
        {/* <Route path={AppRoutes.ADMIN} element={<AdminPage/>} /> */}

        {/* {authUser.role === "admin" ? <Route path={AppRoutes.ADMIN} element={<AdminPage/>} /> :  <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />} */}
        {/* <Route element={<PrivateRoute isAllowed={authUser?.role === "admin"} />}>
          <Route path={AppRoutes.ADMIN} element={<AdminPage/>} />
          <Route path={"*"} element={<NotFoundPage />} />
        </Route> */}
        <Route element={<PrivateRoute isAllowed={user?.role === "admin"} />}>
          {/* <Route path={AppRoutes.ADMIN} element={<AdminPage />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
