import * as React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface IProtectedRoutesProps {}

const ProtectedRoutes: React.FunctionComponent<IProtectedRoutesProps> = (
  props
) => {
  const isAuth: boolean = false;
  const location = useLocation(); //Gives the path of the browser URL

  // If they autheticated keep thep safe through the OUTLET component and if not send them back to the login page , Outlet has all the protected Routes
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoutes;
