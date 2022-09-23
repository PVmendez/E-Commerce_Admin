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

export default function Products() {
  const [products, setProducts] = useState([]);
  const adminStore = useSelector((state) => state.admin[0]);
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
    console.log(e.target[2].files[0]);
    const form = new FormData();
    form.append(e.target[0].name, e.target[0].value);
    form.append(e.target[1].name, e.target[1].value);
    if (e.target[2].files.length > 0) {
      form.append(e.target[2].name, e.target[2].files[0]);
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
    console.log(result)
  };

  const deleteProduct = async (id) => {
    const result = await axios({
      method: "DELETE",
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: `/administrators/products/${id}`,
    });
    console.log(result)
  };
  const showAlert = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <div className="row rowEdit">
      <Sidebar />
      <div className="col-10">
        <Link to="/productos/crear">Crear nuevo producto</Link>
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
                              process.env.REACT_APP_BASE_URL_IMAGE + `${product.image}`
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
                          onChange={(e) => {
                            changes = {
                              ...changes,
                              description: e.target.value,
                            };
                          }}
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
                        name="image"
                        type="file"
                        size="lg"
                        id="file-upload"
                        onChange={(e) => {
                          console.log(e.target.files);
                          changes = { ...changes, image: e.target.files[0] };
                        }}
                      />
                      <FloatingLabel controlId="floatingPrice" label="Precio">
                        <Form.Control
                          name="price"
                          type="number"
                          step=".01"
                          placeholder="Precio"
                          defaultValue={product.price}
                          onChange={(e) => {
                            changes = { ...changes, price: e.target.value };
                          }}
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
                    <Button variant={"success"} type="submit" className="mt-3">
                      Actualizar
                    </Button>
                    <Button
                      className="mt-3"
                      variant={"dark"}
                      onClick={() => {
                        showAlert(product.id);
                      }}
                    >
                      Eliminar
                    </Button>
                  </form>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
