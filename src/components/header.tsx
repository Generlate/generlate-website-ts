import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { VscColorMode } from "react-icons/vsc";


const Header = (props: { toggleTheme: () => void, theme:string , name: string, setName: (name: string) => void }) => {
  



  


  const headerImageSrc =
    props.theme === "dark" ? "/generlate-dark.webp" : "/generlate-light.webp";

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

  const logout = async () => {
    await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
    });

    props.setName('');
  }

  let menu; 

  if(props.name === "") {
    menu = (
        <ul>
          <li>
            <Link to="/components/login">Login</Link>
          </li>
          <li>
            <Link to="/components/register">Register</Link>
          </li>
        </ul>
    )
  } else {
    menu = (
        <ul>
          <li>
            <Link to="/components/login" onClick={logout}>Logout</Link>
          </li>
        </ul>
    )
  }

  return (
    <header>
      <Link to="/components/About">
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

        <form className="dropdown-menu">
          <a href="../components/Login">login</a>
          <p title="profile">Log in</p>
          <input type="email" placeholder="Email address" required 
              
          />

          <input type="password" placeholder="Password" required 
              
          />

          <a href="../components/Register" title="profile">
            Sign up
          </a>
          <button type="submit">Submit</button>
          <button className="link" onClick={props.toggleTheme} title="colors">
            <VscColorMode />
            <p>theme</p>
          </button>
        </form>
        <div>
          {menu}
        </div>
        <div>
          {props.name ? 'Hi ' + props.name : 'You are not logged in'}
        </div>
      </div>
    </header>
  );
};

export default Header;