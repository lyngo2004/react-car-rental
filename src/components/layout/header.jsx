import React, { useEffect, useState } from "react";
import { Dropdown, Menu } from "antd";
import {
    SearchOutlined,
    SlidersOutlined,
    HeartOutlined,
    BellOutlined,
    SettingOutlined,
    UserOutlined,
    LogoutOutlined,
    CarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = ({ isAdmin = false }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    const userMenu = (
        <Menu>
            <Menu.Item
                key="profile"
                icon={<UserOutlined />}
                onClick={() => navigate("/profile")}
            >
                Profile
            </Menu.Item>

            {!isAdmin && (
                <Menu.Item
                    key="rentals"
                    icon={<CarOutlined />}
                    onClick={() => navigate("/my-rentals")}
                >
                    My Rentals
                </Menu.Item>
            )}

            <Menu.Divider />

            <Menu.Item
                key="logout"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
            >
                Log out
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="header">
            {/* LOGO */}
            <div className="header-logo" onClick={() => navigate("/car")}>
                MORENT
            </div>

            {/* SEARCH */}
            <div className="header-search-wrapper">
                <div className="header-search-box">
                    <SearchOutlined />
                    <input placeholder="Search something here" />
                    <SlidersOutlined />
                </div>
            </div>

            {/* ICONS */}
            <div className="header-icons">
                <div className="icon-box">
                    <HeartOutlined />
                </div>

                <div className="icon-box">
                    <BellOutlined />
                    {/* {filteredNotifications.length > 0 && (
                        <span className="red-dot" />
                    )} */}
                </div>

                <div className="icon-box">
                    <SettingOutlined />
                </div>

                <Dropdown overlay={userMenu} placement="bottomRight" trigger={["click"]}>
                    <img
                        src="https://i.pravatar.cc/300"
                        alt="avatar"
                        className="header-avatar"
                    />
                </Dropdown>
            </div>
        </div>
    );
};

export default Header;
