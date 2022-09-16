import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./Pedidos.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Pedidos() {
  const [orders, setOrders] = useState([]);
  const userStore = useSelector((state) => state.user[0]);
  const navigate = useNavigate();
  useEffect(() => {
    const getOrders = async () => {
      const result = await axios({
        method: "GET",
        baseURL: process.env.REACT_APP_API_BASE_URL,
        url: "/administrators/orders",
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      if (result.data.error) {
        navigate("/login");
      } else {
        setOrders(result.data.orders);
      }
    };
    getOrders();
  }, []);

  const updateOrderState = async (id, state) => {
    const result = await axios({
      method: "PATCH",
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: "/administrators/orders",
      data: { id, state },
      headers: {
        Authorization: `Bearer ${userStore.token}`,
      },
    });
    if (result.data.error) {
      navigate("/login");
    }
    console.log("order", result.data);
  };

  return (
    <div className="row rowEdit">
      <Sidebar />
      <div className="col-10 p-0">
        <div className="px-3">
          <p className="fs-3">Listado de Pedidos</p>
          <p className="fs-6">Pedidos: {orders.length}</p>
        </div>
        <div className="px-3">
          <Accordion defaultActiveKey="0">
            {orders
              .slice(0)
              .reverse()
              .map((order, index, array) => {
                let orderPrice = 0;
                return (
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header>
                      Pedido #{array.length - 1 * index}
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card>
                        <Card.Body>
                          <div className="d-flex justify-content-between">
                            Customer:{" "}
                            <span>
                              Firstname: {order.customerData.firstName}
                            </span>
                            <span>Email: {order.customerData.email}</span>
                            <span>Phone: {order.customerData.phone}</span>
                          </div>
                        </Card.Body>
                      </Card>
                      <br />
                      <Accordion defaultActiveKey={array.length + 1 * index}>
                        <Accordion.Item eventKey={-(array.length + 1 * index)}>
                          <Accordion.Header>Productos</Accordion.Header>
                          <Accordion.Body>
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Nombre</th>
                                  <th>Precio</th>
                                  <th>Cantidad</th>
                                  <th>Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.products.map((item) => {
                                  orderPrice += Number(
                                    (
                                      item.product.price * item.quantity
                                    ).toFixed(12)
                                  );
                                  return (
                                    <tr>
                                      <td>{item.product.name}</td>
                                      <td>${item.product.price}</td>
                                      <td>{item.quantity}</td>
                                      <td>
                                        {Number(
                                          (
                                            item.product.price * item.quantity
                                          ).toFixed(12)
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                                <tr>
                                  <td>Total Pago:</td>
                                  <td></td>
                                  <td></td>
                                  <td>${orderPrice}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <Form.Group className="my-3">
                        <Form.Label>Estado:</Form.Label>
                        <Form.Select
                          defaultValue={order.state}
                          onChange={(e) => {
                            updateOrderState(order.id, e.target.value);
                          }}
                        >
                          <option value={"Pago"}>Pago</option>
                          <option value={"Enviado"}>Enviado</option>
                          <option value={"Entregado"}>Entregado</option>
                        </Form.Select>
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
