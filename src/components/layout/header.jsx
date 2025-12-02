import React from "react";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import {
    SearchOutlined,
    SlidersOutlined,
    HeartOutlined,
    BellOutlined,
    SettingOutlined,
} from "@ant-design/icons";

const Header = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                width: "100%",
                padding: "20px 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#FFFFFF",
                borderBottom: "1px solid #f1f1f1",
            }}
        >
            {/* ========================= LOGO ========================= */}
            <div
                onClick={() => navigate("/car")}
                style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#3563E9",
                    letterSpacing: 1,
                    cursor: "pointer",
                    userSelect: "none",
                }}
            >
                MORENT
            </div>

            {/* ======================= SEARCH BAR ======================= */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    padding: "0 40px",
                }}
            >
                <div
                    style={{
                        width: "60%",
                        display: "flex",
                        alignItems: "center",
                        background: "#fff",
                        border: "1px solid #E3E3E3",
                        borderRadius: 30,
                        padding: "8px 16px",
                    }}
                >
                    <SearchOutlined style={{ fontSize: 18, color: "#555" }} />
                    <input
                        type="text"
                        placeholder="Search something here"
                        style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            marginLeft: 10,
                            fontSize: 16,
                        }}
                    />
                    <SlidersOutlined style={{ fontSize: 20, color: "#555" }} />
                </div>
            </div>

            {/* ========================= ICONS ========================== */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                }}
            >
                {/* Heart icon */}
                <div style={iconBoxStyle}>
                    <HeartOutlined />
                </div>

                {/* Bell with red dot */}
                <div style={{ ...iconBoxStyle, position: "relative" }}>
                    <BellOutlined />
                    <span
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: "red",
                            position: "absolute",
                            top: 6,
                            right: 6,
                        }}
                    ></span>
                </div>

                {/* Setting */}
                <div style={iconBoxStyle}>
                    <SettingOutlined />
                </div>

                {/* Avatar */}
                <img
                    src="https://i.pravatar.cc/300"
                    alt="avatar"
                    style={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        objectFit: "cover",
                    }}
                />
            </div>
        </div >
    );
};

const iconBoxStyle = {
    width: 42,
    height: 42,
    borderRadius: "50%",
    border: "1px solid #E8E8E8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: 18,
};

export default Header;
