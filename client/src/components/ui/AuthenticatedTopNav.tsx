import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../icons/Logo";
import { authenticatedLinks } from "../../data/topNavLinks";

import { debounce } from "lodash";
import HamburgerMenu from "../icons/HamburgerMenu";
import ProfileIcon from "../icons/ProfileIcon";
function AuthenticatedTopNav() {
  const [isShow, setIsShow] = useState(false);
  const [windowX, setWindowX] = useState(window.innerWidth);
  const collapseNav = windowX < 992;
  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowX(window.innerWidth);
    }, 10);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (collapseNav) setIsShow(true);
  }, [windowX]);
  //
  const renderNavLinks = authenticatedLinks.map((link) => {
    const { id, name, path, icon: Icon } = link;
    return (
      <li key={id}>
        <NavLink
          to={path}
          className={({ isActive }) =>
            `lg:text-xl text-2xl  ${
              isActive
                ? "text-mainColor hover:text-mainColorDark"
                : " text-textColor hover:text-dark"
            }`
          }
        >
          <div className="flex gap-2">
            {collapseNav && <Icon className="lg:w-8 lg:h-8 h-7 w-7" />}
            <h4>{name}</h4>
          </div>
        </NavLink>
      </li>
    );
  });

  return (
    <div
      className={`w-full transition-all bg-bgColor lg:py-5 py-4 sticky top-0 shadow-xl z-50`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center flex-wrap">
          <div className="flex gap-2">
            <div className="lg:hidden " onClick={() => setIsShow(!isShow)}>
              <HamburgerMenu className="w-8 h-8" />
            </div>
            <Link to="/" className="">
              <Logo className="lg:h-10 h-8" />
            </Link>
          </div>

          <ul className="lg:flex hidden gap-6 ">{renderNavLinks}</ul>
          <div className="">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/doggodoggo228/image/upload/v1719548694/account_iu1nvc.png"
                alt=""
                className="w-8 h-8 object-cover"
              />
            </Link>
          </div>
        </div>
      </div>{" "}
      <div
        className={`transition-all duration-300 ${
          isShow && collapseNav ? " translate-x-0 " : " -translate-x-full "
        } px-4 absolute w-full top-[64px] bg-white pt-3 h-[92dvh] min-h-[650px] flex flex-col  order-3 `}
      >
        <ul className="flex flex-wrap flex-col gap-6 order-3 mb-10">
          {renderNavLinks}
        </ul>
      </div>
    </div>
  );
}

export default AuthenticatedTopNav;
