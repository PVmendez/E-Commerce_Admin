import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/userSlice/userSlice";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputHandle = (e) => {
    let { name, value } = e.target;
    let newUser = { ...user, [name]: value };
    setUser(newUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const getUserLogin = async () => {
      const result = await axios({
        method: "POST",
        baseURL: process.env.REACT_APP_API_BASE_URL,
        url: `/users/login`,
        data: { user: user },
      });

      dispatch(login(result.data));
      result ? navigate("/") : navigate("/register");
    };
    getUserLogin();
  };

  return (
    <div className="login">
      <div className="container-login">
        <div className="cover">
          <div className="front">
            <div className="text">
              <span className="text-1">ADMIN</span>
              <span className="text-2"></span>
            </div>
          </div>
          <div className="back">
            <div className="text">
              <span className="text-1">
                Complete miles of journey <br /> with one step
              </span>
              <span className="text-2">Let's get started</span>
            </div>
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            <div className="login-form">
              <div className="title">Login</div>
              <form className="login_form" onSubmit={(e) => handleSubmit(e)}>
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={user.email}
                      onChange={inputHandle}
                      required
                    />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={user.password}
                      onChange={inputHandle}
                      required
                    />
                  </div>
                  <div className="text">
                    <Link to="#">Olvidaste tu contraseña?</Link>
                  </div>
                  <div className="button input-box">
                    <input type="submit" value="Iniciar Sesión" />
                  </div>
                  <div className="text sign-up-text">
                    ¿Todavía no tienes cuenta?{" "}
                    <Link to="/registro">Registrate</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
