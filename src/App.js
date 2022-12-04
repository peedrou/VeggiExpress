import Mainpage from "./components/Mainpage/mainpage";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Dashboard from "./components/Dashboard/dashboard";
import OrderOnce from "./components/Orderonce/orderOnce";
import OrderMonth from "./components/Ordermonth/orderMonth";
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order_once" element={<OrderOnce />} />
          <Route path="/order_month" element={<OrderMonth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
