import React from "react";
import UnauthenticatedTopNav from "./UnauthenticatedTopNav";
import AuthenticatedTopNav from "./AuthenticatedTopNav";
import { useAuth } from "../../hooks/AuthContext";

function TopNav() {
  const { token } = useAuth();

  const renderNavbar = () => {
    if (token) return <AuthenticatedTopNav />;
    return <UnauthenticatedTopNav />;
  };

  return <React.Fragment>{renderNavbar()}</React.Fragment>;
}

export default TopNav;
