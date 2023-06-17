// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing"
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import About from "./components/About/About";
import Form from "./components/Form/Form";
import Profile from "./components/Profile/Profile";
import Search from "./components/Search/Search";
import Favorite from "./components/Favorite/Favorite";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/form" element={<Form />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
