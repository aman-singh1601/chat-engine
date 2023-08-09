import "./App.css";
import { useState, useEffect } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import Chats from "./components/Pages/Chats";

function App() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("profile")) {
      setUser(true);
    } else setUser(false);
  }, [localStorage]);
  console.log("app_user", user);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={!user ? <HomePage /> : <Navigate to="/chats" />}
          />
          <Route
            path="/chats"
            element={user ? <Chats /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
