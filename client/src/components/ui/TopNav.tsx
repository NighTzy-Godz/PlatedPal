// NOTE: ADD THE ACTIVE STATE OF THE NAV LATER

import React from "react";
import UnauthenticatedTopNav from "./UnauthenticatedTopNav";

function TopNav() {
  const auth = false;

  const renderNavbar = () => {
    if (auth) return null;
    return <UnauthenticatedTopNav />;
  };

  return <React.Fragment>{renderNavbar()}</React.Fragment>;
}

export default TopNav;
