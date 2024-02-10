import React, { useState } from "react";
import { BiSolidMicrophoneAlt } from "react-icons/bi";
import ThreeCanvas from "./ThreeCanvas";
import transition from "./transition";
import { TbMessage2Up } from "react-icons/tb";

const Home = (props: { name: string, theme: string  }) => {
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [model, setModel] = useState("/box_4.obj");

  function handleDownloadClick() {
    const a = document.createElement("a");
    a.href = model;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function handleInputClick() {
    const input = document.getElementById("generationbar");

    if (input instanceof HTMLInputElement) {

      fetch("https://api.generlate.com/api/user-data", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            // If user data is undefined or the response status is not 200, treat it as a not logged in user
            throw new Error('User not logged in');
          }
        })
        .then((data) => {
          const generatedObjectPath = '/' + data.generated_object_file_path;
          setModel(generatedObjectPath);
          setShowDownloadButton(true);

          const inputText = input.value;
          const newParagraph = document.createElement("p");
          newParagraph.textContent = inputText;

          const targetSection = document.querySelector("section:nth-of-type(2) div:first-of-type");

          if (targetSection instanceof HTMLElement) {
            targetSection.appendChild(newParagraph);
          }

          input.value = "";
        })
        .catch((error) => {
          // If an error occurs or user data is undefined, treat it as a not logged in user and set default model path
          console.error("Error:", error);
          const defaultModelPath = '/default-model.obj';
          setModel(defaultModelPath);
          setShowDownloadButton(true);
        });
    }
  }

  function enterKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleInputClick();
    }
  }

  return (
    <main className="home">
      <div>
        <p>?</p>
        <section>
          {showDownloadButton && (
            <>
              <button onClick={handleDownloadClick}>Download</button>
              <ThreeCanvas modelPath={model} theme={props.theme} />
            </>
          )}
        </section>

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
              <TbMessage2Up />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default transition(Home);
