import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavbarAdmin from "./components/Navbar/NavbarAdmin";
import Pedidos from "./components/Pedidos/Pedidos";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";

function App() {
  return (
    <>
      <NavbarAdmin />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/productos" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
