import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  Button,
  Space,
  Typography,
  message
} from "antd";

// Payment method icons (AntD built-in)
import { BankOutlined, DollarOutlined, LockOutlined, WalletOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

/**
 * PaymentForm Component
 * Responsibilities:
 *   - Display Billing Info form
 *   - Display Rental Info
 *   - Display Payment Method options (Momo, Bank Transfer, COD)
 */
const PaymentForm = () => {
  const [method, setMethod] = useState("momo"); // default method

  /**
   * "Rent Now" button (Demo mode: no API call)
   */
  const handleRentNow = () => {
    message.success("Demo mode: Rental submission is disabled.");
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      
      {/* BILLING INFO SECTION */}
      <Card>
        <Title level={4}>Billing Info</Title>
        <Text type="secondary">Please enter your billing info</Text>

        <Row gutter={20} style={{ marginTop: 20 }}>
          <Col span={12}>
            <Input placeholder="Your name" />
          </Col>
          <Col span={12}>
            <Input placeholder="Phone number" />
          </Col>
          <Col span={12} style={{ marginTop: 16 }}>
            <Input placeholder="Address" />
          </Col>
          <Col span={12} style={{ marginTop: 16 }}>
            <Input placeholder="Town / City" />
          </Col>
        </Row>
      </Card>

      {/* RENTAL INFO SECTION */}
      <Card>
        <Title level={4}>Rental Info</Title>
        <Text type="secondary">Please select your rental date</Text>

        <Space direction="vertical" style={{ width: "100%", marginTop: 20 }}>
          {/* PICK-UP SECTION */}
          <Radio checked>Pick-Up</Radio>

          <Row gutter={16}>
            <Col span={8}>
              <Select placeholder="City" style={{ width: "100%" }}>
                <Option value="Hanoi">Hanoi</Option>
                <Option value="Ho Chi Minh">Ho Chi Minh</Option>
              </Select>
            </Col>

            <Col span={8}>
              <DatePicker placeholder="Select date" style={{ width: "100%" }} />
            </Col>

            <Col span={8}>
              <Select placeholder="Time" style={{ width: "100%" }}>
                <Option value="09:00">09:00</Option>
                <Option value="10:00">10:00</Option>
              </Select>
            </Col>
          </Row>

          {/* DROP-OFF SECTION */}
          <Radio checked style={{ marginTop: 20 }}>Drop-Off</Radio>

          <Row gutter={16}>
            <Col span={8}>
              <Select placeholder="City" style={{ width: "100%" }}>
                <Option value="Hanoi">Hanoi</Option>
                <Option value="Ho Chi Minh">Ho Chi Minh</Option>
              </Select>
            </Col>

            <Col span={8}>
              <DatePicker placeholder="Select date" style={{ width: "100%" }} />
            </Col>

            <Col span={8}>
              <Select placeholder="Time" style={{ width: "100%" }}>
                <Option value="09:00">09:00</Option>
                <Option value="10:00">10:00</Option>
              </Select>
            </Col>
          </Row>
        </Space>
      </Card>

      {/* PAYMENT METHOD SECTION */}
      <Card>
        <Title level={4}>Payment Method</Title>
        <Text type="secondary">Please enter your payment method</Text>

        <Radio.Group
          onChange={(e) => setMethod(e.target.value)}
          value={method}
          style={{ width: "100%" }}
        >
          <Space direction="vertical" size="large" style={{ width: "100%", marginTop: 20 }}>

            {/* MoMo Option */}
            <Card>
              <Radio value="momo">
                <WalletOutlined style={{ marginRight: 6 }} />
                Momo Wallet
              </Radio>
            </Card>

            {/* Bank Transfer Option */}
            <Card>
              <Radio value="bank_transfer">
                <BankOutlined style={{ marginRight: 6 }} />
                Bank Transfer
              </Radio>
            </Card>

            {/* Cash Payment Option */}
            <Card>
              <Radio value="cash">
                <DollarOutlined style={{ marginRight: 6 }} />
                Cash on Delivery
              </Radio>
            </Card>

          </Space>
        </Radio.Group>
      </Card>

      {/* CONFIRMATION SECTION */}
      <Card>
        <Title level={4}>Confirmation</Title>
        <Text type="secondary">
          We are getting to the end. Just few clicks and your rental is ready!
        </Text>

        <Space direction="vertical" style={{ width: "100%", marginTop: 20 }}>
          <Checkbox>I agree with sending marketing emails</Checkbox>
          <Checkbox>I agree with the terms and conditions</Checkbox>

          <Button
            type="primary"
            size="large"
            block
            onClick={handleRentNow}
            style={{ backgroundColor: "#3563E9" }}
          >
            Rent Now
          </Button>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Text strong>
              <LockOutlined style={{ marginRight: 6 }} />
              All your data are safe
            </Text>
            <br />
            <Text type="secondary">
              We are using the most advanced security to provide you the best experience ever.
            </Text>
          </div>
        </Space>
      </Card>
    </Space>
  );
};

export default PaymentForm;