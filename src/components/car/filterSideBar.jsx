import React, { useState } from "react";
import { Checkbox, Slider, Typography } from "antd";

const { Title, Text } = Typography;

const FilterSideBar = () => {
    const [price, setPrice] = useState(100);

    return (
        <div
            style={{
                width: 250,
                background: "#fff",
                padding: 30,
            }}
        >
            {/*  TYPE */}
            <div style={{ marginBottom: 30 }}>
                <Title level={5} style={{ marginBottom: 15, color: "#90A3BF" }}>
                    TYPE
                </Title>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <Checkbox defaultChecked>Sport (10)</Checkbox>
                    <Checkbox defaultChecked>SUV (12)</Checkbox>
                    <Checkbox>MPV (16)</Checkbox>
                    <Checkbox>Sedan (20)</Checkbox>
                    <Checkbox>Coupe (14)</Checkbox>
                    <Checkbox>Hatchback (14)</Checkbox>
                </div>
            </div>

            {/* CAPACITY */}
            <div style={{ marginBottom: 30 }}>
                <Title level={5} style={{ marginBottom: 15, color: "#90A3BF" }}>
                    CAPACITY
                </Title>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <Checkbox defaultChecked>2 Person (10)</Checkbox>
                    <Checkbox>4 Person (14)</Checkbox>
                    <Checkbox>6 Person (12)</Checkbox>
                    <Checkbox defaultChecked>8 or More (16)</Checkbox>
                </div>
            </div>

            {/* PRICE */}
            <div>
                <Title level={5} style={{ marginBottom: 15, color: "#90A3BF" }}>
                    PRICE
                </Title>

                <Slider
                    min={0}
                    max={100}
                    value={price}
                    onChange={(value) => setPrice(value)}
                    trackStyle={{ backgroundColor: "#3563E9", height: 6 }}
                    handleStyle={{
                        borderColor: "#3563E9",
                        backgroundColor: "#3563E9",
                        width: 16,
                        height: 16,
                    }}
                />

                <Text style={{ color: "#1A202C", fontSize: 16 }}>
                    Max. ${price}.00
                </Text>
            </div>
        </div>
    );
};

export default FilterSideBar;
