import React from "react";
import { Form, Input, Button, Checkbox, Typography, notification } from "antd";
import { useNavigate } from "react-router-dom";
import userApi from "../../utils/userApi";
import "./auth.css"; // nhớ tạo file này

const { Title } = Typography;

const LoginPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { username, password } = values;
        const res = await userApi.login(username, password);

        if (res?.EC === 0) {
            localStorage.setItem("accessToken", res.DT.accessToken);

            notification.success({
                message: "Login",
                description: res.EM || "Login successfully!",
            });

            navigate("/car");
        } else {
            notification.error({
                message: "Login",
                description: res?.EM ?? "Something went wrong!",
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-left" />

            <div className="login-right">
                <div className="login-header">
                    <Title level={2} className="login-title">WELCOME</Title>
                    <p className="login-sub">Please log in to continue!</p>

                    <div className="login-tabs">
                        <Button type="primary" className="tab-active">Login</Button>
                        <Button
                            className="tab-normal"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </Button>
                    </div>
                </div>

                <Form layout="vertical" onFinish={onFinish} className="login-form">
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

                    <div className="login-extra">
                        <Checkbox>Remember me</Checkbox>
                        <a className="forgot">Forgot Password?</a>
                    </div>

                    <Button type="primary" htmlType="submit" block size="large" className="btn-login">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
