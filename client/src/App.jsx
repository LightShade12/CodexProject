import { useState, useEffect } from "react";
import "./App.css";
import "./components/StarterContent.jsx";
//modules
import "bootstrap/dist/css/bootstrap.min.css";
import StarterContent from "./components/StarterContent.jsx";
//===============================================================

const SERVER_ADDR = "http://localhost:3000";

function App() {
  const [message, setMessage] = useState("default message");
  const [server_message, setServerMessage] = useState(
    "Default frontend message"
  );
  const [name, setName] = useState("");

  //================================================================================================

  useEffect(() => {
    const updateServerMessage = async () => {
      try {
        const response = await fetch(SERVER_ADDR + "/api/get-server-message");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response from the backend
        setServerMessage(data.msg);
      } catch (error) {
        console.error("Could not fetch message:", error);
        setServerMessage("Error fetching message from backend");
      } finally {
        return () => {
          console.log("cleaned up");
        }; //cleanup func
      }
    };
    updateServerMessage();
  }, []);

  //================================================================================================================

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    setMessage(""); // Clear any previous messages

    try {
      const response = await fetch(SERVER_ADDR + "/api/check-user", {
        // Backend API endpoint
        method: "POST", // Send data using POST request
        headers: {
          "Content-Type": "application/json", // Tell server we're sending JSON
        },
        body: JSON.stringify({ name: name }), // Send the name in the request body as JSON
      });

      if (!response.ok) {
        // If response status is not in the success range (2xx)
        if (response.status === 404) {
          // Check for 404 Not Found specifically
          setMessage("User not found."); // Set message to display "User not found"
        } else {
          // For other errors, display a generic error message and log details
          const errorData = await response.json(); // Try to get error details from backend
          const errorMessage =
            errorData.error || `HTTP error! status: ${response.status}`; // Use backend error or generic
          setMessage(`Error checking user: ${errorMessage}`);
          console.error("Error checking user:", errorMessage, errorData);
        }
      } else {
        // If response is OK (user found - in this example, we're just checking existence)
        const userData = await response.json(); // You could get user data back if needed
        setMessage(`User "${userData.userName}" found!`); // Example success message (adjust as needed)
        // Here you might want to do something else upon successful user find,
        // like redirect to a user profile page, etc.
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("Error contacting server."); // Generic error message for network or fetch issues
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  //RENDER================================================================================================================

  return (
    <div className="App container-fluid">
      <h1 className="display-1">Backend says: {server_message}</h1>
      {/*------------------------------------------------*/}
      <h1 className="display-6">Check User Existence</h1>
      <form id="user-check-form" onSubmit={handleSubmit}>
        <label
          htmlFor="name-input"
          style={{ fontWeight: "bold", marginRight: "10px" }}
        >
          Name:
        </label>
        <input
          type="text"
          id="name-input"
          placeholder="Enter name"
          value={name}
          onChange={handleNameChange}
        />
        <br />
        <button style={{ margin: "20px 10px 20px 0px" }} type="submit">
          Check User
        </button>
        <button type="reset">Reset</button>
      </form>
      {message && <p>{message}</p>} {/* Display message if it exists */}
      <StarterContent />
    </div>
  );
}

export default App;
