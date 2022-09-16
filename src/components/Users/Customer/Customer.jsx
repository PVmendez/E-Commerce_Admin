import "./Customer.css";
import Sidebar from "../../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../User";

export const Customer = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const result = await axios({
        method: "GET",
        baseURL: process.env.REACT_APP_API_BASE_URL,
        url: `/customers`,
      });

      setUsers(result.data);
    };
    getUsers();
  }, []);

  return (
    <>
      <div className="row w-100">
        <Sidebar />
        <div className="col-10 p-0 mt-3">
          <div className="page-wrapper">
            <div className="container-fluid">
              <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                  <h3 className="text-themecolor">Usuarios</h3>
                </div>
                <div className="col-md-7 align-self-center">
                  <button
                    className="
                  btn
                  waves-effect waves-light
                  btn-success
                  float-end
                  hidden-sm-down
                "
                  >
                    Crear nuevo
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Clientes</h4>
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Email</th>
                              <th>Address</th>
                              <th>Phone</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((u) => (
                              <User users={u} key={u.id} />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
