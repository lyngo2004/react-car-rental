/**
   * NOTE:
   * The Admin Cars table implementation (AntD Table + data fetching) is intentionally commented out at this stage.
   * 
   * Reason:
   * - The Admin Cars API endpoint is not implemented on the Backend yet.
   * - Enabling the table logic now would cause runtime errors due to missing API responses.
   *
   * Current behavior:
   * - This page only renders the layout shell (Card + "Add New Car" action).
   * - No mock data or fake UI state is introduced.
   *
   * TODO (to be implemented after BE is ready):
   * - Add admin car API (GET /api/v1/admin/cars).
   * - Fetch data using the same axios + response pattern as customer pages.
   * - Render AntD Table with real data from the backend.
   */

// import { Card, Table, Tag, Space, Input, Button, Image, Typography } from "antd";
// import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAdminCars } from "../../../utils/admin/carApi";

// const { Title } = Typography;
// const { Search } = Input;

// const AdminCarList = () => {
//   const navigate = useNavigate();

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   const fetchCars = async () => {
//     setLoading(true);
//     const res = await getAdminCars();
//     if (res?.EC === 0) {
//       setCars(res.data || []);
//     }
//     setLoading(false);
//   };

//   const columns = [
//     { title: "Car ID", dataIndex: "carId", key: "carId" },
//     { title: "License Plate", dataIndex: "licensePlate", key: "licensePlate" },
//     { title: "Brand", dataIndex: "brand", key: "brand" },
//     { title: "Model", dataIndex: "model", key: "model" },
//     { title: "Car Type", dataIndex: "carType", key: "carType" },
//     { title: "Capacity", dataIndex: "capacity", key: "capacity" },
//     {
//       title: "Price Per Day",
//       dataIndex: "pricePerDay",
//       key: "pricePerDay",
//       render: (v) => (v ? `$${v}` : "-"),
//     },
//     {
//       title: "Car Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => {
//         if (!status) return "-";
//         let color = "default";
//         if (status === "Available") color = "success";
//         if (status === "Rented") color = "processing";
//         if (status === "Maintenance") color = "warning";
//         return <Tag color={color}>{status}</Tag>;
//       },
//     },
//     {
//       title: "Image",
//       dataIndex: "imagePath",
//       key: "imagePath",
//       render: (src) =>
//         src ? <Image src={src} width={70} /> : "-",
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <Space>
//           <EditOutlined
//             onClick={() => navigate(`/admin/cars/${record.carId}`)}
//             style={{ cursor: "pointer" }}
//           />
//           <DeleteOutlined style={{ color: "#ff4d4f", cursor: "pointer" }} />
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <Card style={{ borderRadius: 16 }}>
//       {/* Header */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           marginBottom: 16,
//         }}
//       >
//         <Title level={4} style={{ margin: 0 }}>
//           Admin Car Management Table
//         </Title>

//         <Space>
//           <Search placeholder="Search" style={{ width: 220 }} />
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={() => navigate("/admin/cars/new")}
//           >
//             Add New Car
//           </Button>
//         </Space>
//       </div>

//       {/* Table */}
//       <Table
//         rowKey="carId"
//         loading={loading}
//         columns={columns}
//         dataSource={cars}
//         pagination={{ pageSize: 8 }}
//         locale={{ emptyText: "No cars found" }}
//       />
//     </Card>
//   );
// };

// export default AdminCarList;

import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

const AdminCarList = () => {
  const navigate = useNavigate();

  return (
    <Card
      title="Cars Management"
      extra={
        <Button type="primary" onClick={() => navigate("/admin/cars/new")}>
          Add New Car
        </Button>
      }
    >
      {/* TODO: AntD Table */}
      Car list will be displayed here.
    </Card>
  );
};

export default AdminCarList;