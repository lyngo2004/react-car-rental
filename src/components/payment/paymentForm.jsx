import React, { useState, useEffect } from "react";
import {
  Card, Row, Col, Select, DatePicker, Radio, Space, Typography,
  Input, Button, Checkbox
} from "antd";

import {
  WalletOutlined,
  BankOutlined,
  DollarOutlined,
  LockOutlined
} from "@ant-design/icons";

import commonApi from "../../utils/commonApi";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

const { Title, Text } = Typography;
const { Option } = Select;

const PaymentForm = ({ rentalInfo, setRentalInfo, customer, car }) => {

  const [locations, setLocations] = useState([]);
  const [times, setTimes] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [billing, setBilling] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
  });

  const [method, setMethod] = useState("momo");

  useEffect(() => {
    if (!customer) return;

    setBilling(prev => ({
      ...prev,
      fullName: customer.FullName || "",
      phone: customer.Phone || "",
      address: customer.Address || "",
    }));
  }, [customer]);

  // FETCH LOCATIONS + TIMES
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingLocations(true);
        setLoadingTimes(true);

        const locRes = await commonApi.getLocations();
        const timeRes = await commonApi.getTimeSlots();

        if (Array.isArray(locRes?.DT)) setLocations(locRes.DT);
        if (Array.isArray(timeRes?.DT)) setTimes(timeRes.DT);

      } finally {
        setLoadingLocations(false);
        setLoadingTimes(false);
      }
    };
    fetchData();
  }, []);

  // RESET dropoff when pickup changes
  useEffect(() => {
    if (!rentalInfo) return;

    if (!rentalInfo.pickupDate || !rentalInfo.pickupTime) return;

    if (!rentalInfo._lastPickup) {
      setRentalInfo(prev => ({
        ...prev,
        _lastPickup: `${rentalInfo.pickupDate}-${rentalInfo.pickupTime}`
      }));
      return;
    }

    // Nếu user thay đổi pickup → reset dropoff
    const current = `${rentalInfo.pickupDate}-${rentalInfo.pickupTime}`;
    if (rentalInfo._lastPickup !== current) {
      setRentalInfo(prev => ({
        ...prev,
        dropoffDate: null,
        dropoffTime: null,
        _lastPickup: current
      }));
    }
  }, [rentalInfo.pickupDate, rentalInfo.pickupTime]);


  // DISABLED pick-up time
  const disabledPickupTime = (timeString) => {
    if (!rentalInfo.pickupDate) return false;

    const today = dayjs().format("YYYY-MM-DD");
    const selected = rentalInfo.pickupDate.format("YYYY-MM-DD");

    if (selected === today) {
      const now = dayjs();
      const time = dayjs(timeString, "HH:mm");
      return time.isSameOrBefore(now);
    }
    return false;
  };

  // DISABLED drop-off date
  const disabledDropoffDate = (current) => {
    if (!rentalInfo.pickupDate) return true;
    return current && current < rentalInfo.pickupDate.startOf("day");
  };

  // -------------------------------
  // DISABLED drop-off time (same day)
  // -------------------------------

  const sameDay =
    rentalInfo &&
    rentalInfo.dropoffDate &&
    rentalInfo.pickupDate &&
    rentalInfo.dropoffDate.format("YYYY-MM-DD") === rentalInfo.pickupDate.format("YYYY-MM-DD");

  const disabledDropoffTime = (timeString) => {
    if (!rentalInfo.pickupDate || !rentalInfo.pickupTime || !rentalInfo.dropoffDate)
      return false;

    if (sameDay) {
      return dayjs(timeString, "HH:mm").isSameOrBefore(
        dayjs(rentalInfo.pickupTime, "HH:mm")
      );
    }
    return false;
  };

  const handleRentNow = () => {
    console.log("SUBMIT RENT: ", rentalInfo);
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>

      {/* BILLING INFO */}
      <Card>
        <Title level={4}>Billing Info</Title>
        <Text type="secondary">Please enter your billing info</Text>

        <Row gutter={20} style={{ marginTop: 20 }}>
          <Col span={12}><Input placeholder="Your name" /></Col>
          <Col span={12}><Input placeholder="Phone number" /></Col>

          <Col span={12} style={{ marginTop: 16 }}>
            <Input placeholder="Address" />
          </Col>

          <Col span={12} style={{ marginTop: 16 }}>
            <Input placeholder="Town / City" />
          </Col>
        </Row>
      </Card>


      {/* RENTAL INFO */}
      <Card>
        <Title level={4}>Rental Info</Title>
        <Text type="secondary">Please select your rental date</Text>

        <Space direction="vertical" style={{ width: "100%", marginTop: 20 }}>

          {/* PICK-UP */}
          <Radio checked>Pick-Up</Radio>

          <Row gutter={16}>
            <Col span={8}>
              <Select
                placeholder="Location"
                style={{ width: "100%" }}
                value={rentalInfo.pickupLocation}
                loading={loadingLocations}
                onChange={(value) =>
                  setRentalInfo(prev => ({ ...prev, pickupLocation: value }))
                }
              >
                {locations.map((loc) => (
                  <Option key={loc} value={loc}>{loc}</Option>
                ))}
              </Select>
            </Col>

            <Col span={8}>
              <DatePicker
                placeholder="Date"
                style={{ width: "100%" }}
                value={rentalInfo.pickupDate}
                onChange={(date) =>
                  setRentalInfo(prev => ({ ...prev, pickupDate: date }))
                }
                disabledDate={(cur) => cur && cur < dayjs().startOf("day")}
              />
            </Col>

            <Col span={8}>
              <Select
                placeholder="Time"
                style={{ width: "100%" }}
                value={rentalInfo.pickupTime}
                disabled={!rentalInfo.pickupDate}
                onChange={(value) =>
                  setRentalInfo(prev => ({ ...prev, pickupTime: value }))
                }
              >
                {times.map((t) => (
                  <Option key={t} value={t} disabled={disabledPickupTime(t)}>
                    {t}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>


          {/* DROP-OFF */}
          <Radio checked style={{ marginTop: 20 }}>Drop-Off</Radio>

          <Row gutter={16}>
            <Col span={8}>
              <Select
                placeholder="Location"
                style={{ width: "100%" }}
                value={rentalInfo.dropoffLocation}
                disabled={!rentalInfo.pickupLocation}
                onChange={(value) =>
                  setRentalInfo(prev => ({ ...prev, dropoffLocation: value }))
                }
              >
                {locations.map((loc) => (
                  <Option key={loc} value={loc}>{loc}</Option>
                ))}
              </Select>
            </Col>

            <Col span={8}>
              <DatePicker
                placeholder="Date"
                style={{ width: "100%" }}
                value={rentalInfo.dropoffDate}
                onChange={(date) =>
                  setRentalInfo(prev => ({ ...prev, dropoffDate: date }))
                }
                disabled={!rentalInfo.pickupDate}
                disabledDate={disabledDropoffDate}
              />
            </Col>

            <Col span={8}>
              <Select
                placeholder="Time"
                style={{ width: "100%" }}
                value={rentalInfo.dropoffTime}
                disabled={!rentalInfo.dropoffDate}
                onChange={(value) =>
                  setRentalInfo(prev => ({ ...prev, dropoffTime: value }))
                }
              >
                {times.map((t) => (
                  <Option key={t} value={t} disabled={disabledDropoffTime(t)}>
                    {t}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Space>
      </Card>


      {/* PAYMENT METHOD */}
      <Card>
        <Title level={4}>Payment Method</Title>
        <Text type="secondary">Please enter your payment method</Text>

        <Radio.Group
          onChange={(e) => setMethod(e.target.value)}
          value={method}
          style={{ width: "100%" }}
        >
          <Space direction="vertical" size="large" style={{ width: "100%", marginTop: 20 }}>

            <Card>
              <Radio value="momo">
                <WalletOutlined style={{ marginRight: 6 }} />
                Momo Wallet
              </Radio>
            </Card>

            <Card>
              <Radio value="bank_transfer">
                <BankOutlined style={{ marginRight: 6 }} />
                Bank Transfer
              </Radio>
            </Card>

            <Card>
              <Radio value="cash">
                <DollarOutlined style={{ marginRight: 6 }} />
                Cash on Delivery
              </Radio>
            </Card>

          </Space>
        </Radio.Group>
      </Card>


      {/* CONFIRMATION */}
      <Card>
        <Title level={4}>Confirmation</Title>

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
              We use advanced security to protect your data.
            </Text>
          </div>
        </Space>
      </Card>
    </Space>
  );
};

export default PaymentForm;
