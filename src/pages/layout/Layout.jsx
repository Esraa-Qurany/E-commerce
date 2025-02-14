import { Outlet } from "react-router-dom";
import Navbar from "../../component/navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
