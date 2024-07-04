import React from "react";
import UnauthenticatedTopNav from "./UnauthenticatedTopNav";
import AuthenticatedTopNav from "./AuthenticatedTopNav";

function TopNav() {
  const auth = true;

  const renderNavbar = () => {
    if (auth) return <AuthenticatedTopNav />;
    return <UnauthenticatedTopNav />;
  };

  return <React.Fragment>{renderNavbar()}</React.Fragment>;
}

export default TopNav;
