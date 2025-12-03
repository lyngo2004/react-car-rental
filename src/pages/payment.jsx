import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col } from "antd";
import dayjs from "dayjs";
import userApi from "../utils/userApi";

import PaymentForm from "../components/payment/paymentForm";
import RentalSummary from "../components/payment/rentalSummary";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ---- Load Rental Info ----
  const rentalInfoFromState = location.state?.rentalInfo || null;

  const [rentalInfo, setRentalInfo] = useState(() => ({
    pickupLocation: rentalInfoFromState?.pickupLocation || null,
    pickupDate: rentalInfoFromState?.pickupDate
      ? dayjs(rentalInfoFromState.pickupDate)
      : null,
    pickupTime: rentalInfoFromState?.pickupTime || null,

    dropoffLocation: rentalInfoFromState?.dropoffLocation || null,
    dropoffDate: rentalInfoFromState?.dropoffDate
      ? dayjs(rentalInfoFromState.dropoffDate)
      : null,
    dropoffTime: rentalInfoFromState?.dropoffTime || null,
  }));

  // ---- Load Customer Info ----
  const [customer, setCustomer] = useState(undefined);

  useEffect(() => {
    const fetchCustomer = async () => {
      const res = await userApi.getMe();
      if (res?.EC === 0) {
        setCustomer(res.DT);
      } else {
        // not authenticated or error
        setCustomer(null);
      }
    };
    fetchCustomer();
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (customer === null) navigate("/login");
  }, [customer]);

  // ---- Load Car ----
  const [car, setCar] = useState(undefined);

  useEffect(() => {
    if (location.state?.car) {
      setCar(location.state.car);
    } else {
      setCar(null);
    }
  }, [location.state]);

  useEffect(() => {
    if (car === null) navigate("/car");
  }, [car]);

  if (car === undefined) return <div>Loading...</div>;

  if (customer === undefined) return <div>Loading...</div>;

  return (
    <div style={{ padding: "40px 80px", background: "#F6F7F9" }}>
      <Row gutter={32}>
        <Col xs={24} lg={16}>
          <PaymentForm
            rentalInfo={rentalInfo}
            setRentalInfo={setRentalInfo}
            customer={customer}
            car={car}
          />
        </Col>

        <Col xs={24} lg={8}>
          <RentalSummary car={car} rentalInfo={rentalInfo} />
        </Col>
      </Row>
    </div>
  );
};

export default PaymentPage;