import './App.css';
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Home } from "./components/Home/Home";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import Pedidos from "./components/Pedidos/Pedidos";
import { Routes, Route } from "react-router-dom";
import NavbarAdmin from "./components/Navbar/NavbarAdmin";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <NavbarAdmin />
      <Sidebar />
      <Routes>
        
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/registro" element={<Register />} />
        <Route path="/pedidos" element={<Pedidos />} />
    </Routes>
  </>
  );
}

export default App;
