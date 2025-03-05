import React, { useState } from "react";

import {
  FaBars,
  FaCalendarAlt,
  FaChartBar,
  FaFolder,
  FaHome,
  FaInbox,
  FaTimes,
} from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { NavLink, Outlet } from "react-router-dom";

function ProfileLayout() {
  const navigation = [
    {
      name: "My Profile",
      href: "/profile/personal-details",
      icon: FaHome,
      current: true,
    },
    {
      name: "Test",
      href: "/profile/test",
      icon: LuNotebookPen,
      current: false,
    },
  ];

  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const classNames = (...classes) => classes.filter(Boolean).join(" ");

  return (
    <>
      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 flex md:hidden">
          <div className="bg-blue-600 w-64 p-5 relative border-r border-gray-300 text-white">
            <button
              className="absolute top-2 right-2 text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <nav className="mt-5">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current ? "bg-blue-500" : "hover:bg-blue-500",
                    "flex items-center p-2 rounded-md"
                  )}
                >
                  <item.icon className="mr-3 w-6 h-6" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-blue-600 border-r border-gray-300 p-5 text-white">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={classNames(
                item.current ? "bg-blue-300" : "hover:bg-blue-300",
                "flex items-center p-2 rounded-md"
              )}
            >
              <item.icon className="mr-3 w-6 h-6" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div>
        {/* Main Content */}
        <div className="md:pl-64">
          <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <FaBars className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <main className="p-6">
            <div className="mt-6 h-96 border-0.5 ">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default ProfileLayout;
