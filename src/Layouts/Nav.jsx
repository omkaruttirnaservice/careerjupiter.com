import { Popover, Transition, Menu } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { navigation } from "../Constant/constantData";
// import { NavLink } from 'react-router-dom';

const Nav = () => {
  const handleScrollToSection = () => {
    const section = document.getElementById("check-eligibility-section");
    if (section) {
      const offset = 100; // Sectioncha top kiti gap thevaycha tya sathi
      const sectionPosition =
        section.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      });
    }
  };

  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const profilePic =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsEJHmI0MlIGvH9CYkbsLEWQ5_ee8Qtl5V-Q&s";

  const handleSignOut = () => {
    navigate("/signout");
  };

  const confirmSignOut = () => {
    setShowConfirm(true);
  };

  const handleClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);

    if (targetElement) {
      const offset = 100;
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
      targetElement.classList.add("highlight");
      setTimeout(() => {
        targetElement.classList.remove("highlight");
      }, 1500);
    }
  };

  return (
    <div className="p-2 bg-gray-50 fixed top-0 left-0 w-full shadow-md z-50">
      <Popover>
        {({ open }) => (
          <>
            <nav className="flex justify-between items-center h-12 max-w-7xl mx-auto px-4">
              <NavLink
                to="/"
                className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
              >
                CAREER NITI
              </NavLink>
              <div className="hidden md:flex md:items-center md:space-x-8">
                {navigation.map((item) => (
                  <div key={item.name} className="relative group">
                    {item.name === "Home" ? (
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          isActive ? "text-blue-600 font-bold" : "text-gray-700"
                        }
                      >
                        {item.name}
                      </NavLink>
                    ) : (
                      <NavLink
                        to={item.to}
                        className="text-gray-700 hover:text-blue-600"
                      >
                        {item.name}
                      </NavLink>
                    )}
                    {item.children && (
                      <div className="absolute left-0 mt-2 w-58 bg-white shadow-lg rounded-md opacity-0 scale-20 transform transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                        {item.children.map((child) => (
                          <a
                            key={child.name}
                            href={child.href}
                            onClick={(e) => handleClick(e, child.href)}
                            className="block px-4 py-2 text-black hover:bg-gray-300  hover:border hover:border-black transition-all	"
                          >
                            {child.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={handleScrollToSection}
                  className="bg-pink-600 cursor-pointer text-white font-bold py-2 px-4 rounded-lg"
                >
                  Check Eligibility ➡️
                </button>
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
                              onClick={confirmSignOut}
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

              <div className="md:hidden flex items-center gap-4">
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
                      <Menu.Items className="absolute right-10 mt-2 w-40 bg-white border rounded-md shadow-lg">
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
                              onClick={confirmSignOut}
                              className={`block w-full text-left px-4 py-2 text-red-600 ${active ? "bg-gray-100" : ""}`}
                            >
                              Sign Out1
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
                      onClick={handleSignOut}
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
