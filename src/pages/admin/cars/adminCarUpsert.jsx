import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Upload,
  Row,
  Col,
  DatePicker,
  TimePicker,
  Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const { Option } = Select;
const { Title, Text } = Typography;

const labelStyle = {
  fontSize: 16,
  fontWeight: 600,
};

const AdminCarUpsert = ({ mode }) => {
  const { id } = useParams();      // lấy từ URL
  const isEdit = Boolean(id);   

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    // TODO: call create / update API
  };

  return (
    <Card
      title={
        <Title level={4} style={{ margin: 0 }}>
          Add/Edit Car
        </Title>
      }
      extra={
        <Text type="secondary" style={{ fontSize: 14 }}>
          Please enter the car details below
        </Text>
      }
      style={{ borderRadius: 16 }}
      bodyStyle={{ padding: 32 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={[24, 5]}>
          {/* Car ID (Edit only) */}
          {isEdit && (
            <Col span={12}>
              <Form.Item
                label={<Text style={labelStyle}>Car ID</Text>}
                name="carId"
              >
                <Input disabled />
              </Form.Item>
            </Col>
          )}

          {/* Brand */}
          <Col span={12}>
            <Form.Item
              label={<Text style={labelStyle}>Brand</Text>}
              name="brand"
              rules={[{ required: true, message: "Brand is required" }]}
            >
              <Input placeholder="Brand" />
            </Form.Item>
          </Col>

          {/* Model */}
          <Col span={12}>
            <Form.Item
              label={<Text style={labelStyle}>Model</Text>}
              name="model"
              rules={[{ required: true, message: "Model is required" }]}
            >
              <Input placeholder="Model" />
            </Form.Item>
          </Col>

          {/* Car Type */}
          <Col span={12}>
            <Form.Item
              label={<Text style={labelStyle}>Car Type</Text>}
              name="carType"
              rules={[{ required: true, message: "Car type is required" }]}
            >
              <Select placeholder="Car Type">
                <Option value="sedan">Sedan</Option>
                <Option value="suv">SUV</Option>
                <Option value="hatchback">Hatchback</Option>
                <Option value="crossover">Crossover</Option>
                <Option value="convertible">Convertible</Option>
                <Option value="coupe">Coupe</Option>
                <Option value="minivan">Minivan</Option>
                <Option value="pickup">Pickup Truck</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Manufacture Year */}
          <Col span={12}>
            <Form.Item
              label={<Text style={labelStyle}>Manufacture Year</Text>}
              name="manufactureYear"
            >
              <Input placeholder="e.g. 2021" />
            </Form.Item>
          </Col>

          {/* Car Status */}
          <Col span={12}>
            <Form.Item
              label={<Text style={labelStyle}>Car Status</Text>}
              name="carStatus"
            >
              <Select placeholder="Status">
                <Option value="available">Available</Option>
                <Option value="rented">Rented</Option>
                <Option value="maintenance">Maintenance</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Price */}
          <Col span={12}>
            <Form.Item
              label={<Text style={labelStyle}>Price Per Day</Text>}
              name="pricePerDay"
              rules={[{ required: true, message: "Price is required" }]}
            >
              <Input prefix="$" placeholder="Price" />
            </Form.Item>
          </Col>

          {/* Mileage */}
          <Col span={12}>
            <Form.Item
              label={<Text style={labelStyle}>Mileage</Text>}
              name="mileage"
            >
              <Input placeholder="km" />
            </Form.Item>
          </Col>

          {/* Capacity */}
          <Col span={12}>
            <Form.Item
              label={<Text style={labelStyle}>Capacity</Text>}
              name="capacity"
            >
              <Input placeholder="Seats" />
            </Form.Item>
          </Col>

          {/* Color */}
          <Col span={12}>
            <Form.Item
              label={<Text style={labelStyle}>Color</Text>}
              name="color"
            >
              <Input placeholder="Color" />
            </Form.Item>
          </Col>

          {/* License Plate */}
          <Col span={12}>
            <Form.Item
              label={<Text style={labelStyle}>License Plate</Text>}
              name="licensePlate"
              rules={[{ required: true, message: "License plate is required" }]}
            >
              <Input placeholder="License Plate" />
            </Form.Item>
          </Col>

          {/* Description */}
          <Col span={12}>
            <Form.Item
              label={<Text style={labelStyle}>Description</Text>}
              name="description"
            >
              <Input.TextArea rows={2} placeholder="Description" />
            </Form.Item>
          </Col>

          {/* Image Upload */}
          <Col span={24}>
            <Form.Item label={<Text style={labelStyle}>Car Image</Text>}>
              <Upload.Dragger multiple={false} beforeUpload={() => false}>
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p><Text strong>Drag & drop</Text> or click to upload</p>
                <p className="ant-upload-hint">
                  Supports JPG, PNG (Max 5MB)
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Col>

        </Row>


        {/* Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 24,
          }}
        >
          
          <Button danger disabled={!isEdit}>
            Delete
          </Button>
          
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default AdminCarUpsert;