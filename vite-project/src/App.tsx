import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import Chats from "./components/Pages/chats";

function App() {
  const user = JSON.parse(localStorage.getItem("profile") || "{}");
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
