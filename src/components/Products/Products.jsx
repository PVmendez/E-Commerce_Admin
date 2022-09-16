import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./Products.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const result = await axios({
        method: "GET",
        baseURL: process.env.REACT_APP_API_BASE_URL,
        url: "/administrators/products",
      });
      console.log(result);
      setProducts(result.data.products);
    };
    getProducts();
  }, []);

  const updateProduct = async (id, changes) => {
    console.log(id);
    console.log(changes);
    const result = await axios({
      method: "PATCH",
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: "/administrators/products",
      data: {
        data: changes,
        id: id,
      },
    });
  };

  const deleteProduct = async (id) => {
    const result = await axios({
      method: "DELETE",
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: `/administrators/products/${id}`,
    });
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
                  <Table striped bordered hover>
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
                            src={`./img/${product.image}`}
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
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateProduct(product.id, changes);
                    }}
                  >
                    <div className="d-flex">
                      <FloatingLabel controlId="floatingName" label="Nombre">
                        <Form.Control
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
                      {/* <FloatingLabel
                    controlId="floatingInput"
                    label="Nombre"
                    
                    >
                    <Form.Control type="text" placeholder="Nombre" />
                    </FloatingLabel> */}
                      <FloatingLabel controlId="floatingPrice" label="Precio">
                        <Form.Control
                          type="number"
                          placeholder="Precio"
                          defaultValue={product.price}
                          onChange={(e) => {
                            changes = { ...changes, price: e.target.value };
                          }}
                        />
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingStock" label="Stock">
                        <Form.Control
                          type="number"
                          placeholder="Stock"
                          defaultValue={product.stock}
                          onChange={(e) => {
                            changes = { ...changes, stock: e.target.value };
                          }}
                        />
                      </FloatingLabel>
                      <Form.Select
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
