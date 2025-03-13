// import { Popover, Transition, Menu } from "@headlessui/react";
// import { MenuIcon, XIcon } from "@heroicons/react/outline";
// import { Fragment } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { navigation } from "../Constant/constantData";

// const Nav = () => {
//   const { isLoggedIn } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const profilePic =
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsEJHmI0MlIGvH9CYkbsLEWQ5_ee8Qtl5V-Q&s";

//   const handleSignOut = () => {
//     dispatch({ type: "LOGOUT" });
//     navigate("/signout");
//   };

//   const handleNavClick = () => {};

//   return (
//     <div className="p-2 bg-gray-50 fixed top-0 left-0 w-full shadow-md z-50">
//       <Popover>
//         {({ open }) => (
//           <>
//             <nav className="flex justify-between items-center h-12 max-w-7xl mx-auto px-4">
//               <a
//                 href="/"
//                 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
//               >
//                 CAREER NITI
//               </a>

//               <div className="hidden md:flex md:space-x-8">
//                 {navigation.map((item) => (
//                   <div key={item.name} className="relative group">
//                     <NavLink
//                       to={item.href}
//                       onClick={(e) => handleClick(e, item.href)}
//                       className={({ isActive }) =>
//                         `font-medium hover:text-gray-900 ${
//                           isActive
//                             ? "text-blue-600 font-semibold"
//                             : "text-gray-500"
//                         }`
//                       }
//                     >
//                       {item.name}
//                     </NavLink>
//                     {item.children && (
//                       <div className="absolute left-0 mt-2 w-58 bg-black shadow-lg rounded-md opacity-0 scale-95 transform transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100">
//                         {item.children.map((child) => (
//                           <a
//                             key={child.name}
//                             href={child.href}
//                             onClick={(e) => handleClick(e, child.href)}
//                             className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-blue-600"
//                           >
//                             {child.name}
//                           </a>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               <div className="hidden md:flex items-center gap-4">
//                 {isLoggedIn && (
//                   <Menu as="div" className="relative">
//                     <Menu.Button className="flex items-center cursor-pointer">
//                       <img
//                         src={profilePic}
//                         alt="Profile"
//                         className="h-8 w-8 rounded-full"
//                       />
//                     </Menu.Button>
//                     <Transition
//                       as={Fragment}
//                       enter="transition ease-out duration-100"
//                       enterFrom="transform opacity-0 scale-95"
//                       enterTo="transform opacity-100 scale-100"
//                       leave="transition ease-in duration-75"
//                       leaveFrom="transform opacity-100 scale-100"
//                       leaveTo="transform opacity-0 scale-95"
//                     >
//                       <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
//                         <Menu.Item>
//                           {({ active }) => (
//                             <NavLink
//                               to="/profile/personal-details"
//                               className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}
//                             >
//                               Profile
//                             </NavLink>
//                           )}
//                         </Menu.Item>
//                         <Menu.Item>
//                           {({ active }) => (
//                             <button
//                               onClick={handleSignOut}
//                               className={`block w-full text-left px-4 py-2 text-red-600 ${active ? "bg-gray-100" : ""}`}
//                             >
//                               Sign Out
//                             </button>
//                           )}
//                         </Menu.Item>
//                       </Menu.Items>
//                     </Transition>
//                   </Menu>
//                 )}
//               </div>

//               <div className="md:hidden flex items-center gap-4">
//                 {isLoggedIn && (
//                   <Menu as="div" className="relative">
//                     <Menu.Button className="flex items-center cursor-pointer">
//                       <img
//                         src={profilePic}
//                         alt="Profile"
//                         className="h-8 w-8 rounded-full"
//                       />
//                     </Menu.Button>
//                     <Transition
//                       as={Fragment}
//                       enter="transition ease-out duration-100"
//                       enterFrom="transform opacity-0 scale-95"
//                       enterTo="transform opacity-100 scale-100"
//                       leave="transition ease-in duration-75"
//                       leaveFrom="transform opacity-100 scale-100"
//                       leaveTo="transform opacity-0 scale-95"
//                     >
//                       <Menu.Items className="absolute right-10 mt-2 w-40 bg-white border rounded-md shadow-lg">
//                         <Menu.Item>
//                           {({ active }) => (
//                             <NavLink
//                               to="/profile/personal-details"
//                               className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}
//                             >
//                               Profile
//                             </NavLink>
//                           )}
//                         </Menu.Item>
//                         <Menu.Item>
//                           {({ active }) => (
//                             <button
//                               onClick={handleSignOut}
//                               className={`block w-full text-left px-4 py-2 text-red-600 ${active ? "bg-gray-100" : ""}`}
//                             >
//                               Sign Out
//                             </button>
//                           )}
//                         </Menu.Item>
//                       </Menu.Items>
//                     </Transition>
//                   </Menu>
//                 )}

//                 <Popover.Button className="p-2 rounded-md bg-gray-50 hover:bg-gray-100">
//                   {open ? (
//                     <XIcon className="h-6 w-6" />
//                   ) : (
//                     <MenuIcon className="h-6 w-6" />
//                   )}
//                 </Popover.Button>
//               </div>
//             </nav>

//             <Transition
//               as={Fragment}
//               enter="duration-150 ease-out"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="duration-100 ease-in"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Popover.Panel className="absolute top-16 inset-x-0 p-2 transition transform origin-top-right md:hidden">
//                 <div className="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50">
//                   <div className="px-5 pt-5 pb-6">
//                     <div className="flex flex-col space-y-4">
//                       {navigation.map((item) => (
//                         <NavLink
//                           key={item.name}
//                           to={item.href}
//                           onClick={handleNavClick}
//                           className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
//                         >
//                           {item.name}
//                         </NavLink>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </Popover.Panel>
//             </Transition>
//           </>
//         )}
//       </Popover>
//     </div>
//   );
// };

// export default Nav;
import { Popover, Transition, Menu } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { navigation } from "../Constant/constantData";

const Nav = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const profilePic =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsEJHmI0MlIGvH9CYkbsLEWQ5_ee8Qtl5V-Q&s";

  const handleSignOut = () => {
    setShowConfirm(true);
  };

  const confirmSignOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/signout");
    setShowConfirm(false);
  };

  return (
    <div className="p-2 bg-gray-50 fixed top-0 left-0 w-full shadow-md z-50">
      <Popover>
        {({ open }) => (
          <>
            <nav className="flex justify-between items-center h-12 max-w-7xl mx-auto px-4">
              <a
                href="/"
                className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
              >
                CAREER NITI
              </a>

              <div className="hidden md:flex md:space-x-8">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `font-medium hover:text-gray-900 ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "text-gray-500"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              <div className="hidden md:flex items-center gap-4">
                {isLoggedIn && (
                  <Menu as="div" className="relative">
                    <Menu.Button className="flex items-center cursor-pointer">
                      <img
                        src={profilePic}
                        alt="Profile"
                        className="h-8 w-8 rounded-full"
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to="/profile/personal-details"
                              className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}
                            >
                              Profile
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleSignOut}
                              className={`block w-full text-left px-4 py-2 text-red-600 ${active ? "bg-gray-100" : ""}`}
                            >
                              Sign Out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </nav>

            {showConfirm && (
              <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
                <div className="bg-white p-6 border block rounded-lg shadow-lg">
                  <p className="text-lg font-medium">
                    Are you sure you want to sign out?
                  </p>
                  <div className="mt-4 flex justify-end space-x-4">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmSignOut}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </Popover>
    </div>
  );
};

export default Nav;
