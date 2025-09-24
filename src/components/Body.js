import React from "react";
import Sidebar from "./Sidebar";
import ButtonList from "./ButtonList";
import { Outlet } from "react-router-dom";
const Body = () => {
  return (
    <div className="flex w-full min-h-screen overflow-hidden">
    <Sidebar />
    <main className="flex-1 h-screen p-2 md:p-4 overflow-y-auto">
      <ButtonList /> {/* horizontal scroll */}
      <Outlet />     {/* vertical scrollable content */}
    </main>
  </div>
  
  );
};
export default Body;
