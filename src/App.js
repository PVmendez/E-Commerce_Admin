import './App.css';
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Home } from "./components/Home/Home";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { Routes, Route } from "react-router-dom";
import NavbarAdmin from "./components/Navbar/NavbarAdmin";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <NavbarAdmin />
      <Sidebar />
      <Routes>
        
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/registro" element={<Register />} />
    </Routes>
    </div>
  );
}

export default App;
