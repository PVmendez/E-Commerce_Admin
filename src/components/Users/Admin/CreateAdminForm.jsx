import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../Navbar/NavbarAdmin";

export const CreateAdminForm = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const adminStore = useSelector((state) => state.admin[0]);
  const inputHandle = (e) => {
    let { name, value } = e.target;
    let newUser = { ...user, [name]: value };
    setUser(newUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createAdmin = async () => {
      const result = await axios({
        method: "POST",
        baseURL: process.env.REACT_APP_API_BASE_URL,
        url: `/users/register`,
        data: { user: user },
        headers: {
          Authorization: `Bearer ${adminStore.token}`,
        },
      });
      if (result.data.error) {
        return navigate("/login");
      }
      return navigate("/administradores");
    };
    createAdmin();
  };

  return (
    <>
      <NavbarAdmin />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-6 text-center justify-content-center">
            <h1 className="font-weight-bold mb-3">Crea una cuenta</h1>
            <p className="text-muted mb-5">
              Ingresa la siguiente información para registrar el usuario.
            </p>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-row mb-2">
                <div className="form-group col-mb-3">
                  <label className="font-weight-bold d-block">
                    Nombre <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control-admin border mb-3"
                    placeholder="Tu nombre"
                    name="firstname"
                    value={user.firstname}
                    onChange={inputHandle}
                    required
                  />
                </div>
                <div className="form-group col-mb-3">
                  <label className="font-weight-bold d-block ">
                    Apellido <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control-admin border mb-3"
                    placeholder="Tu apellido"
                    name="lastname"
                    value={user.lastname}
                    onChange={inputHandle}
                    required
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label className="font-weight-bold d-block">
                  Correo electrónico <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control-admin border mb-3"
                  placeholder="Ingresa tu correo electrónico"
                  name="email"
                  value={user.email}
                  onChange={inputHandle}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label className="font-weight-bold d-block ">
                  Contraseña <span className="text-danger ">*</span>
                </label>
                <input
                  type="password"
                  className="form-control-admin border mb-3"
                  placeholder="Ingresa una contraseña"
                  name="password"
                  value={user.password}
                  onChange={inputHandle}
                  required
                />
              </div>
              <div className="form-group mb-5">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" />
                  <label className="form-check-label text-muted">
                    Al seleccionar esta casilla aceptas nuestro aviso de
                    privacidad y los términos y condiciones
                  </label>
                </div>
              </div>
              <button type="submit" className="btn-form btn-primary width-100">
                Crear
              </button>
              <button
                type="button"
                className="btn-form btn-primary width-100"
                onClick={() => navigate(-1)}
              >
                Volver
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
