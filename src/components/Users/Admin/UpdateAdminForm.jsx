import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateAdminForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const userStore = useSelector((state) => state.user[0]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getAdmin = async () => {
      const result = await axios({
        method: "GET",
        baseURL: process.env.REACT_APP_API_BASE_URL,
        url: `/administrators/${id}`,
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      if (result.data.error) {
        return navigate("/login");
      } 
      setUser(result.data);
      
    };
    getAdmin();
  }, [id, userStore.token, navigate]);

  const inputHandle = (e) => {
    let { name, value } = e.target;
    let newUser = { ...user, [name]: value };
    setUser(newUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateAdmin = async () => {
      const result = await axios({
        method: "PATCH",
        baseURL: process.env.REACT_APP_API_BASE_URL,
        url: `/administrators/update/${id}`,
        data: user,
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });

      return navigate("/administradores");
    };
    updateAdmin();
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-6 text-center justify-content-center">
            <h1 className="font-weight-bold mb-3">Actualizar</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-row mb-2">
                <div className="form-group col-mb-3">
                  <label className="font-weight-bold">
                    Nombre <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control-admin border mb-3"
                    placeholder="Tu nombre"
                    name="firstName"
                    value={user.firstName}
                    onChange={inputHandle}
                    required
                  />
                </div>
                <div className="form-group col-mb-3">
                  <label className="font-weight-bold ">
                    Apellido <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control-admin border mb-3"
                    placeholder="Tu apellido"
                    name="lastName"
                    value={user.lastName}
                    onChange={inputHandle}
                    required
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label className="font-weight-bold">
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
                <label className="font-weight-bold ">
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
                Actualizar
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
