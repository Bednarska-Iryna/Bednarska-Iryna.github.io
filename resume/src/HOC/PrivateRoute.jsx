import { AppRoutes } from "../Route/AppRoutes";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({
      isAllowed,
      redirectPath = AppRoutes.NOT_FOUND,
      children,
      }) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} />;
    }
    return children ? children : <Outlet />
};

export default PrivateRoute;