import Mainpage from "./components/Mainpage/mainpage";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
