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

const CarCard = ({ cars = [] }) => {
    const cardWidth = 360;
    const wrapperMaxWidth = 1080; // match FilterBar maxWidth
    const isSingle = cars.length === 1;
    const isMulti3OrMore = cars.length >= 3;
    // wrapper becomes the centered block for 3-per-row; for 1/2 it still uses wrapperMaxWidth so alignment matches filterbar
    const wrapperWidth = isSingle ? cardWidth : '100%';
    return (
        <div style={{ padding: "30px 30px", flex: 1 }}>
            <div style={{ width: wrapperWidth, margin: isSingle ? '0 auto' : '0' }}>
                <Row gutter={[24, 24]} justify="start" align="top">
                    {cars.map((car, index) => (
                        <Col xs={24} sm={12} md={12} lg={cars.length === 1 || cars.length === 2 ? 12 : 8} key={car.Id || car.id || index} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <div style={{ width: 360, minWidth: 360 }}>
                                <Card
                                    hoverable
                                    style={{ ...cardStyle, width: '100%' }}
                                    bodyStyle={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                        padding: 20,
                                    }}
                                >
                                    {/* TITLE */}
                                    <Space direction="vertical" size={0} style={{ width: '100%' }}>
                                        <Title level={4} style={{ margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '100%' }}>
                                            {car.Brand} {car.Model}
                                        </Title>
                                        <Text type="secondary" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{car.CarType}</Text>
                                    </Space>

                                    {/* IMAGE */}
                                    <div
                                        style={{
                                            flex: 1,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: 5,
                                            marginBottom: 5,
                                        }}
                                    >
                                        {car.ImagePath ? (
                                            <img
                                                src={car.ImagePath}
                                                style={{
                                                    maxWidth: "100%",
                                                    maxHeight: 240,
                                                    objectFit: "contain",
                                                }}
                                                alt={`${car.Brand} ${car.Model}`}
                                                draggable={false}
                                            />
                                        ) : (
                                            <div style={{ width: 200, height: 120, background: '#f1f1f1', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                                                <span style={{ color: '#9aa0a6' }}>No Image</span>
                                            </div>
                                        )}
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
                                            <Title level={4} style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>
                                                ${car.PricePerDay}/day
                                            </Title>
                                            <Text delete type="secondary">${car.PricePerDay + 10}</Text>
                                        </div>

                                        <Button type="primary" size="large">
                                            Rent Now
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default CarCard;
