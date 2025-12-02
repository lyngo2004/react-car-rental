import React, { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Button, Input, Space } from "antd";
import {
  CarOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import carApi from "../utils/carApi";

// Images
import CarHero1 from "../assets/images/homepage/car1.png";
import CarHero2 from "../assets/images/homepage/car2.png";
import CarHero3 from "../assets/images/homepage/car3.png";

import "../styles/home.css";

const { Title, Text } = Typography;

const HomePage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const res = await carApi.getAllCars();
      if (res?.EC === 0) setCars(res.DT);
    };
    fetchCars();
  }, []);

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      
      {/* ================ HERO SECTION ================ */}
      <Row gutter={24} style={{ marginTop: 40 }}>
        <Col span={12}>
          <Card className="hero-card hero-bg-blue">
            <Title level={3}>The Best Platform for Car Rental</Title>
            <Text>
              Ease of doing car rental safely and reliably at a low price.
            </Text>

            <div style={{ marginTop: 20 }}>
              <Button type="primary" size="large">Rental Car</Button>
            </div>

            <div className="hero-shape"></div>

            <img src={CarHero1} className="home-car-img" />
          </Card>
        </Col>

        <Col span={12}>
          <Card className="hero-card hero-bg-darkblue">
            <Title level={3}>Easy way to rent a car at a low price</Title>
            <Text>
              Providing cheap rental services with comfort.
            </Text>

            <div style={{ marginTop: 20 }}>
              <Button type="primary" size="large">Rental Car</Button>
            </div>

            <div className="hero-shape"></div>

            <img src={CarHero2} className="home-car-img" />
          </Card>
        </Col>
      </Row>

      {/* ================ OUR SERVICES ================ */}
      <Row style={{ marginTop: 80 }} align="middle">
        <Col span={12}>
          <div className="service-img-wrapper">
            <div className="service-shape-1"></div>
            <div className="service-shape-2"></div>
            <img src={CarHero3} className="service-img" />
          </div>
        </Col>

        <Col span={12}>
          <Title level={2} className="service-title">Our Services</Title>
          <div className="service-item">
            <div className="service-icon"></div>
            <div>
              <div className="service-text-title">Car Hire</div>
              <div className="service-text-desc">
                We pride ourselves in always going the extra mile for our customers.
              </div>
            </div>
          </div>

          <div className="service-item">
            <div className="service-icon"></div>
            <div>
              <div className="service-text-title">Car Sales</div>
              <div className="service-text-desc">
                We sale the best luxury cars across the world at a competitive price.
              </div>
            </div>
          </div>

          <div className="service-item">
            <div className="service-icon"></div>
            <div>
              <div className="service-text-title">Hire a Driver</div>
              <div className="service-text-desc">
                If you want to travel and feel comfortable, our drivers are available.
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* ================ CAR LIST ================ */}
      <Title level={2} style={{ textAlign: "center", marginTop: 80 }}>
        We Have Everything You Need
      </Title>

      <Row gutter={24} style={{ marginTop: 40 }}>
        {cars.slice(0, 4).map((car) => (
          <Col span={6} key={car.CarId}>
            <Card style={{ borderRadius: 12 }}>
              <img src={car.ImageUrl} className="home-car-img" />

              <Title level={4} style={{ marginTop: 10 }}>
                {car.Brand} {car.Model}
              </Title>

              <Text>{car.PricePerDay} VND/day</Text>

              <Button type="primary" block style={{ marginTop: 15 }}>
                Rent
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ================ BRANDS ================ */}
      <Title level={2} style={{ textAlign: "center", marginTop: 80 }}>
        Our Luxury Brand
      </Title>

      <Row justify="center" gutter={12}>
        {["Audi", "Mercedes", "Land Rover", "Ferrari", "Tesla"].map((brand) => (
          <Col key={brand}>
            <Card className="brand-card">{brand}</Card>
          </Col>
        ))}
      </Row>

      {/* ================ FEATURES ================ */}
      <Title level={2} style={{ textAlign: "center", marginTop: 80 }}>
        Fell the best experience with our luxury car
      </Title>

      <Row gutter={32} justify="center">
        <Col span={6} style={{ textAlign: "center" }}>
          <CarOutlined style={{ fontSize: 40 }} />
          <Title level={4}>Book with flexibility</Title>
          <Text>Easily find car & book with no extra fees.</Text>
        </Col>

        <Col span={6} style={{ textAlign: "center" }}>
          <SafetyCertificateOutlined style={{ fontSize: 40 }} />
          <Title level={4}>Trusted and free</Title>
          <Text>No hidden fees — always transparent.</Text>
        </Col>

        <Col span={6} style={{ textAlign: "center" }}>
          <TeamOutlined style={{ fontSize: 40 }} />
          <Title level={4}>We know travel</Title>
          <Text>10 years of experience finding perfect cars.</Text>
        </Col>
      </Row>

      {/* ================ SUBSCRIBE AREA ================ */}
      <div
        className="subscribe-section"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/376729/pexels-photo-376729.jpeg')",
          marginTop: 100,
        }}
      >
        <Title style={{ color: "white" }}>
          Become a Driver <br /> Your Time, Your Goals
        </Title>

        <Space style={{ marginTop: 20 }}>
          <Input placeholder="Email" size="large" style={{ width: 300 }} />
          <Button type="primary" size="large">
            Next
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default HomePage;