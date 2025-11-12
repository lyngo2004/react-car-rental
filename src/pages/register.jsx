//src\pages\register.jsx
import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { creatUserApi } from '../utils/api';

const RegisterPage = () => {
    const onFinish = async (values) => {
        const { username, email, password } = values;
        const res = await creatUserApi(username, email, password);

        if (res?.success) {
            notification.success({
                message: "Create User",
                description: res.message || "User created successfully!",
            });
        } else {
            notification.error({
                message: "Create User",
                description: res?.message || "Something went wrong!",
            });
        }

        console.log('>> Success:', values);
    }
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

    )
}

export default RegisterPage;