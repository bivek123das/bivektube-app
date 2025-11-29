import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import ButtonList from "./ButtonList";
import { Outlet } from "react-router-dom";

const Body = () => {
  const { pathname } = useLocation();
  const isWatchPage = pathname.startsWith("/watch");
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return (
    <div className="flex w-full h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar: its own scroll - only takes space when open */}
      {isMenuOpen && (
        <aside className="w-64 md:w-72 h-full overflow-y-auto dark:border-gray-700 hidden md:block">
          <Sidebar />
        </aside>
      )}

      {/* Main content: its own scroll - expands to full width when sidebar closed */}
      <main className="flex-1 h-full overflow-y-auto p-2 md:p-4 w-full">
        {!isWatchPage && <ButtonList />}
        <Outlet />
      </main>
    </div>
  );
};

export default Body;




