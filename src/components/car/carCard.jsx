import { Card, Row, Col, Button, Space, Typography } from "antd";
import {
    UserOutlined,
    SettingOutlined,
    DashboardOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const cardStyle = {
    borderRadius: 16,
    height: 480,                // cố định chiều cao card
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
};

const CarCard = ({ cars }) => {
    return (
        <div style={{ padding: "30px 30px", flex: 1 }}>
            <Row gutter={[24, 24]}>
                {cars.map((car, index) => (
                    <Col xs={24} sm={12} md={12} lg={8} key={index}>
                        <Card
                            hoverable
                            style={cardStyle}
                            bodyStyle={{
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                padding: 20,
                            }}
                        >
                            {/* TITLE */}
                            <Space direction="vertical" size={0}>
                                <Title level={4} style={{ margin: 0 }}>
                                    {car.Brand} {car.Model}
                                </Title>
                                <Text type="secondary">{car.CarType}</Text>
                            </Space>

                            {/* IMAGE */}
                            <div
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 10,
                                    marginBottom: 10,
                                }}
                            >
                                <img
                                    src={car.ImagePath}
                                    style={{
                                        width: "80%",
                                        objectFit: "contain",
                                    }}
                                    draggable={false}
                                />
                            </div>

                            {/* SPECS (CENTER ALIGN) */}
                            <Space
                                size="large"
                                style={{
                                    width: "100%",
                                    justifyContent: "center",   // căn giữa toàn bộ
                                    marginBottom: 15,
                                }}
                            >
                                <Space>
                                    <DashboardOutlined />
                                    <Text>80L</Text>
                                </Space>

                                <Space>
                                    <SettingOutlined />
                                    <Text>Manual</Text>
                                </Space>

                                <Space>
                                    <UserOutlined />
                                    <Text>{car.Capacity} People</Text>
                                </Space>
                            </Space>

                            {/* PRICE + BUTTON */}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <div>
                                    <Title level={4} style={{ marginBottom: 0 }}>
                                        ${car.PricePerDay}/day
                                    </Title>
                                    <Text delete type="secondary">${car.PricePerDay + 10}</Text>
                                </div>

                                <Button type="primary" size="large">
                                    Rent Now
                                </Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default CarCard;
