import {
  Card,
  Table,
  Tag,
  Space,
  Input,
  Button,
  Image,
  Row,
  Col,
  Typography,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import carAdminApi from "../../../utils/admin/carApi";

const { Search } = Input;
const { Text } = Typography;

const AdminCarListPage = () => {
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    const res = await carAdminApi.getAllAdminCars();
    if (res?.EC === 0) {
      setCars(res.DT || []);
    }
    setLoading(false);
  };

  const columns = [
    {
      title: "Car ID",
      dataIndex: "CarId",
      key: "CarId",
      width: 100,
    },
    {
      title: "Image",
      dataIndex: "ImagePath",
      key: "ImagePath",
      render: (src) =>
        src ? <Image src={src} width={120} /> : "-",
    },
    {
      title: "License Plate",
      dataIndex: "LicensePlate",
      key: "LicensePlate",
    },
    {
      title: "Brand",
      dataIndex: "Brand",
      key: "Brand",
    },
    {
      title: "Model",
      dataIndex: "Model",
      key: "Model",
    },
    {
      title: "Car Type",
      dataIndex: "CarType",
      key: "CarType",
    },
    {
      title: "Capacity",
      dataIndex: "Capacity",
      key: "Capacity",
      align: "center",
    },
    {
      title: "Price / Day",
      dataIndex: "PricePerDay",
      key: "PricePerDay",
      render: (v) => <Text>${v}</Text>,
    },
    {
      title: "Status",
      dataIndex: "CarStatus",
      key: "CarStatus",
      render: (status) => {
        let color = "default";
        if (status === "Available") color = "green";
        if (status === "Rented") color = "blue";
        if (status === "Maintenance") color = "orange";

        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <Card
      title={
        <Row align="middle" justify="space-between">
          {/* Left */}
          <Col>
            <span style={{ fontSize: 18, fontWeight: 600 }}>
              Cars
            </span>
          </Col>

          {/* Center */}
          <Col flex="auto" style={{ padding: "10px 240px" }}>
            <Search
              placeholder="Search car by brand, model, license plate..."
              allowClear
              onSearch={(value) => {
                // TODO: implement search later
                console.log("search:", value);
              }}
            />
          </Col>

          {/* Right */}
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate("/admin/cars/new")}
            />
          </Col>
        </Row>
      }
    >
      <Table
        rowKey="CarId"
        loading={loading}
        columns={columns}
        dataSource={cars}
        pagination={{ pageSize: 8 }}
        onRow={(record) => ({
          onClick: () => {
            navigate(`/admin/cars/${record.CarId}`);
          },
          style: { cursor: "pointer" },
        })}
        locale={{ emptyText: "No cars found" }}
      />
    </Card>
  );
};

export default AdminCarListPage;
