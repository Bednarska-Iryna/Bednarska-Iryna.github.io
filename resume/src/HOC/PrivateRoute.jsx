import { AppRoutes } from "../Route/AppRoutes";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({
  Component,
  redirectPath = AppRoutes.NOT_FOUND,
}) => {
  const user = JSON.parse(localStorage.getItem("user")); 
  return user?.role === "admin" ? (
    <Component />
  ) : (
    <Navigate to={redirectPath} />
  );
 
};

// export const PublicRoute = ({ Component, redirectPath = AppRoutes.ADMIN }) => {  
//   return user?.role === "admin" ? (
//     <Navigate to={redirectPath} />
//   ) : (
//     <Component />
//   );
// };

export default PrivateRoute;
