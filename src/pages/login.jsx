import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import userApi from '../utils/userApi';

const LoginPage = () => {

    const navigate = useNavigate();

    const onFinish = async (values) => {

        const { username, password } = values;
        const res = await userApi.login(username, password);

        // debugger;

        if (res?.EC === 0) {
            // LẤY TOKEN ĐÚNG
            localStorage.setItem("accessToken", res.DT.accessToken);

            notification.success({
                message: "Login",
                description: res.EM || "Login successfully!",
            });

            navigate('/car');
        } else {
            notification.error({
                message: "Login",
                description: res?.EM ?? "Something went wrong!",
            });
        }
    };

    return (
        <div style={{ margin: 50 }}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
            >

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;
