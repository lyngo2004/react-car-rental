import React from "react";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

// Main components for this page (payment section on the left, summary on the right)
import PaymentForm from "../components/payment/paymentForm";
import RentalSummary from "../components/payment/rentalSummary";

import { Row, Col } from "antd";

/**
 * PaymentPage
 * This is the main page container for the Payment flow.
 * Layout:
 *   - Header (top navigation bar)
 *   - PaymentForm on the left (billing info, rental info, payment method)
 *   - RentalSummary on the right (car info + price calc)
 *   - Footer at bottom
 */
const PaymentPage = () => {
  return (
    <>
      {/* Body section with gray background */}
      <div style={{ padding: "40px 80px", background: "#F6F7F9" }}>
        <Row gutter={32}>
          {/* Payment form section */}
          <Col xs={24} lg={16}>
            <PaymentForm />
          </Col>

          {/* Rental summary section */}
          <Col xs={24} lg={8}>
            <RentalSummary />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PaymentPage;