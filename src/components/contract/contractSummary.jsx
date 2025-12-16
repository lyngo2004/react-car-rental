import { Card, Row, Col, Typography, Divider } from "antd";
import dayjs from "dayjs";
const { Title, Text } = Typography;

const ContractSummary = ({ car, rental, payment }) => {

  if (!car || !payment) return null;

  const start = dayjs(rental.pickupDateTime);
  const end = dayjs(rental.dropoffDateTime);
  const days = Math.max(1, end.diff(start, "day"));

  return (
    <Card style={{ borderRadius: 16 }}>
      <Title level={4} style={{ marginBottom: 4 }}>
        Contract Summary
      </Title>

      {/* ===== CAR PREVIEW (giống RentalSummary) ===== */}
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col>
          <div
            style={{
              width: 160,
              height: 120,
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
                alt={`${car.Brand} ${car.Model}`}
                style={{ width: "120%", borderRadius: 8 }}
              />
            ) : (
              <Text type="secondary">No image</Text>
            )}
          </div>
        </Col>

        <Col flex="auto">
          <Title level={5} style={{ marginBottom: 4 }}>
            {car.Brand} {car.Model}
          </Title>

          <Text type="secondary">{days} day(s)</Text>

          <div style={{ marginTop: 6 }}>
            <Title level={5} style={{ margin: 0 }}>
              ${car.PricePerDay.toFixed(2)}/day
            </Title>
          </div>
        </Col>
      </Row>

      <Divider />

      {/* ===== TOTAL ===== */}
      <Row align="middle">
        <Col span={12}>
          <Text strong>Total Paid</Text>
        </Col>

        <Col span={12} style={{ textAlign: "right" }}>
          <Title level={4} style={{ margin: 0 }}>
            ${payment.PaymentAmount.toFixed(2)}
          </Title>
        </Col>
      </Row>
    </Card>
  );
};

export default ContractSummary;
