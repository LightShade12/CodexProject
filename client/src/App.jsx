import "./App.css";
//modules
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import AuthenticationPage from "./components/AuthenticationPage";
import FormBuilderPage from "./components/FormBuilderPage";

//===============================================================
/*
TODO: forgor 💀
*/
var deploy = false;
const SERVER_ADDR = deploy
  ? "https://codexproject-k7m5.onrender.com"
  : "http://localhost:3000";

function App() {
  return (
    <BrowserRouter>
      <div style={{ border: "solid black 5px" }}>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Login/Signup</NavLink>
            </li>
            <li>
              <NavLink to="/form-builder">Form Builder</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />
        <Route path="/form-builder" element={<FormBuilderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
