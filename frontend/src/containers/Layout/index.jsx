import { Outlet } from "react-router-dom";
import TopNav from "@/components/TopNav";

const Layout = () => {
  return (
    <div className="h-screen">
      <TopNav />
      <div className="bg-gray-300 w-full h-screen overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
