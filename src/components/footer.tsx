import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TbVector } from "react-icons/tb";
import { TiDocumentText } from "react-icons/ti";
import { IoBusinessOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";

export default function Footer() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdownId: any) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  const handleMouseEnter = (dropdownId: any) => {
    if (activeDropdown !== dropdownId) {
      toggleDropdown(dropdownId);
    }
  };

  const handleClickOutside = (event: any) => {
    if (!event.target.closest(".dropdown")) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <footer>
      <div
        className={`dropdown ${activeDropdown === "product" ? "active" : ""}`}
        onMouseEnter={() => handleMouseEnter("product")}
      >
        <button
          className="link"
          data-dropdown-button
          onClick={() => toggleDropdown("product")}
        >
          <TbVector />
          <p>Product</p>
        </button>

        <div className="dropdown-menu">
          <Link to="/components/News">News</Link>
          <Link to="/components/Pricing">Pricing</Link>
        </div>
      </div>

      <div
        className={`dropdown ${activeDropdown === "resources" ? "active" : ""}`}
        onMouseEnter={() => handleMouseEnter("resources")}
      >
        <button
          className="link"
          data-dropdown-button
          onClick={() => toggleDropdown("resources")}
        >
          <TiDocumentText />
          <p>Resources</p>
        </button>
        <div className="dropdown-menu">
          <Link to="/components/Docs">Docs</Link>
          <Link to="/components/Api">API</Link>
        </div>
      </div>

      <div
        className={`dropdown ${activeDropdown === "company" ? "active" : ""}`}
        onMouseEnter={() => handleMouseEnter("company")}
      >
        <button
          className="link"
          data-dropdown-button
          onClick={() => toggleDropdown("company")}
        >
          <IoBusinessOutline />
          <p>Company</p>
        </button>
        <div className="dropdown-menu">
          <Link to="/components/Team">Team</Link>
          <Link to="/components/Finances">Finances</Link>
          <Link to="/components/Legal">Legal</Link>
        </div>
      </div>

      <div
        className={`dropdown ${activeDropdown === "social" ? "active" : ""}`}
        onMouseEnter={() => handleMouseEnter("social")}
      >
        <button
          className="link"
          data-dropdown-button
          onClick={() => toggleDropdown("social")}
        >
          <BsPeople />
          <p>Social</p>
        </button>
        <div className="dropdown-menu">
          <Link to="https://github.com/Generlate">Github</Link>
          <Link to="https://www.youtube.com/@generlate">Youtube</Link>
          <Link to="https://twitter.com/Generlate">Twitter</Link>
          <Link to="https://www.linkedin.com/company/generlate/">LinkedIn</Link>
        </div>
      </div>
    </footer>
  );
}
