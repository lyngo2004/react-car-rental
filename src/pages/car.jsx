import React, { useEffect, useState } from "react";
import { Select, DatePicker } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import carApi from "../utils/carApi";
import FilterSideBar from "../components/car/filterSideBar";
import CarCard from "../components/car/carCard";

const CarPage = () => {
    const [cars, setCars] = useState([]);

    const fetchCars = async () => {
        const res = await carApi.getAllCars();
        if (Array.isArray(res)) {
            setCars(res);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <div style={{ display: "flex", gap: 20, background: "#F9F9F9", minHeight: "100vh" }}>
            <FilterSideBar />



            {/* WRAPPER GIỚI HẠN CHIỀU RỘNG = width 3 cards */}
            <div style={{
                flex: 1,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>

                {/* PickDrop Bar */}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        gap: 20,
                        padding: 20,
                        background: "#fff",
                        borderRadius: 12,
                        width: "100%",
                        marginTop: 30,
                    }}
                >
                    {/* Pick Up */}
                    <div style={{ flex: 1 }}>
                        <h4 style={{ marginBottom: 10 }}>Pick - Up</h4>
                        <div style={{ display: "flex", gap: 10 }}>
                            <Select placeholder="Location" style={{ flex: 1 }} />
                            <DatePicker placeholder="Date" style={{ flex: 1 }} />
                            <Select placeholder="Time" style={{ flex: 1 }} />
                        </div>
                    </div>

                    {/* Swap */}
                    <div
                        style={{
                            width: 50,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <SwapOutlined
                            style={{
                                padding: 10,
                                borderRadius: "50%",
                                background: "#3563E9",
                                color: "#fff",
                                fontSize: 18,
                            }}
                        />
                    </div>

                    {/* Drop Off */}
                    <div style={{ flex: 1 }}>
                        <h4 style={{ marginBottom: 10 }}>Drop - Off</h4>
                        <div style={{ display: "flex", gap: 10 }}>
                            <Select placeholder="Location" style={{ flex: 1 }} />
                            <DatePicker placeholder="Date" style={{ flex: 1 }} />
                            <Select placeholder="Time" style={{ flex: 1 }} />
                        </div>
                    </div>
                </div>

                {/* Car Cards */}
                <CarCard cars={cars} />

            </div>


        </div>
    );
};

export default CarPage;