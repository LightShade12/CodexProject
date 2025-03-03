import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const [msg, setMsg] = useState("Initial Frontend Message");

  useEffect(() => {
    // useEffect hook runs after the component renders
    const fetchMessage = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/message"); // Make the fetch request to your backend
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); // Handle potential errors
        }
        const data = await response.json(); // Parse the JSON response from the backend
        setMsg(data.msg); // Update the msg state with the message from the backend
      } catch (error) {
        console.error("Could not fetch message:", error);
        setMsg("Error fetching message from backend"); // Handle error case in UI
      }
    };

    fetchMessage(); // Call the async fetch function
  }, []); // The empty dependency array `[]` means this useEffect runs only once after the initial render

  return (
    <div className="App">
      <h1>Backend says: {msg}</h1>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
