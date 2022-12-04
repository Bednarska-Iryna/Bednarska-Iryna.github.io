import { AppRoutes } from "./Routes"
import { Navigate } from "react-router-dom";

export const AdminRoute = ({authUser, Component}) => {
    return authUser === null
        ? <Navigate to={AppRoutes.NOT_FOUND}/>
        : authUser?.role === "admin"
            ? <CV/>
            : authUser?.role === "user"
            && <Navigate to={AppRoutes.NOT_FOUND}/>
}