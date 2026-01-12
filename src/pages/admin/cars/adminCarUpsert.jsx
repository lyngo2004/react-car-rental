import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Upload,
  Row,
  Col,
  Typography,
  Space,
  Modal,
  Image,
  Divider,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import carAdminApi from "../../../utils/admin/carApi";

const { Title, Text } = Typography;

const CAR_STATUS_OPTIONS = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

const labelStyle = { fontWeight: 600 };

const AdminCarUpsert = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isDetailMode = Boolean(id);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(!isDetailMode);
  const [car, setCar] = useState(null);

  const isViewMode = isDetailMode && !isEditing;

  /* ================= FETCH DETAIL ================= */
  useEffect(() => {
    if (!isDetailMode) return;

    const fetchCar = async () => {
      setLoading(true);
      const res = await carAdminApi.getAdminCarById(id);
      setLoading(false);

      if (res?.EC === 0) {
        setCar(res.DT);
        form.setFieldsValue(res.DT);
      } else {
        notification.error({ message: "Failed to load car" });
        navigate("/admin/cars");
      }
    };

    fetchCar();
  }, [id]);

  /* ================= ACTIONS ================= */
  const handleBack = () => navigate("/admin/cars");

  const handleDelete = () => {
    Modal.confirm({
      title: "Delete this car?",
      content: "This action cannot be undone.",
      okText: "Delete",
      okButtonProps: { danger: true },
      onOk: async () => {
        setLoading(true);
        const res = await carAdminApi.deleteAdminCar(id);
        setLoading(false);

        if (res?.EC === 0) {
          notification.success({ message: "Car deleted" });
          navigate("/admin/cars");
        } else {
          notification.error({ message: res?.EM || "Delete failed" });
        }
      },
    });
  };

  const handleCancelEdit = () => {
    Modal.confirm({
      title: "Discard changes?",
      onOk: () => {
        form.setFieldsValue(car);
        setIsEditing(false);
      },
    });
  };

  /* ================= SUBMIT ================= */
  const onFinish = async (values) => {
    const formData = new FormData();

    // append all normal fields
    Object.keys(values).forEach((key) => {
      if (key !== "image" && values[key] !== undefined && values[key] !== null) {
        formData.append(key, values[key]);
      }
    });

    // append file
    const file = values.image?.[0]?.originFileObj;
    if (file) {
      formData.append("image", file); //  QUAN TRỌNG: key phải là "image"
    }

    setLoading(true);

    const res = isDetailMode
      ? await carAdminApi.updateAdminCar(id, formData)
      : await carAdminApi.createAdminCar(formData);

    setLoading(false);

    if (res?.EC === 0) {
      notification.success({
        message: isDetailMode ? "Updated successfully" : "Created successfully",
      });
      navigate("/admin/cars");
    } else {
      notification.error({ message: res?.EM || "Operation failed" });
    }
  };

  /* ================= RENDER ================= */
  return (
    <Card
      loading={loading}
      title={
        <div>
          <Title level={4} style={{ marginBottom: 0 }}>
            {isDetailMode ? "Car Details" : "Add New Car"}
          </Title>
          <Text type="secondary">
            {isViewMode
              ? "View only. Click Edit to modify."
              : "Fill in car information below."}
          </Text>
        </div>
      }
      extra={
        <Space>
          <Button onClick={handleBack}>Back</Button>

          {isViewMode && (
            <>
              <Button danger onClick={handleDelete}>
                Delete
              </Button>
              <Button type="primary" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            </>
          )}

          {!isViewMode && (
            <>
              <Button onClick={handleCancelEdit}>Cancel</Button>
              <Button type="primary" htmlType="submit" form="car-form">
                Save
              </Button>
            </>
          )}
        </Space>
      }
    >
      <Form
        id="car-form"
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        {isDetailMode && (
          <>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Car ID" name="CarId">
                  <Input readOnly />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Text style={labelStyle}>Current Image</Text>

                <div
                  style={{
                    marginTop: 12,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 160, // tạo không gian thở
                  }}
                >
                  {car?.ImagePath ? (
                    <Image
                      src={car.ImagePath}
                      width={220}
                      style={{ objectFit: "contain" }}
                    />
                  ) : (
                    <Text type="secondary">No image</Text>
                  )}
                </div>
              </Col>
            </Row>
            <Divider />
          </>
        )}

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="License Plate"
              name="LicensePlate"
              rules={[{ required: true }]}
            >
              <Input readOnly={isViewMode} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Brand" name="Brand" rules={[{ required: true }]}>
              <Input readOnly={isViewMode} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Model" name="Model" rules={[{ required: true }]}>
              <Input readOnly={isViewMode} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Car Type" name="CarType" rules={[{ required: true }]}>
              <Input readOnly={isViewMode} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Description"
              name="Description"
            >
              <Input.TextArea
                rows={4}
                readOnly={isViewMode}
                placeholder={isViewMode ? "" : "Additional information about the car"}
              />
            </Form.Item>
          </Col>


          <Col span={12}>
            <Form.Item
              label="Color"
              name="Color"
              rules={[{ required: true }]}
            >
              <Input readOnly={isViewMode} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Manufacture Year"
              name="ManufactureYear"
              rules={[
                { required: true },
                {
                  validator: (_, v) =>
                    !v || (v >= 1990 && v <= new Date().getFullYear())
                      ? Promise.resolve()
                      : Promise.reject(new Error("Invalid manufacture year")),
                },
              ]}
            >
              <Input type="number" readOnly={isViewMode} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Capacity" name="Capacity" rules={[{ required: true }]}>
              <Input type="number" readOnly={isViewMode} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Mileage (km)"
              name="Mileage"
              rules={[{ required: true }]}
            >
              <Input type="number" readOnly={isViewMode} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Price Per Day"
              name="PricePerDay"
              rules={[{ required: true }]}
            >
              <Input type="number" readOnly={isViewMode} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Car Status" name="CarStatus">
              {isViewMode ? (
                <Input readOnly />
              ) : (
                <Select options={CAR_STATUS_OPTIONS} />
              )}
            </Form.Item>
          </Col>

          {!isViewMode && (
            <Col span={12}>
              <Form.Item
                label="Replace Image"
                name="image"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) return e;
                  return e?.fileList;
                }}
              >
                <Upload
                  beforeUpload={() => false}
                  maxCount={1}
                  listType="picture"
                >
                  <Button>Upload Image</Button>
                </Upload>
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </Card>
  );
};

export default AdminCarUpsert;
