import React, { useState, useEffect, SyntheticEvent } from "react";
import { BiUserCircle } from "react-icons/bi";
import { Link, Navigate } from "react-router-dom";
import { VscColorMode } from "react-icons/vsc";

interface HeaderProps {
  toggleTheme: () => void;
  theme: string;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, theme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password
      })
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
        });
        
        const content = await response.json();

        setName(content.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    }, []);
  


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

        <form className="dropdown-menu" onSubmit={submit}>
          <p title="profile">Log in</p>
          <input type="email" placeholder="Email address" required 
              onChange={e => setEmail(e.target.value)}
          />

          <input type="password" placeholder="Password" required 
              onChange={e => setPassword(e.target.value)}
          />

          <a href="../components/Register" title="profile">
            Sign up
          </a>
          <button type="submit">Submit</button>
          <button className="link" onClick={toggleTheme} title="colors">
            <VscColorMode />
            <p>theme</p>
          </button>
        </form>
        <div>
          {name ? 'Hi ' + name : 'You are not logged in'}
        </div>
      </div>
    </header>
  );
}

export default Header;