import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./Products.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import NavbarAdmin from "../Navbar/NavbarAdmin";

export default function Products() {
  const [products, setProducts] = useState([]);
  const adminStore = useSelector((state) => state.admin[0]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getProducts = async () => {
      const result = await axios({
        method: "GET",
        baseURL: process.env.REACT_APP_API_BASE_URL,
        url: "/administrators/products",
        headers: {
          Authorization: `Bearer ${adminStore.token}`,
        },
      });
      if (result.data.error) {
        return navigate("/login");
      }
      setProducts(result.data.products);
    };
    getProducts();
  }, [adminStore.token, navigate]);

  const updateProduct = async (id, e) => {
    const form = new FormData();
    form.append(e.target[0].name, e.target[0].value);
    form.append(e.target[1].name, e.target[1].value);
    if (image) {
      form.append("image", image);
    }
    form.append(e.target[3].name, e.target[3].value);
    form.append(e.target[4].name, e.target[4].value);
    form.append(e.target[5].name, e.target[5].value);
    form.append(e.target[6].name, e.target[6].value);
    form.append("id", id);
    const result = await axios({
      method: "PATCH",
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: "/administrators/products",
      data: form,
      headers: {
        Authorization: `Bearer ${adminStore.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const deleteProduct = async (id) => {
    const result = await axios({
      method: "DELETE",
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: `/administrators/products/${id}`,
      headers: {
        Authorization: `Bearer ${adminStore.token}`,
      },
    });
    console.log(result);
  };
  const showAlert = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Estas eliminando el producto de la base de datos, no podrás revertirlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b0aaa9",
      cancelButtonColor: "#8a7357",
      cancelButtonText: "No, cancelar",
      confirmButtonText: "Si, estoy seguro",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Swal.fire({
          title: "Eliminado",
          text: "El producto ha sido eliminado",
          icon: "success",
          showConfirmButton: false,
        });
      }
    });
  };
  return (
    <>
      <NavbarAdmin />
      <div className="row rowEdit">
        <Sidebar />
        <div className="col-10">
          <Link to="/productos/crear" className="icon-plus">
            <i className="fas fa-plus fa-xl" style={{ color: "#fff" }}></i>
          </Link>
          <Accordion defaultActiveKey={0}>
            {products.map((product, index) => {
              let changes = {
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category.id,
                popular: product.popular.toString(),
              };
              return (
                <Accordion.Item key={index} eventKey={index}>
                  <Accordion.Header>{product.name}</Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Descripcion</th>
                          <th>Foto</th>
                          <th>Precio</th>
                          <th>Stock</th>
                          <th>Categoria</th>
                          <th>Destacado</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{product.name}</td>
                          <td>{product.description}</td>
                          <td>
                            <img
                              src={
                                process.env.REACT_APP_BASE_URL_IMAGE +
                                `${product.image}`
                              }
                              alt=""
                              width={"50px"}
                            />
                          </td>
                          <td>{product.price}</td>
                          <td>{product.stock}</td>
                          <td>{product.category.name}</td>
                          <td>{product.popular.toString()}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <form
                      encType="multipart/form-data"
                      onSubmit={(e) => {
                        e.preventDefault();
                        updateProduct(product.id, e);
                      }}
                    >
                      <div className="d-flex flex-column flex-md-row">
                        <FloatingLabel controlId="floatingName" label="Nombre">
                          <Form.Control
                            name="name"
                            onChange={(e) => {
                              changes = { ...changes, name: e.target.value };
                            }}
                            type="text"
                            placeholder="Nombre"
                            defaultValue={product.name}
                          />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingDescription"
                          label="Descripción"
                        >
                          <Form.Control
                            name="description"
                            type="text"
                            placeholder="Descripción"
                            defaultValue={product.description}
                          />
                        </FloatingLabel>
                        <label
                          htmlFor="file-upload"
                          className="custom-file-upload d-flex align-items-center"
                        >
                          <i className="fa fa-cloud-upload"></i> Cambiar Imagen
                        </label>
                        <Form.Control
                          onChange={(e) => setImage(e.target.files[0])}
                          name="image"
                          type="file"
                          size="lg"
                          id="file-upload"
                        />
                        <FloatingLabel controlId="floatingPrice" label="Precio">
                          <Form.Control
                            name="price"
                            type="number"
                            step=".01"
                            placeholder="Precio"
                            defaultValue={product.price}
                            min="1.00"
                            max="99.99"
                          />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingStock" label="Stock">
                          <Form.Control
                            name="stock"
                            type="number"
                            placeholder="Stock"
                            defaultValue={product.stock}
                            onChange={(e) => {
                              changes = { ...changes, stock: e.target.value };
                            }}
                          />
                        </FloatingLabel>
                        <Form.Select
                          name="categoryId"
                          aria-label="Categoria"
                          defaultValue={product.category.id}
                          onChange={(e) => {
                            changes = { ...changes, category: e.target.value };
                          }}
                        >
                          <option value="1">Classic</option>
                          <option value="2">Premium</option>
                        </Form.Select>
                        <Form.Select
                          name="popular"
                          aria-label="Destacado"
                          defaultValue={product.popular.toString()}
                          onChange={(e) => {
                            changes = { ...changes, popular: e.target.value };
                          }}
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </Form.Select>
                      </div>
                      <i
                        style={{ color: "#8a7357" }}
                        type="submit"
                        className="far fa-edit me-3"
                      ></i>

                      <i
                        style={{ color: "#8a7357" }}
                        className="far fa-trash-alt mt-3"
                        onClick={() => {
                          showAlert(product.id);
                        }}
                      ></i>
                    </form>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      </div>
    </>
  );
}
