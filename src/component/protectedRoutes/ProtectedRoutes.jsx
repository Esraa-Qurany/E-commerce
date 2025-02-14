import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  if (localStorage.getItem("token")) {
    return <div>{children}</div>;
  } else {
    return <Navigate to={"/login"} />;
  }
}
