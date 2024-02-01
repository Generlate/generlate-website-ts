import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { VscColorMode } from "react-icons/vsc";
import { ImExit } from "react-icons/im";
import { TiUserAdd } from "react-icons/ti";
import { RiUserFollowFill } from "react-icons/ri";


const Header = (props: { useTheme: (arg: string) => void, theme:string , name: string, setName: (name: string) => void }) => {
  
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
    setProfilePicture(null);
  }


  let [profilePicture, setProfilePicture] = useState<string | null>(null);
  let [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);

  useEffect(() => {
  // This code block will run when profilePicture state changes
  if (profilePictureFile) {
    console.log(profilePictureFile);
    console.log(profilePictureFile.name);

    // Assuming you want to perform some action with the uploaded picture
    // For example, you can send the picture to the server here
    const formData = new FormData();
    formData.append('user_image', profilePictureFile);

    // Replace the URL with your actual server endpoint
    fetch('http://localhost:8000/api/upload-user-images', {
      method: 'PUT',
      body: formData,
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        // Handle the server response if needed
        console.log('Server response:', data);
      })
      .catch(error => {
        // Handle the error
        console.error('Error uploading profile picture:', error);
      });
  }
}, [profilePictureFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    console.log('Selected file:', file);
    if (file) {
      setProfilePictureFile(file);
      setProfilePicture(URL.createObjectURL(file));
    }
  };


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
              props.useTheme('dark');
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
              accept=".jpg, .jpeg, .png, .gif" // Specify allowed file types
              onChange={handleFileChange}
            />
          </div>

          <li>
            <ImExit size={19}/>
            <Link to="/components/login" onClick={logout}>Logout</Link>
          </li>

        </ul>
    )
  }

  let profile: React.ReactNode = <BiUserCircle size={34} title="user options" />;
  if (props.name) {
    fetch('http://localhost:8000/api/user-data', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // Check if the user_image exists in the server. If it does, use it; otherwise, use the default image
        const userImage = data.user_image || '';

        const profilePictureUrl = 'http://localhost:8000' + userImage

        // Set the 'profile' variable to an <img> element with the source set to profilePictureUrl
        setProfilePicture(profilePictureUrl);
        // profile = <img src={profilePicture} alt="profile" title="profile" />;

      })
      .catch(error => {
        console.error('Error fetching user information:', error);
        // In case of an error, use the default icon
        profile = <BiUserCircle title="user options" />;
      });
  }

  if (profilePicture) {
    profile = <img src={profilePicture} alt="profile" title="profile" />;
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