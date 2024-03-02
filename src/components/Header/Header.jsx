import React from "react";
import { LogoutBtn, Logo, Container } from "../index";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      slug: "",
      active: true,
    },
    {
      name: "Login",
      slug: "login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "signup",
      active: !authStatus,
    },
    {
      name: "My posts",
      slug: "all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "add-post",
      active: authStatus,
    },
  ];

  const handleLayout = () => {
    return (
      <ul className="grid  ml-auto">
        {navItems.map((item) =>
          item.active ? (
            <NavLink
              key={item.name}
              to={item.slug}
              className={({ isActive }) =>
                `${isActive ? "text-white hover:text-black" : "text-black "}`
              }
            >
              <li className="sm:inline-block  px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
                {item.name}
              </li>
            </NavLink>
          ) : null
        )}

        {authStatus && (
          <NavLink to={"/"}>
            <li className="sm:block ">
              <LogoutBtn />
            </li>
          </NavLink>
        )}
      </ul>
    );
  };

  return (
    <header className="py-3 shadow bg-gray-500 ">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <NavLink to="/">
              <Logo />
            </NavLink>
          </div>
          <ul className="flex  ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <NavLink
                  key={item.name}
                  to={item.slug}
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-white hover:text-black" : "text-black "
                    }`
                  }
                >
                  <li className="sm:inline-block hidden px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
                    {item.name}
                  </li>
                </NavLink>
              ) : null
            )}
            <svg
              className="sm:hidden size-10 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              onClick={handleLayout}
            >
              <path d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z"></path>
            </svg>
            {authStatus && (
              <NavLink to={"/"}>
                <li className="sm:block hidden">
                  <LogoutBtn />
                </li>
              </NavLink>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
