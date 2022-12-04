import styles from "./common/Main.module.css";
import { Routes, Route } from "react-router-dom";
import { AppRoutes } from "./Route/Routes";
import React, { useEffect } from "react";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import CV from "./MainPage/CV";
import LogIn from "./LogIn/LogIn";

function App() {
  // const authUser = JSON.parse(localStorage.getItem("authUser"));
  // const admin = JSON.parse(localStorage.getItem("user"));
  // console.log(authUser)
  // useEffect(()=>{
  //     localStorage.setItem("authUser", JSON.stringify({user: "Iryna", role: "admin"}))
  // },[])
  return (
    <div className={styles.main}>     
      <Routes>
        <Route path={AppRoutes.MAIN_PAGE} element={<CV />} />
        <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
        <Route path={AppRoutes.LOGIN} element={<LogIn />} />
      </Routes>
    </div>
  );
}

export default App;
