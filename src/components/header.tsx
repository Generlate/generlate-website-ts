import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { VscColorMode } from "react-icons/vsc";
import { ImExit } from "react-icons/im";
import { TiUserAdd } from "react-icons/ti";
import { RiUserFollowFill } from "react-icons/ri";


const Header = (props: { useTheme: (arg: string) => void, theme:string , name: string, setName: (name: string) => void }) => {
  
  const logoImageSrc =
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


  let [profilePicture, setProfilePicture] = useState<string | null>(null);
  let [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);

  useEffect(() => {
    if (profilePictureFile) {

      const formData = new FormData();
      formData.append('user_image', profilePictureFile);

      fetch('https://generlate.azurewebsites.net/api/upload-user-images', {
        method: 'PUT',
        body: formData,
        credentials: 'include',
        mode: 'no-cors',
      })
        .then(response => response.json())
        .catch(error => {
          console.error('Error uploading profile picture:', error);
        });
    }
  }, [profilePictureFile]);

  const changePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) {
      setProfilePictureFile(file);
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const switchTheme = () => {
      let newTheme = props.theme === "light" ? "dark" : "light";

      const formData = new FormData();
      formData.append('user_color_theme', newTheme);

      fetch('https://generlate.azurewebsites.net/api/update-user-color-theme', {
          method: 'PUT',
          body: formData,
          credentials: 'include',
          mode: 'no-cors',
        })
          .then(response => response.json())
          .then(data => {
            props.useTheme(newTheme);
          })
          .catch(error => {
            console.error('Error updating color theme:', error);
          });
  };


  const logout = async () => {
    await fetch("https://generlate.azurewebsites.net/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        mode: 'no-cors',
    });

    props.setName('');
    setProfilePicture(null);
  }


  let profile: React.ReactNode = <BiUserCircle size={34} title="user options" />;
  if (props.name) {
    fetch('https://generlate.azurewebsites.net/api/user-data', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
    })
      .then(response => response.json())
      .then(data => {
        const userImage = data.user_image || '';

        const profilePictureUrl = 'https://generlate.azurewebsites.net' + userImage

        setProfilePicture(profilePictureUrl);

      })
      .catch(error => {
        console.error('Error fetching user information:', error);
        profile = <BiUserCircle title="user options" />;
      });
  }

  if (profilePicture) {
    profile = <img src={profilePicture} alt="profile" title="profile" />;
  } 


  let menu; 

  if (!props.name) {
    menu = (
        <ul>
          <li>
            < RiUserFollowFill size={20}/>
            <Link to="/components/login">Sign in</Link>
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
              e.preventDefault(); 
              switchTheme();
            }}
            title="colors"
          >
            <VscColorMode />
            <p>theme</p>
          </button>

          <div>
            <BiUserCircle size={19} />
            <input
              type="file"
              accept=".jpg, .jpeg, .png, .gif" 
              onChange={changePicture}
            />
          </div>

          <li>
            <ImExit size={19}/>
            <Link to="/components/login" onClick={logout}>Logout</Link>
          </li>

        </ul>
    )
  }



  return (
    <header>
      <Link to="/components/About">
        <img src={logoImageSrc} alt="Generlate logo" title="home" />
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