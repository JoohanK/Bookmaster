import { useState } from "react";
import "./_hamburgerMenu.scss";
import Link from "next/link";

type HamburgerMenuProps = {
  menuItems: { label: string; path: string }[];
  color?: string;
  lineHeight?: number;
  position: "start" | "center" | "end";
  menuSize?: number;
  iconSize?: number;
  menuBackgroundColor?: string;
};

const HamburgerMenu = ({
  menuItems,
  color = "black",
  lineHeight = 1,
  position = "start",
  menuSize = 1,
  iconSize = 1,
  menuBackgroundColor = "white",
}: HamburgerMenuProps) => {
  const getLineStyle = () => ({
    backgroundColor: color,
    height: `${lineHeight}px`,
    margin: `0`,
  });

  const getFlexAlignment = () => {
    switch (position) {
      case "start":
        return "flex-start";
      case "end":
        return "flex-end";
      case "center":
        return "center";
      default:
        return "flex-start";
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="HamburgerMenu" style={{ alignItems: getFlexAlignment() }}>
      <div
        className={`hamburger ${isOpen ? "x-icon" : ""}`}
        onClick={toggleMenu}
        style={{ height: iconSize + "rem", width: iconSize + "rem" }}
      >
        {!isOpen ? (
          <>
            <div className="line" style={getLineStyle()} />
            <div className="line" style={getLineStyle()} />
            <div className="line" style={getLineStyle()} />
          </>
        ) : (
          <div
            className="x-icon"
            style={{
              color: color,
              fontSize: iconSize + "rem",
            }}
          >
            ✕
          </div>
        )}
      </div>

      {isOpen && (
        <div className="menu" style={{ background: menuBackgroundColor }}>
          {menuItems.map((menuItem, index) => (
            <Link
              href={menuItem.path}
              key={index}
              className="menu-item"
              style={{
                color: color,
                fontSize: menuSize + "rem",
              }}
              onClick={toggleMenu}
            >
              {menuItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
