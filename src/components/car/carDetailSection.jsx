import React from "react";
import {
    Row,
    Col,
    Card,
    Typography,
    Rate,
    Space,
    Button,
    Tag,
} from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const CarDetailSection = ({ car, rentalInfo }) => {
    if (!car) return null;
    const navigate = useNavigate();

    const handleGoDetail = (car) => {
        if (!car?.CarId) return;
        navigate(`/payment}`, {
            state: { car, rentalInfo },
        });
    };

    const fullName = `${car.Brand || ""} ${car.Model || ""}`.trim() || "Car Detail";
    const descriptionText =
        car.Description ||
        "NISMO has become the embodiment of Nissan's outstanding performance, inspired by the most unforgiving proving ground, the race track.";

    // Hard-code theo yêu cầu
    const steering = "Manual";
    const gasoline = "70L";

    return (
        <Row gutter={24}>
            {/* LEFT: BLUE HERO CARD */}
            <Col xs={24} md={10}>
                <Card
                    bodyStyle={{
                        padding: 24,
                        height: 360,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                    style={{
                        borderRadius: 16,
                        background: "linear-gradient(135deg, #3563E9 0%, #54A6FF 100%)",
                        color: "#fff",
                    }}
                >
                    <div>
                        <Title level={3} style={{ color: "#fff", marginBottom: 8 }}>
                            Sports car with the best design and acceleration
                        </Title>

                        <Text style={{ color: "#E0EAFF" }}>
                            Safety and comfort while driving a futuristic and elegant
                            sports car
                        </Text>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            height: 180,
                        }}
                    >
                        {car.ImagePath ? (
                            <img
                                src={car.ImagePath}
                                alt={fullName}
                                style={{
                                    maxWidth: "150%",
                                    maxHeight: "150%",
                                    objectFit: "contain",
                                    marginBottom: -35,
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: 260,
                                    height: 140,
                                    background: "rgba(255,255,255,0.15)",
                                    borderRadius: 12,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={{ color: "#E0EAFF" }}>No Image</Text>
                            </div>
                        )}
                    </div>
                </Card>
            </Col>

            {/* RIGHT: DETAIL CARD */}
            <Col xs={24} md={14}>
                <Card
                    bodyStyle={{
                        padding: 24,
                        height: 360,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                    style={{ borderRadius: 16 }}
                >
                    {/* HEADER */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: 8,
                        }}
                    >
                        <div>
                            <Title level={3} style={{ marginBottom: 4 }}>
                                {fullName}
                            </Title>
                            <Space align="center">
                                <Rate disabled defaultValue={4} />
                                <Text type="secondary">440+ Reviewer</Text>
                            </Space>
                        </div>

                        <Button
                            type="text"
                            shape="circle"
                            icon={<HeartOutlined style={{ color: "#ED3F3F" }} />}
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <Paragraph
                        style={{
                            color: "#90A3BF",
                            maxWidth: 460,
                            marginBottom: 16,
                        }}
                    >
                        {descriptionText}
                    </Paragraph>

                    {/* SPECS */}
                    <Row gutter={[16, 8]} style={{ marginBottom: 16 }}>
                        <Col xs={12} md={6}>
                            <Text type="secondary">Type Car</Text>
                            <br />
                            <Text strong>{car.CarType || "Sport"}</Text>
                        </Col>

                        <Col xs={12} md={6}>
                            <Text type="secondary">Capacity</Text>
                            <br />
                            <Text strong>{car.Capacity || 2} Person</Text>
                        </Col>

                        <Col xs={12} md={6}>
                            <Text type="secondary">Steering</Text>
                            <br />
                            <Text strong>{steering}</Text>
                        </Col>

                        <Col xs={12} md={6}>
                            <Text type="secondary">Gasoline</Text>
                            <br />
                            <Text strong>{gasoline}</Text>
                        </Col>
                    </Row>

                    {/* PRICE + BUTTON */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 8,
                        }}
                    >
                        <div>
                            <Title level={3} style={{ marginBottom: 0 }}>
                                ${car.PricePerDay}/
                                <span style={{ fontSize: 16 }}>day</span>
                            </Title>
                            <Text delete type="secondary">
                                ${Number(car.PricePerDay) + 20}.00
                            </Text>
                        </div>

                        <Space>
                            <Tag color="blue">Available</Tag>
                            <Button type="primary" size="large" onClick={() => handleGoDetail(car)}>
                                Rent Now
                            </Button>
                        </Space>
                    </div>
                </Card>
            </Col>
        </Row>
    );
};

export default CarDetailSection;
