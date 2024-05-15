import React from "react";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Search", path: "/search" },
  { label: "Favorites", path: "/favorites" },
  { label: "Read & Review", path: "/read&reviews" },
];

const Header = () => {
  return (
    <div className="header">
      <HamburgerMenu
        menuItems={menuItems}
        menuSize={2} // Rem
        iconSize={4} // Rem
        lineHeight={7}
        color="black"
        menuBackgroundColor="white"
        position="start" // "start" | "center" | "end"
      />
      <h1 className="bookmaster">BOOKMASTER</h1>
    </div>
  );
};

export default Header;
