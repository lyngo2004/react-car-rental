import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import userApi from '../utils/userApi';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { username, email, password } = values;

        const res = await userApi.register(username, email, password);

        // Vì axios trả về: res.data.success
        if (res?.success) {
            notification.success({
                message: "Create User",
                description: res.data.message || "User created successfully!"
            });
            navigate('/login');
        } else {
            notification.error({
                message: "Create User",
                description: res?.data?.message || "Something went wrong!"
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
                    label="Email Address"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

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
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegisterPage;