import React from "react";
import { Form, Input, Button, Checkbox, Typography, notification } from "antd";
import { useNavigate } from "react-router-dom";
import userApi from "../../utils/userApi";
import "./auth.css";

const { Title } = Typography;

const RegisterPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { username, email, password } = values;

        const res = await userApi.register(username, email, password);

        if (res?.EC === 0 || res?.success) {
            notification.success({
                message: "Register",
                description: res?.EM || res?.message || "User created successfully!"
            });
            navigate("/login");
        } else {
            notification.error({
                message: "Register",
                description: res?.EM || res?.message || "Something went wrong!"
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-left" />

            <div className="login-right">
                <div className="login-header">
                    <Title level={2} className="login-title">WELCOME</Title>
                    <p className="login-sub">Create an account to continue</p>

                    <div className="login-tabs">
                        <Button
                            className="tab-normal"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>

                        <Button type="primary" className="tab-active">
                            Register
                        </Button>
                    </div>
                </div>

                <Form layout="vertical" onFinish={onFinish} className="login-form">
                    <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[{ required: true, message: "Please enter email!" }]}
                    >
                        <Input placeholder="Enter your Email" size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: "Please enter username!" }]}
                    >
                        <Input placeholder="Enter your Username" size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please enter password!" }]}
                    >
                        <Input.Password placeholder="Enter your Password" size="large" />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                        className="btn-login"
                    >
                        Register
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default RegisterPage;
