import Apis from "./components/Api";
import AustenCabret from "./components/Austen-cabret";
import Docs from "./components/Docs";
import Generlate from "./components/home";
import Header from "./components/header";
import Home from "./components/About";
import Finances from "./components/Finances";
import Legal from "./components/Legal";
import News from "./components/News";
import Pricing from "./components/Pricing";
import Team from "./components/Team";
import React, { useState, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export const ThemeContext = createContext({});

const useTheme = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));

    if (theme === "dark") {
      document.documentElement.style.setProperty(
        "--color-one",
        "rgb(250, 250, 250)"
      );
      document.documentElement.style.setProperty(
        "--color-two",
        "rgb(237, 246, 252)"
      );
      document.documentElement.style.setProperty(
        "--color-three",
        "rgb(168, 210, 216)"
      );
      document.documentElement.style.setProperty(
        "--color-four",
        "rgb(121, 161, 176)"
      );
      document.documentElement.style.setProperty(
        "--color-five",
        "rgb(88, 149, 166)"
      );
      document.documentElement.style.setProperty(
        "--color-six",
        "rgb(47, 95, 110)"
      );
      document.documentElement.style.setProperty(
        "--color-header-dropdown",
        "rgba(250, 250, 250, 0.1)"
      );
      document.documentElement.style.setProperty(
        "--footer-box-shadow",
        "0px -10px 10px 0px rgba(121, 161, 176, 0.1)"
      );
      document.documentElement.style.setProperty(
        "--color-drop-down-box-shadow",
        "rgba(25, 25, 25, 0.2)"
      );

      const videoElement = document.querySelector(".home > video") as HTMLVideoElement | null;
      if (videoElement) {
        videoElement.style.filter = "saturate(20%)";
      }
    } else {
      document.documentElement.style.setProperty("--color-one", "rgb(5, 5, 4)");
      document.documentElement.style.setProperty(
        "--color-two",
        "rgb(16, 16, 16)"
      );
      document.documentElement.style.setProperty(
        "--color-three",
        "rgb(77, 75, 67)"
      );
      document.documentElement.style.setProperty(
        "--color-four",
        "rgb(173, 158, 131)"
      );
      document.documentElement.style.setProperty(
        "--color-five",
        "rgb(204, 196, 174)"
      );
      document.documentElement.style.setProperty(
        "--color-six",
        "rgb(255, 232, 117)"
      );
      document.documentElement.style.setProperty(
        "--color-header-dropdown",
        "rgba(16, 16, 16, 0.1)"
      );
      document.documentElement.style.setProperty(
        "--footer-box-shadow",
        "0px -10px 10px 0px rgba(77, 75, 67, 0.05)"
      );
      document.documentElement.style.setProperty(
        "--color-drop-down-box-shadow",
        "rgba(230, 230, 230, 0.2)"
      );
    }
  };

  return { theme, toggleTheme };
};

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme } }>
      <div className={`app ${theme}`}>
        <Header toggleTheme={toggleTheme} theme={theme} />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Generlate theme={theme} />} />
            <Route path="/components/Api" element={<Apis />} />
            <Route
              path="/components/Austen-cabret"
              element={<AustenCabret />}
            />
            <Route path="/components/Docs" element={<Docs />} />
            <Route
              path="/components/Generlate"
              element={<Generlate theme={theme} />}
            />
            <Route path="/components/Home" element={<Home theme={theme} />} />
            <Route path="/components/Finances" element={<Finances />} />
            <Route path="/components/Legal" element={<Legal />} />
            <Route path="/components/News" element={<News />} />
            <Route path="/components/Pricing" element={<Pricing />} />
            <Route path="/components/Team" element={<Team />} />
          </Routes>
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

//TODO: add visitor tally / google analytics
//TODO: make all pages work on ipad and mobile (normal browser, not app view)
//TODO: add Auth0 logins / user login and profiles (jwt auth)
//TODO: build a django backend
//TODO: make user profiles work
//TODO: add user_input history
//TODO: add Next.js
//TODO: add styleX
//TODO: better background gradient
//TODO: add up arrows on footer buttons on desktop
//TODO: maybe move header inside pages and turn background color invisible on generlate page. keep header width inside the 50%. remove color from canvas. (might need to figure out with home page canvases)
//TODO: fix arrow icons not working on meta quest browser
//TODO: host django on azure server (maybe time to check out aws)
//TODO: set up azure CI/CD to get local updates quickly to the server
//TODO: add sphere with flat bottom to canvas scenes so objects can cast shadow and xyz indicator
//TODO: polish
//TODO: add search bar, add search bar functionality
//TODO: make the 'text to 3d' button have that glossy blurred look
//TODO: refine sub pages