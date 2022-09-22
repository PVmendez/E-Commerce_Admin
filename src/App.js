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
import CreateProduct from "./components/CreateProduct/CreateProduct";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <NavbarAdmin />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route exact path="/login" element={<Login />} />
        {/* <Route exact path="/registro" element={<Register />} /> */}
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/clientes"
          element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/administradores"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/administradores/crear"
          element={
            <ProtectedRoute>
              <CreateAdminForm />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/administradores/actualizar/:id"
          element={
            <ProtectedRoute>
              <UpdateAdminForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pedidos"
          element={
            <ProtectedRoute>
              <Pedidos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productos"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productos/crear"
          element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
