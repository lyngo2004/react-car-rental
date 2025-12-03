import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Skeleton } from "antd";

import carApi from "../utils/carApi";
import CarDetailSection from "../components/car/carDetailSection";
import CarCard from "../components/car/carCard";

const CarDetailPage = () => {
    const { carId } = useParams();
    const location = useLocation();

    // lấy car từ navigate state (nếu có)
    const rentalInfo = location.state?.rentalInfo || null;
    
    console.log("Rental info nhận tại CarDetail:", rentalInfo);

    const [car, setCar] = useState(location.state?.car || null);
    const [cars, setCars] = useState(location.state?.cars || []); // danh sách xe cũ để render “Recent Car”
    const [loading, setLoading] = useState(!car);

    // Load detail khi vào trực tiếp (F5)
    useEffect(() => {
        console.log("GO DETAIL:", car.CarId);

        const fetchCarDetail = async () => {
            setLoading(true);
            const res = await carApi.getCarById(carId);
            setLoading(false);

            if (res?.EC === 0) setCar(res.DT);
            else console.error("Failed to load car detail:", res?.EM);
        };

        fetchCarDetail();
    }, [carId]);

    // Nếu F5 mà không có list “recent cars”, thì load lại toàn bộ
    useEffect(() => {
        const fetchCars = async () => {
            const res = await carApi.getAllCars();
            if (res?.EC === 0) setCars(res.DT);
        };

        if (!cars || cars.length === 0) {
            fetchCars();
        }
    }, [cars]);

    if (loading || !car) {
        return (
            <div style={{ padding: 40 }}>
                <Skeleton active />
            </div>
        );
    }

    return (
        <div
            style={{
                padding: "30px 20px",
                background: "#F9F9F9",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div style={{ width: "100%", padding: 30 }}>
                {/* PHẦN CHÍNH: HERO DETAIL */}
                <CarDetailSection car={car} rentalInfo={rentalInfo} />

                {/* Recommendation Cars */}
                {/* Có thể tạo một danh sách khác nhau tùy bạn muốn */}
                <div style={{ marginTop: 66, justifyItems: "center" }}>
                    <h3 style={{ fontWeight: "bold", marginBottom: -11 }}>Recommendation Cars</h3>
                    <CarCard cars={cars.slice(0,3)} filters={{}} />
                </div>
            </div>
        </div>
    );
};

export default CarDetailPage;
