import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { VscColorMode } from "react-icons/vsc";
import { ImExit } from "react-icons/im";
import { TiUserAdd } from "react-icons/ti";
import { RiUserFollowFill } from "react-icons/ri";


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

  if (!props.name) {
    menu = (
        <ul>
          <li>
            < RiUserFollowFill size={20}/>
            <Link to="/components/login">Login</Link>
          </li>
          <li>
            < TiUserAdd size={23}/>
            <Link to="/components/Register">Sign up</Link>
          </li>
        </ul>
    )
  } else {
    menu = (
        <ul>
          <button
            className="link"
            onClick={(e) => {
              e.preventDefault(); // Prevent default form submission behavior
              props.toggleTheme();
            }}
            title="colors"
          >
            <VscColorMode />
            <p>theme</p>
          </button>
          <li>
            <ImExit size={19}/>
            <Link to="/components/login" onClick={logout}>Logout</Link>
          </li>
        </ul>
    )
  }

  let profile;
  if (props.name) {
    const baseUrl = "http://127.0.0.1:8000";  // Adjust this to your Django backend's base URL
    const profilePicturePath = "media/user_images/profile.jpeg";  // Replace with the actual path from your database
    const profilePictureUrl = `${baseUrl}/${profilePicturePath}`;
    profile = <img src={profilePictureUrl} alt="profile" title="profile" />;
  } else {
    profile = <BiUserCircle title="user options" />;
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
          {profile}
        </button>

        <form className="dropdown-menu">
          <div>
            {props.name ? 'Hi ' + props.name : ''}
          </div>

          <div>
            {menu}
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;