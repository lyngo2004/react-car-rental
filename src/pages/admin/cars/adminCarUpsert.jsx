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
        <Row gutter={[24, 16]}>
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

          {/* Capacity */}
          <Col span={12}>
            <Form.Item
              label={<Text style={labelStyle}>Capacity</Text>}
              name="capacity"
            >
              <Input placeholder="Seats" />
            </Form.Item>
          </Col>

          {/* Model */}
          <Col span={12}>
            <Form.Item
              label={<Text style={labelStyle}>Model</Text>}
              name="model"
            >
              <Input placeholder="Model" />
            </Form.Item>
          </Col>

          {/* Price */}
          <Col span={12}>
            <Form.Item
              label={<Text style={labelStyle}>Price Per Day</Text>}
              name="pricePerDay"
            >
              <Input prefix="$" placeholder="Price" />
            </Form.Item>
          </Col>

          {/* Car Type */}
          <Col span={12}>
            <Form.Item
              label={<Text style={labelStyle}>Car Type</Text>}
              name="carType"
            >
              <Select placeholder="Car Type">
                <Option value="sedan">Sedan</Option>
                <Option value="suv">SUV</Option>
                <Option value="hatchback">Hatchback</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* License Plate */}
          <Col span={12}>
            <Form.Item
              label={<Text style={labelStyle}>License Plate</Text>}
              name="licensePlate"
            >
              <Input placeholder="License Plate" />
            </Form.Item>
          </Col>

          {/* Available Date */}
          <Col span={12}>
            <Form.Item label={<Text style={labelStyle}>Available Date</Text>}>
              <Input.Group compact>
                <Form.Item name="availableDate" noStyle>
                  <DatePicker style={{ width: "60%" }} />
                </Form.Item>
                <Form.Item name="availableTime" noStyle>
                  <TimePicker style={{ width: "40%" }} />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Col>

          {/* Empty col for balance */}
          <Col span={12} />

          {/* Image Upload */}
          <Col span={24}>
            <Form.Item label={<Text style={labelStyle}>Car Image</Text>}>
              <Upload.Dragger
                multiple={false}
                beforeUpload={() => false}
              >
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