import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [data, setData] = useState({ category: "1", popular: "false" });

  const createProduct = async (data) => {
    const result = await axios({
      method: "POST",
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: `/administrators/products`,
      data: data,
    });
    return navigate("/productos");
  };
  return (
    <div className="row rowEdit">
      <Sidebar />
      <div className="col-10">
        <>
          <div className="col-6 text-center justify-content-center">
            <h1 className="font-weight-bold mb-3">Crea un producto</h1>
            <p className="text-muted mb-5">
              Ingresa la siguiente información para registrar el producto.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                createProduct(data);
              }}
            >
              <div className="form-row mb-2">
                <div className="form-group col-mb-3">
                  <input
                    type="text"
                    className="form-control-admin border mb-3"
                    placeholder="Nombre"
                    name="name"
                    required
                    onChange={(e) => {
                      setData({ ...data, name: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group col-mb-3">
                  <input
                    type="text"
                    className="form-control-admin border mb-3"
                    placeholder="Descripcion"
                    name="description"
                    onChange={(e) => {
                      setData({ ...data, description: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <input
                  type="number"
                  className="form-control-admin border mb-3"
                  placeholder="Precio"
                  name="price"
                  onChange={(e) => {
                    setData({ ...data, price: e.target.value });
                  }}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="number"
                  className="form-control-admin border mb-3"
                  placeholder="Stock"
                  name="stock"
                  onChange={(e) => {
                    setData({ ...data, stock: e.target.value });
                  }}
                />
              </div>
              <Form.Select
                aria-label="Categoria"
                className="form-group mb-3"
                onChange={(e) => {
                  setData({ ...data, category: e.target.value });
                }}
                defaultValue={"1"}
              >
                <option value="1">Classic</option>
                <option value="2">Premium</option>
              </Form.Select>
              <Form.Select
                aria-label="Destacado"
                className="form-group mb-3"
                onChange={(e) => {
                  setData({ ...data, popular: e.target.value });
                }}
                defaultValue="false"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Select>
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
        </>
      </div>
    </div>
  );
}
