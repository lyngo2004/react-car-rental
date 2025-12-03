import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Col } from "antd";
import dayjs from "dayjs";

import PaymentForm from "../components/payment/paymentForm";
import RentalSummary from "../components/payment/rentalSummary";

const PaymentPage = () => {

  const { state } = useLocation();
  const car = state?.car || null;

  // rental info từ CarPage hoặc CarDetail
  const rentalInfoFromState = state?.rentalInfo || null;

  // payment state (editable)
  const [rentalInfo, setRentalInfo] = useState({
    pickupLocation: rentalInfoFromState?.pickupLocation || null,
    pickupDate: rentalInfoFromState?.pickupDate ? dayjs(rentalInfoFromState.pickupDate) : null,
    pickupTime: rentalInfoFromState?.pickupTime || null,
    dropoffLocation: rentalInfoFromState?.dropoffLocation || null,
    dropoffDate: rentalInfoFromState?.dropoffDate ? dayjs(rentalInfoFromState.dropoffDate) : null,
    dropoffTime: rentalInfoFromState?.dropoffTime || null,
  });

  console.log("Rental info gửi sang PaymentForm:", rentalInfo);


  return (
    <div style={{ padding: "40px 80px", background: "#F6F7F9" }}>
      <Row gutter={32}>
        <Col xs={24} lg={16}>
          <PaymentForm rentalInfo={rentalInfo} setRentalInfo={setRentalInfo} />
        </Col>

        <Col xs={24} lg={8}>
          <RentalSummary car={car} rentalInfo={rentalInfo} />
        </Col>
      </Row>
    </div>
  );
};

export default PaymentPage;
