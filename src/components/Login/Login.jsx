import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../Redux/userSlice/adminSlice";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin[0]);
  const inputHandle = (e) => {
    let { name, value } = e.target;
    let newUser = { ...user, [name]: value };
    setUser(newUser);
  };
  useEffect(() => {
    if (adminState) {
      navigate("/");
    } else {
      return;
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const getUserLogin = async () => {
      const result = await axios({
        method: "POST",
        baseURL: process.env.REACT_APP_API_BASE_URL,
        url: `/users/login`,
        data: { user: user },
      });
      console.log(result.data);
      dispatch(loginAdmin(result.data));
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
              <span className="text-2">Credenciales:</span>
              <span className="text-2">
                Email: admin@admin - Password: admin
              </span>
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
                  <div className="button input-box">
                    <input type="submit" value="Iniciar Sesión" />
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
