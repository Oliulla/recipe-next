import React from "react";
import HeaderNav from "./Navbar";
import getCurrentUser from "@/lib/session";

const Header = async () => {
  const user = await getCurrentUser();
  
  return (
    <div>
      <HeaderNav user={user} />
    </div>
  );
};

export default Header;
