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

  return (
    <header className="py-3 shadow bg-gray-500 ">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <NavLink to="/">
              <Logo />
            </NavLink>
          </div>
          <ul className="flex ml-auto">
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
                  <li className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
                    {item.name}
                  </li>
                </NavLink>
              ) : null
            )}
            {authStatus && (
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  `${isActive ? "text-white hover:text-black" : "text-black "}`
                }
              >
                <li>
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
