import "./App.css";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import Home from "./components/Home/Home.jsx";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { Routes, Route } from "react-router-dom";
import NavbarAdmin from "./components/Navbar/NavbarAdmin";
import { Customer } from "./components/Users/Customer/Customer";
import { Admin } from "./components/Users/Admin/Admin";
import { CreateAdminForm } from "./components/Users/Admin/CreateAdminForm";
import { UpdateAdminForm } from "./components/Users/Admin/UpdateAdminForm";
import Pedidos from "./components/Pedidos/Pedidos";
import Products from "./components/Products/Products";

function App() {
  return (
    <>
      <NavbarAdmin />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/registro" element={<Register />} />
        <Route exact path="/clientes" element={<Customer />} />
        <Route exact path="/administradores" element={<Admin />} />
        <Route
          exact
          path="/administradores/crear"
          element={<CreateAdminForm />}
        />
        <Route
          exact
          path="/administradores/actualizar/:id"
          element={<UpdateAdminForm />}
        />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/productos" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
