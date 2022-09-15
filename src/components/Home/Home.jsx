import React from "react";
import Card from "react-bootstrap/Card";
import "../Home/Home.css";
import LineChart from "../LineChart";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import { SalesOnMonth } from "../Data.js";

export default function Home() {
  const [salesData, setSalesData] = useState({
    labels: SalesOnMonth.map((data) => data.month),
    datasets: [
      {
        label: "Sales on month",
        data: SalesOnMonth.map((data) => data.sales),
      },
    ],
  });
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-11 col-lg-10 colHome">
          <p className="title-dashboard ms-5">Dashoboard</p>
          <div className="d-flex cards">
            <Card style={{ width: "18rem" }} className="card1 mt-3 ms-5">
              <Card.Body>
                <Card.Title>
                  26K (-12.4% <i className="fas fa-long-arrow-alt-down"></i>)
                </Card.Title>
                <Card.Subtitle className="mb-2">Users</Card.Subtitle>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }} className="card2 mt-3 ms-5">
              <Card.Body>
                <Card.Title>
                  $6.200 (40.9% <i className="fas fa-long-arrow-alt-up"></i>)
                </Card.Title>
                <Card.Subtitle className="mb-2">Income</Card.Subtitle>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }} className="card3 mt-3 ms-5">
              <Card.Body>
                <Card.Title>
                  2.49% (84.7% <i className="fas fa-long-arrow-alt-up"></i>)
                </Card.Title>
                <Card.Subtitle className="mb-2">Conversion Rate</Card.Subtitle>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }} className="card4 mt-3 ms-5">
              <Card.Body>
                <Card.Title>
                  44K (-23.6% <i className="fas fa-long-arrow-alt-down"></i>)
                </Card.Title>
                <Card.Subtitle className="mb-2">Sessions</Card.Subtitle>
              </Card.Body>
            </Card>
          </div>

          <LineChart chartData={salesData} />
        </div>
      </div>
    </div>
  );
}
