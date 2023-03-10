import React, { useState, useEffect } from "react";
import "./App.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continious = true;
mic.interimResults = true;
mic.lang = "es-co";

function App() {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue...");
        mic.start();
      };
    } else {
      mic.stop();
      setNote("");
      mic.onend = () => {
        console.log("stopped mic onclick");
      };
    }
    mic.onstart = () => {
      console.log("mic on");
    };

    mic.onresult = (event) => {
      setNote("");
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  }, [isListening]);

  return (
    <div
      className="container"
      onClick={() => setIsListening((prevState) => !prevState)}
    >
      <p>Click to {isListening ? "disable" : "enable"} transcript...</p>
      <h1>{note}</h1>
    </div>
  );
}

export default App;
