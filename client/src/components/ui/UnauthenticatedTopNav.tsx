import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../icons/Logo";
import { unauthenticatedLinks } from "../../data/topNavLinks";
import Button from "../common/Button";
import { debounce } from "lodash";
import HamburgerMenu from "../icons/HamburgerMenu";

function UnauthenticatedTopNav() {
  const [isShow, setIsShow] = useState(false);
  const [windowX, setWindowX] = useState(window.innerWidth);

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
    if (windowX > 992) setIsShow(false);
  }, [windowX]);

  const renderNavLinks = unauthenticatedLinks.map((link) => {
    const { id, name, path, active } = link;
    return (
      <li key={id}>
        <Link
          to={path}
          className={`lg:text-xl text-2xl  ${
            active
              ? "text-mainColor hover:text-mainColorDark"
              : " text-textColor hover:text-dark"
          }`}
        >
          {name}
        </Link>
      </li>
    );
  });

  return (
    <div
      className={`w-full transition-all bg-bgColor lg:py-5 py-4 sticky top-0 shadow-xl z-50`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center flex-wrap">
          <Link to="/">
            <Logo className="lg:h-10 h-8" />
          </Link>
          <ul className="lg:flex hidden gap-6 ">{renderNavLinks}</ul>
          <div className="lg:flex hidden gap-3 ">
            <Button>Login</Button>
            <Button variant="main">Sign Up</Button>
          </div>
          <div className="lg:hidden order-2" onClick={() => setIsShow(!isShow)}>
            <HamburgerMenu className="w-8 h-8" />
          </div>

          {isShow && (
            <div className="z-50 h-[92dvh] min-h-96 flex flex-col justify-center items-center order-3 w-full">
              <ul className="flex flex-wrap flex-col gap-6 order-3 items-center mb-10">
                {renderNavLinks}
              </ul>
              <div className="flex flex-col gap-3 order-4 ">
                <Button className="px-5!">Login</Button>
                <Button variant="main">Sign Up</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UnauthenticatedTopNav;
