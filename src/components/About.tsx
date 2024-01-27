import React, { useEffect, useRef } from "react";
import { BsClockHistory } from "react-icons/bs";
import { TbStretching } from "react-icons/tb";
import { BiDollar } from "react-icons/bi";
import { SlTrophy } from "react-icons/sl";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import Footer from "./footer";
import ThreeCanvas from "./ThreeCanvas";
import transition from "./transition";

interface ThemeProps {
  theme: string;
}

function Home({ theme }: ThemeProps) {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    });

    // Ensure elements are available and observe them
    const hiddenElements = document.querySelectorAll(".hidden, .hiddenbottom");
    if (hiddenElements.length === 0) {
      console.log("No elements to observe");
    }
    hiddenElements.forEach((el) => observer.observe(el));

    const container = containerRef.current;
    const numberOfSections = container ? (container as HTMLElement).children.length : 0;

    let sectionIndex = 0;

    const interval = setInterval(() => {
      if (container) {
        const scrollPosition = sectionIndex * (container as HTMLElement).clientWidth;
        (container as HTMLElement).scrollLeft = scrollPosition;

        sectionIndex = (sectionIndex + 1) % numberOfSections;
      }
    }, 3000); // Change every 3000 milliseconds (3 seconds)

    return () => {
      clearInterval(interval); // Clear the interval
      hiddenElements.forEach((el) => observer.unobserve(el)); // Unobserve the elements
      observer.disconnect(); // Disconnect the observer
    };
  }, []);

  useEffect(() => {
    const videoElement = document.querySelector(".home > video") as HTMLVideoElement | null;
    if (videoElement) {
      if (theme === "dark") {
        videoElement.style.filter = "hue-rotate(217deg) saturate(20%)";
      } else {
        videoElement.style.filter = "saturate(20%)"; // Replace with the desired filter for the light theme
      }
    }
  }, [theme]);

  return (
    <>
      <main className="home">
        <video autoPlay playsInline muted loop>
          <source src="/advertisement.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <a href="#about" title="about">
          ?
        </a>
        <div>
          <Link to="/components/Home">Text -&gt; 3D!</Link>
        </div>
        <section className="hidden">
          Meet Generlate, <br />a text to object generator. Your words - our
          magic.
        </section>
        <section className="hidden">
          <ul>
            <li>
              <p>
                Say goodbye to the grind. Type. don't model. Effortlessly create
                objects from your text, at the speed of sound.
              </p>
              <h3>
                Insanely
                <br />
                Fast
              </h3>
              <p>
                <BsClockHistory />
              </p>
            </li>
            <li>
              <p>
                Perfect for games, architecture, marketing - flexibility like
                never before.
              </p>
              <h3>
                Highly
                <br />
                Versatile
              </h3>
              <p>
                <TbStretching />
              </p>
            </li>
            <li>
              <p>Turbocharge your productivity. Slash costs.</p>
              <h3>
                Greater
                <br />
                Efficiency
              </h3>
              <p>
                <BiDollar />
              </p>
            </li>
            <li>
              <p>Compete at the top with stunning AI-powered 3D models.</p>
              <h3>
                Stay
                <br />
                Ahead
              </h3>
              <p>
                <SlTrophy />
              </p>
            </li>
          </ul>
        </section>
        <section>
          <div className="hiddenbottom">
            <div>
              <ThreeCanvas modelPath="/box_1.obj" theme={theme} />
            </div>
            <p>A tall cube</p>
          </div>

          <div className="hiddenbottom">
            <div>
              <ThreeCanvas modelPath="/box_2.obj" theme={theme} />
            </div>
            <p>A cube</p>
          </div>

          <div className="hiddenbottom">
            <div>
              <ThreeCanvas modelPath="/box_3.obj" theme={theme} />
            </div>
            <p>A thin cube</p>
          </div>
        </section>
        <section ref={containerRef} id="about" className="hiddenbottom">
          <div>
            <div>
              <h3>Editable:</h3>
              <p>reduce polygons, change texture or increase resolution</p>
            </div>
            <img src="/cubes.webp" alt="cubes"></img>
          </div>

          <div>
            <div>
              <h3>Multimodal:</h3>
              <p>generate models or textures</p>
            </div>
            <img src="/textures.webp" alt="textures"></img>
          </div>

          <div>
            <div>
              <h3>History:</h3>
              <p>models and prompts are recorded</p>
            </div>
            <ol>
              <li>
                <FiMessageSquare /> &nbsp;&nbsp;&nbsp;past generations
              </li>
              <li>
                <FiMessageSquare /> &nbsp;&nbsp;&nbsp;A tall cube
              </li>
              <li>
                <FiMessageSquare /> &nbsp;&nbsp;&nbsp;A cube
              </li>
              <li>
                <FiMessageSquare /> &nbsp;&nbsp;&nbsp;A thin cube
              </li>
              <li>
                <FiMessageSquare /> &nbsp;&nbsp;&nbsp;etc.
              </li>
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default transition(Home);
