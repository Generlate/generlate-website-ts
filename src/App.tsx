import About from "./components/About";
import Apis from "./components/Api";
import AustenCabret from "./components/Austen-cabret";
import Docs from "./components/Docs";
import Finances from "./components/Finances";
import Header from "./components/header";
import Home from "./components/home";
import Legal from "./components/Legal";
import Login from "./components/Login";
import News from "./components/News";
import Pricing from "./components/Pricing";
import Register from "./components/Register";
import Team from "./components/Team";
import React, { useEffect, useState, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export const ThemeContext = createContext({});

function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.generlate.com/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();

      setName(content.name);
    })();
  });

  let [theme, setTheme] = useState("light");
  const useTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));

    if (theme === "dark") {
      changeColorsToDark();
    } else {
      changeColorsToLight();
    }

    return { theme, useTheme };
  };

  function changeColorsToLight() {
    document.documentElement.style.setProperty(
      "--color-one",
      "rgb(250, 250, 250)",
    );
    document.documentElement.style.setProperty(
      "--color-two",
      "rgb(237, 246, 252)",
    );
    document.documentElement.style.setProperty(
      "--color-three",
      "rgb(168, 210, 216)",
    );
    document.documentElement.style.setProperty(
      "--color-four",
      "rgb(121, 161, 176)",
    );
    document.documentElement.style.setProperty(
      "--color-five",
      "rgb(88, 149, 166)",
    );
    document.documentElement.style.setProperty(
      "--color-six",
      "rgb(47, 95, 110)",
    );
    document.documentElement.style.setProperty(
      "--color-header-dropdown",
      "rgba(250, 250, 250, 0.1)",
    );
    document.documentElement.style.setProperty(
      "--footer-box-shadow",
      "0px -10px 10px 0px rgba(121, 161, 176, 0.1)",
    );
    document.documentElement.style.setProperty(
      "--color-drop-down-box-shadow",
      "rgba(25, 25, 25, 0.2)",
    );

    const videoElement = document.querySelector(
      ".about > video",
    ) as HTMLVideoElement | null;
    if (videoElement) {
      videoElement.style.filter = "saturate(20%)";
    }
  }

  function changeColorsToDark() {
    document.documentElement.style.setProperty("--color-one", "rgb(5, 5, 4)");
    document.documentElement.style.setProperty(
      "--color-two",
      "rgb(16, 16, 16)",
    );
    document.documentElement.style.setProperty(
      "--color-three",
      "rgb(77, 75, 67)",
    );
    document.documentElement.style.setProperty(
      "--color-four",
      "rgb(173, 158, 131)",
    );
    document.documentElement.style.setProperty(
      "--color-five",
      "rgb(204, 196, 174)",
    );
    document.documentElement.style.setProperty(
      "--color-six",
      "rgb(255, 232, 117)",
    );
    document.documentElement.style.setProperty(
      "--color-header-dropdown",
      "rgba(16, 16, 16, 0.1)",
    );
    document.documentElement.style.setProperty(
      "--footer-box-shadow",
      "0px -10px 10px 0px rgba(77, 75, 67, 0.05)",
    );
    document.documentElement.style.setProperty(
      "--color-drop-down-box-shadow",
      "rgba(230, 230, 230, 0.2)",
    );
  }

  if (theme) {
    fetch("https://api.generlate.com/api/user-data", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const userColorTheme = data.user_color_theme || "light";

        setTheme(userColorTheme);
        if (userColorTheme === "dark") {
          changeColorsToDark();
        } else {
          changeColorsToLight();
        }
      })
      .catch((error) => {
        console.error("Error fetching user information:", error);
        theme = "light";
      });
  }

  return (
    <ThemeContext.Provider value={{ theme, useTheme }}>
      <div className={`app ${theme}`}>
        <Header
          useTheme={useTheme}
          theme={theme}
          name={name}
          setName={setName}
        />
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={<Home name={name} setName={setName} theme={theme} />}
            />
            <Route path="/components/About" element={<About theme={theme} />} />
            <Route path="/components/Api" element={<Apis />} />
            <Route
              path="/components/Austen-cabret"
              element={<AustenCabret />}
            />
            <Route path="/components/Docs" element={<Docs />} />
            <Route path="/components/Finances" element={<Finances />} />
            <Route path="/components/Legal" element={<Legal />} />
            <Route
              path="/components/Login"
              element={<Login setName={setName} />}
            />
            <Route path="/components/News" element={<News />} />
            <Route path="/components/Pricing" element={<Pricing />} />
            <Route path="/components/Register" element={<Register />} />
            <Route path="/components/Team" element={<Team />} />
          </Routes>
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

//TODO: make footer dropdown menu 2 and 3 centered on footer word
//TODO: fix box shadow not interacting with canvas js correctly.
//TODO: fix dropdown menu width on mobile
//TODO: add Next.js
//TODO: add styleX
//TODO: make voice input button work (npm install react-speech-recognition)
//TODO: better background gradient
//TODO: add up arrows on footer buttons on desktop
//TODO: maybe move header inside pages and turn background color invisible on generlate page. keep header width inside the 50%. remove color from canvas. (might need to figure out with home page canvases)
//TODO: change UI so that text input is on top of canvas and canvas is the entire page.
//TODO: fix arrow icons not working on meta quest browser
//TODO: make all pages work on ipad and mobile (normal browser, not app view)
//TODO: add sphere with flat bottom to canvas scenes so objects can cast shadow and xyz indicator
//TODO: polish
//TODO: add search bar, add search bar functionality (probably not worthwhile. should just be a part of the text input, which can answer questions or provide links)
//TODO: make the 'text to 3d' button have that glossy blurred look
//TODO: better icons? (maybe not worth the time. try 'https://feathericons.com/', 'https://heroicons.dev/')
//TODO: refine sub pages
//TODO: add Auth0 and/or SSO and/or faceid
//TODO: include a Benefits section and a Use Cases section on About.tsx
