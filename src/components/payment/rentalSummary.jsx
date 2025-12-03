import React from "react";
import { Card, Row, Col, Typography, Divider, Input, Button } from "antd";
import { StarFilled } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const RentalSummary = ({ car, rentalInfo }) => {
  const { pickupDate, pickupTime, dropoffDate, dropoffTime } = rentalInfo;

  let rentalDays = 1;
  if (pickupDate && dropoffDate && pickupTime && dropoffTime) {
    const start = dayjs(`${pickupDate.format("YYYY-MM-DD")} ${pickupTime}`);
    const end = dayjs(`${dropoffDate.format("YYYY-MM-DD")} ${dropoffTime}`);

    rentalDays = Math.max(1, end.diff(start, "day"));
  }

  const carName = `${car.Brand} ${car.Model}`;
  const pricePerDay = Number(car.PricePerDay);

  const subtotal = pricePerDay * rentalDays;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const ratings = 4.0;
  const reviewers = "440 Reviewer";


  return (
    <Card style={{ borderRadius: 16 }}>

      {/* Title */}
      <Title level={4} style={{ marginBottom: 4 }}>
        Rental Summary
      </Title>

      {/* Subtitle */}
      <Text type="secondary">
        Prices may change depending on the length of the rental and the price of your rental car.
      </Text>

      {/* Car preview */}
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col>
          <div
            style={{
              width: 120,
              height: 80,
              background: "#EEF1FF",
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {car.ImagePath ? (
              <img
                src={car.ImagePath}
                alt="car"
                style={{ width: "90%", borderRadius: 8 }}
              />
            ) : (
              <Text type="secondary">No image</Text>
            )}
          </div>
        </Col>

        <Col flex="auto">
          <Title level={5} style={{ marginBottom: 4 }}>
            {carName}
          </Title>

          <Text>
            <StarFilled style={{ color: "#fadb14", marginRight: 4 }} />
            {ratings}{" "}
            <Text type="secondary">{reviewers}</Text>
          </Text>

          <div style={{ marginTop: 6 }}>
            <Title level={5} style={{ margin: 0 }}>
              ${pricePerDay.toFixed(2)}
            </Title>
          </div>
        </Col>
      </Row>

      <Divider />

      <Row style={{ marginBottom: 12 }}>
        <Col span={12}><Text>Rental Days</Text></Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Text strong>{rentalDays} day(s)</Text>
        </Col>
      </Row>


      {/* Subtotal */}
      <Row style={{ marginBottom: 12 }}>
        <Col span={12}>
          <Text>Subtotal</Text>
        </Col>

        <Col span={12} style={{ textAlign: "right" }}>
          <Text strong>${subtotal.toFixed(2)}</Text>
        </Col>
      </Row>

      {/* Tax */}
      <Row style={{ marginBottom: 12 }}>
        <Col span={12}>
          <Text>Tax</Text>
        </Col>

        <Col span={12} style={{ textAlign: "right" }}>
          <Text strong>${tax.toFixed(2)}</Text>
        </Col>
      </Row>

      {/* Promotion code */}
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <Input.Group compact>
            <Input
              placeholder="Apply promo code"
              style={{
                width: "70%",
                height: 40,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}
            />
            <Button
              type="primary"
              style={{
                width: "30%",
                height: 40,
                backgroundColor: "#3563E9",
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
              }}
            >
              Apply now
            </Button>
          </Input.Group>
        </Col>
      </Row>

      <Divider />

      {/* Total */}
      <Row align="middle">
        <Col span={12}>
          <Text strong style={{ fontSize: 16 }}>
            Total Rental Price
          </Text>
          <br />
          <Text type="secondary">Overall price and includes rental discount</Text>
        </Col>

        <Col span={12} style={{ textAlign: "right" }}>
          <Title level={3} style={{ margin: 0 }}>
            ${total.toFixed(2)}
          </Title>
        </Col>
      </Row>
    </Card>
  );
};

export default RentalSummary;