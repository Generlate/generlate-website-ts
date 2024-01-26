import React, { useState, useEffect } from "react";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { VscColorMode } from "react-icons/vsc";

interface HeaderProps {
  toggleTheme: () => void;
  theme: string;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, theme }) => {
  const headerImageSrc =
    theme === "dark" ? "/generlate-dark.webp" : "/generlate-light.webp";

  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdownId:any) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  const handleMouseEnter = (dropdownId:any) => {
    if (activeDropdown !== dropdownId) {
      toggleDropdown(dropdownId);
    }
  };

  const handleClickOutside = (event:any) => {
    if (!event.target.closest(".dropdown")) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <Link to="/components/Home">
        <img src={headerImageSrc} alt="Generlate logo" title="home" />
      </Link>
      <div
        className={`dropdown ${activeDropdown === "profile" ? "active" : ""}`}
        onMouseEnter={() => handleMouseEnter("profile")}
      >
        <button
          className="link"
          data-dropdown-button
          onClick={() => toggleDropdown("profile")}
        >
          <BiUserCircle title="user options" />
        </button>

        <div className="dropdown-menu">
          <p title="profile">Log in</p>
          <input type="text" placeholder="username"></input>

          <input type="text" placeholder="password"></input>

          <a href="../pages/sign-up" title="profile">
            Sign up
          </a>
          <button className="link" onClick={toggleTheme} title="colors">
            <VscColorMode />
            <p>theme</p>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;