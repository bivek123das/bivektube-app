import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import ButtonList from "./ButtonList";
import { Outlet } from "react-router-dom";
const Body = () => {
  const { pathname } = useLocation();
  const isWatchPage = pathname.startsWith('/watch');
  return (
    <div className="flex w-full min-h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-screen p-2 md:p-4 overflow-y-auto">
        {!isWatchPage && <ButtonList />}
        <Outlet />
      </main>
    </div>
  );
};
export default Body;
