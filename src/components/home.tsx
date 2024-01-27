import { BiSolidMicrophoneAlt } from "react-icons/bi";
import ThreeCanvas from "./ThreeCanvas";
import React, { useState } from "react";
import transition from "./transition";
import { useEffect } from "react";

interface ThemeProps {
  theme: string;
}

const About: React.FC<ThemeProps> = ({ theme }) => {
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  function handleDownloadClick() {
    const a = document.createElement("a");
    a.href = "/box_4.obj";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function handleInputClick() {
    const input = document.getElementById("generationbar");

    if (input instanceof HTMLInputElement) {
      const text = input.value;

      fetch("/api/your-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      setShowDownloadButton(true);

      const inputText = input.value;
      const newParagraph = document.createElement("p");
      newParagraph.textContent = inputText;

      const targetSection = document.querySelector("section:nth-of-type(2) div:first-of-type");

      if (targetSection instanceof HTMLElement) {
        targetSection.appendChild(newParagraph);
      }

      input.value = "";
    }
  }

  function enterKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleInputClick();
    }
  }



  

  return (
    <main className="generlate">
      <div>
        <p>?</p>
        <section>
          {showDownloadButton && (
            <>
              <button onClick={handleDownloadClick}>Download</button>
              <ThreeCanvas modelPath="/box_4.obj" theme={theme} />
            </>
          )}
        </section>
        {/* <div>
          {name ? 'Hi ' + name : 'You are not logged in'}
        </div> */}
        <section>
          <div></div>

          <div>
            <button title="voice input">
              <BiSolidMicrophoneAlt />
            </button>
            <input
              type="text"
              placeholder="Prompt here..."
              id="generationbar"
              onKeyDown={enterKey}
            />
            <button onClick={handleInputClick} title="text input">
              &#9650;
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default transition(About);
