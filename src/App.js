import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavbarAdmin from "./components/Navbar/NavbarAdmin";
import Sidebar from "./components/Sidebar/Sidebar";
import Pedidos from "./components/Pedidos/Pedidos";
import Home from "./components/Home";

function App() {
  return (
    <>
      <NavbarAdmin />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
    </>
  );
}

export default App;
