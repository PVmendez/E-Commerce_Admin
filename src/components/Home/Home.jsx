import React from "react";
import Card from "react-bootstrap/Card";
import "./Home.css";
import LineChart from "../LineChart";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import { SalesOnMonth } from "../Data.js";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [salesData, setSalesData] = useState({
    labels: SalesOnMonth.map((data) => data.month),
    datasets: [
      {
        label: "Sales on month",
        data: SalesOnMonth.map((data) => data.sales),
        backgroundColor: ["skyblue"],
        borderColor: "skyblue",
        borderWidth: 2,
      },
    ],
  });
  const userStore = useSelector((state) => state.user[0]);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAdmin = async () => {
      const result = await axios({
        method: "GET",
        baseURL: process.env.REACT_APP_API_BASE_URL,
        url: "/administrators",
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      if (result.data.error) {
        navigate("/login");
      }
    };
    // userStore.token ? checkAdmin() : navigate("/login");
  }, [userStore, navigate]);
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
          <div className="mt-5 align-self-center divChart">
            <LineChart salesData={salesData} />
          </div>
          <div className="d-flex justify-content-center div-cardsSocialMedia">
            <Card id="cardSocialMedia" className="mt-5 ms-5">
              <Card.Img
                variant="top"
                src="./img/Facebook.png"
                className="imgFacebook"
              />
              <Card.Body className="d-flex justify-content-evenly">
                <div className="firstDivCard">
                  <p className="p-cardsSocialMedia">89K</p>
                  <p>FRIENDS</p>
                </div>

                <div>
                  <p className="p-cardsSocialMedia">459</p>
                  <p>FEEDS</p>
                </div>
              </Card.Body>
            </Card>
            <Card id="cardSocialMedia2" className="mt-5 ms-5">
              <Card.Img
                variant="top"
                src="./img/Twitter.jpg"
                className="imgTwitter"
              />
              <Card.Body className="d-flex justify-content-evenly">
                <div className="firstDivCard">
                  <p className="p-cardsSocialMedia">973K</p>
                  <p>FOLLOWERS</p>
                </div>

                <div>
                  <p className="p-cardsSocialMedia">1792</p>
                  <p>TWEETS</p>
                </div>
              </Card.Body>
            </Card>
            <Card id="cardSocialMedia3" className="mt-5 ms-5">
              <Card.Img
                variant="top"
                src="./img/Linkedin.jpg"
                className="imgLinkedin"
              />
              <Card.Body className="d-flex justify-content-evenly">
                <div className="firstDivCard">
                  <p className="p-cardsSocialMedia">500+</p>
                  <p>CONTACTS</p>
                </div>

                <div>
                  <p className="p-cardsSocialMedia">292</p>
                  <p>FEEDS</p>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
