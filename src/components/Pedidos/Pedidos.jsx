import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
export default function Pedidos() {
  return (
    <div className="row w-100">
      <Sidebar />
      <div className="col-10 p-0">
        <div className="px-3">
          <p className="fs-3">Listado de Pedidos</p>
          <p className="fs-6">Pedidos: 3</p>
        </div>
        <div className="px-3">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Pedido #1</Accordion.Header>
              <Accordion.Body>
                <Card>
                  <Card.Body>User Info</Card.Body>
                </Card>
                <br />
                <Accordion defaultActiveKey="4">
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>Productos</Accordion.Header>
                    <Accordion.Body>
                      <ListGroup>
                        <ListGroup.Item>Producto #1</ListGroup.Item>
                        <ListGroup.Item>Producto #2</ListGroup.Item>
                        <ListGroup.Item>Producto #3</ListGroup.Item>
                        <ListGroup.Item>Producto #4</ListGroup.Item>
                        <ListGroup.Item>Producto #5</ListGroup.Item>
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Form.Group className="mb-3">
                  <Form.Label>Estado:</Form.Label>
                  <Form.Select>
                    <option>Pago</option>
                    <option>Enviado</option>
                    <option>Entregado</option>
                  </Form.Select>
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Pedido #1</Accordion.Header>
              <Accordion.Body>
                <Card>
                  <Card.Body>User Info</Card.Body>
                </Card>
                <br />
                <Accordion defaultActiveKey="5">
                  <Accordion.Item eventKey="5">
                    <Accordion.Header>Productos</Accordion.Header>
                    <Accordion.Body>
                      <ListGroup>
                        <ListGroup.Item>Producto #1</ListGroup.Item>
                        <ListGroup.Item>Producto #2</ListGroup.Item>
                        <ListGroup.Item>Producto #3</ListGroup.Item>
                        <ListGroup.Item>Producto #4</ListGroup.Item>
                        <ListGroup.Item>Producto #5</ListGroup.Item>
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Form.Group className="mb-3">
                  <Form.Label>Estado:</Form.Label>
                  <Form.Select>
                    <option>Pago</option>
                    <option>Enviado</option>
                    <option>Entregado</option>
                  </Form.Select>
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Pedido #1</Accordion.Header>
              <Accordion.Body>
                <Card>
                  <Card.Body>User Info</Card.Body>
                </Card>
                <br />
                <Accordion defaultActiveKey="6">
                  <Accordion.Item eventKey="6">
                    <Accordion.Header>Productos</Accordion.Header>
                    <Accordion.Body>
                      <ListGroup>
                        <ListGroup.Item>Producto #1</ListGroup.Item>
                        <ListGroup.Item>Producto #2</ListGroup.Item>
                        <ListGroup.Item>Producto #3</ListGroup.Item>
                        <ListGroup.Item>Producto #4</ListGroup.Item>
                        <ListGroup.Item>Producto #5</ListGroup.Item>
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Form.Group className="mb-3">
                  <Form.Label>Estado:</Form.Label>
                  <Form.Select>
                    <option>Pago</option>
                    <option>Enviado</option>
                    <option>Entregado</option>
                  </Form.Select>
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
