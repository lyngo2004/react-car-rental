import { Card, Row, Col, Typography, Divider } from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const ContractMainInfo = ({ customer, rental, payment }) => {
  return (
    <Card style={{ marginBottom: 24 }}>
      {/* ================= CUSTOMER ================= */}
      <Title level={4}>Customer Information</Title>

      <Row gutter={[16, 8]}>
        <Col span={12}>
          <Text strong>Full Name:</Text> {customer.FullName}
        </Col>
        <Col span={12}>
          <Text strong>Email:</Text> {customer.Email}
        </Col>
        <Col span={12}>
          <Text strong>Phone:</Text> {customer.Phone}
        </Col>
        <Col span={12}>
          <Text strong>Driver License:</Text> {customer.DriverLicense}
        </Col>
      </Row>

      <Divider />

      {/* ================= RENTAL ================= */}
      <Title level={4}>Rental Details</Title>

      <Row gutter={[16, 8]}>
        <Col span={12}>
          <Text strong>Pick-up:</Text><br />
          {rental.PickUpLocation}<br />
          {dayjs(rental.pickupDate).format("DD/MM/YYYY")} {rental.pickupTime}
        </Col>

        <Col span={12}>
          <Text strong>Drop-off:</Text><br />
          {rental.DropOffLocation}<br />
          {dayjs(rental.dropoffDate).format("DD/MM/YYYY")} {rental.dropoffTime}
        </Col>
      </Row>

      <Divider />

      {/* ================= PAYMENT ================= */}
      <Title level={4}>Payment Information</Title>

      <Row gutter={[16, 8]}>
        <Col span={12}>
          <Text strong>Payment Method:</Text>
        </Col>
        <Col span={12}>
          <Text>{payment.PaymentMethod}</Text>
        </Col>

        <Col span={12}>
          <Text strong>Amount Paid:</Text>
        </Col>
        <Col span={12}>
          <Text>${payment.PaymentAmount.toFixed(2)}</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default ContractMainInfo;
