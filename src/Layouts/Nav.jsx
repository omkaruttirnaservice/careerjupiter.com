import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useSearchContext } from "../store/SearchContext";
import { navigation } from "../Constant/constantData";

const Nav = () => {
  const { setTagName, setQuery, setIsLoading } = useSearchContext();

  return (
    <>
      <div
        id="navBar"
        className="p-2 bg-gray-50 fixed top-0 left-0 w-full shadow-md z-50"
      >
        <Popover>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav
              className="relative flex items-center justify-between sm:h-10 md:justify-center"
              aria-label="Global"
            >
              <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:left-0">
                <span className="">
                  <b>CAREER NITI </b>
                </span>
              </div>
              <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <a href="#">
                    <span className="sr-only">Workflow</span>
                    <img
                      className="h-8 w-auto sm:h-10"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt=""
                    />
                  </a>
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:space-x-10">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => {
                      setTagName("All");
                      setQuery("");
                      setIsLoading(true);
                    }}
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
              <div className="hidden gap-2 md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                <span className="inline-flex rounded-md shadow">
                  <NavLink
                    to="/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent hover:bg-green-400  text-base font-medium rounded-md text-white bg-indigo-600"
                  >
                    Log in
                  </NavLink>
                </span>
                <span className="inline-flex rounded-md shadow">
                  <NavLink
                    to="../sign"
                    className="inline-flex items-center px-4 py-2 border  border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                  >
                    Sign Up
                  </NavLink>
                </span>
              </div>
            </nav>
          </div>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt=""
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>

                <div className="px-2 pt-2 pb-3">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <a
                  href="#"
                  className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
                >
                  Log in
                </a>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </>
  );
};

export default Nav;
