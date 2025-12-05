import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, message, notification } from "antd";
import dayjs from "dayjs";
import userApi from "../utils/userApi";
import rentalApi from "../utils/rentalApi";

import PaymentForm from "../components/payment/paymentForm";
import RentalSummary from "../components/payment/rentalSummary";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [checkoutCompleted, setCheckoutCompleted] = useState(false);

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

  const [billing, setBilling] = useState({
    fullName: "",
    phone: "",
    address: "",
    driverLicense: ""
  });
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [confirm1, setConfirm1] = useState(false);
  const [confirm2, setConfirm2] = useState(false);

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

  const handleCheckout = async () => {
    if (!rentalInfo || !car) {
      notification.error({
        message: "Checkout Error",
        description: "Missing information.",
      });
      return;
    }

    if (!billing.fullName || !billing.phone || !billing.address || !billing.driverLicense) {
      notification.error({
        message: "Invalid Billing Information",
        description: "Please fill out all billing fields.",
      });
      return;
    }

    if (!paymentMethod) {
      notification.error({
        message: "Missing Payment Method",
        description: "Please select 1 payment method."
      });
      return;
    }

    if (!confirm1 || !confirm2) {
      notification.error({
        message: "Missing Confirmation",
        description: "You must agree to all confirmations before checkout."
      });
      return;
    }

    const payload = {
      CarId: car.CarId,
      pickupLocation: rentalInfo.pickupLocation,
      pickupDate: rentalInfo.pickupDate?.format("YYYY-MM-DD"),
      pickupTime: rentalInfo.pickupTime,

      dropoffLocation: rentalInfo.dropoffLocation,
      dropoffDate: rentalInfo.dropoffDate?.format("YYYY-MM-DD"),
      dropoffTime: rentalInfo.dropoffTime,
      billing,
      paymentMethod,
    };

    const res = await rentalApi.createRental(payload);

    if (res?.EC === 0) {
      notification.success({
        message: "Checkout Successful",
        description: res.EM || "Your rental has been created successfully.",
        placement: "center",
        duration: 8,
      });

      setCheckoutCompleted(true);   // ẩn UI
      navigate("/car");
    } else {
      message.error(res?.EM || "Checkout failed.");
    }
  };

  if (car === undefined || customer === undefined) return <div>Loading...</div>;

  return (
    <>
      {!checkoutCompleted ? (
        <div style={{ padding: "40px 80px", background: "#F6F7F9" }}>
          <Row gutter={32}>
            <Col xs={24} lg={16}>
              <PaymentForm
                rentalInfo={rentalInfo}
                setRentalInfo={setRentalInfo}
                billing={billing}
                setBilling={setBilling}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                confirm1={confirm1}
                confirm2={confirm2}
                setConfirm1={setConfirm1}
                setConfirm2={setConfirm2}
                customer={customer}
                car={car}
                onCheckout={handleCheckout}
              />
            </Col>

            <Col xs={24} lg={8}>
              <RentalSummary car={car} rentalInfo={rentalInfo}
                onCheckout={handleCheckout} />
            </Col>
          </Row>
        </div>
      ) : null}
    </>
  );
};

export default PaymentPage;