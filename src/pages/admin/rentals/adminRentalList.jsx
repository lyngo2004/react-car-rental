import { useEffect, useState } from "react";
import { Card, Table, Tag, Space, Typography, Segmented } from "antd";
import { useNavigate } from "react-router-dom";

import rentalAdminApi from "../../../utils/admin/rentalApi";

const { Title, Text } = Typography;

/* ================= STATUS CONFIG ================= */
const RENTAL_STATUSES = [
    { key: "all", label: "All Rentals" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
    { key: "in_progress", label: "In-progress" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
];

const getStatusColor = (status) => {
    switch (status) {
        case "pending":
            return "orange";
        case "approved":
            return "blue";
        case "in_progress":
            return "processing";
        case "completed":
            return "green";
        case "rejected":
            return "red";
        case "cancelled":
            return "default";
        default:
            return "default";
    }
};

const AdminRentalList = () => {
    const navigate = useNavigate();

    const [activeStatus, setActiveStatus] = useState("all");
    const [summary, setSummary] = useState({});
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(false);

    /* ================= LOAD SUMMARY ================= */
    useEffect(() => {
        const fetchSummary = async () => {
            const res = await rentalAdminApi.getAdminRentalSummary();
            if (res?.EC === 0) {
                const data = res.DT;

                const totalAll = Object.values(data).reduce(
                    (sum, v) => sum + v,
                    0
                );

                setSummary({
                    ...data,
                    all: totalAll,
                });
            }
        };
        fetchSummary();
    }, []);

    /* ================= LOAD RENTALS ================= */
    useEffect(() => {
        const fetchRentals = async () => {
            setLoading(true);

            const res =
                activeStatus === "all"
                    ? await rentalAdminApi.getAllAdminRentals()
                    : await rentalAdminApi.getAdminRentalsByStatus(activeStatus);

            setLoading(false);

            if (res?.EC === 0) {
                setRentals(res.DT);
            } else {
                setRentals([]);
            }
        };

        fetchRentals();
    }, [activeStatus]);

    /* ================= TABLE COLUMNS ================= */
    const columns = [
        {
            title: "RentalID",
            dataIndex: "RentalId",
        },
        {
            title: "Customer",
            render: (_, r) => (
                <>
                    <div>{r.customer?.FullName}</div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        {r.customer?.Email}
                    </Text>
                </>
            ),
        },
        {
            title: "Car",
            render: (_, r) => (
                <Text>
                    {r.car?.Brand} {r.car?.Model}
                </Text>
            ),
        },
        {
            title: "Pick-up",
            render: (_, r) => (
                <>
                    <div>{r.PickUpLocation}</div>
                    <Text type="secondary">
                        {r.pickupDate} {r.pickupTime}
                    </Text>
                </>
            ),
        },
        {
            title: "Drop-off",
            render: (_, r) => (
                <>
                    <div>{r.DropOffLocation}</div>
                    <Text type="secondary">
                        {r.dropoffDate} {r.dropoffTime}
                    </Text>
                </>
            ),
        },
        {
            title: "Issued Date",
            dataIndex: "IssuedDate",
        },
        {
            title: "Status",
            render: (_, r) => (
                <Tag color={getStatusColor(r.derivedStatus)}>
                    {r.derivedStatus.replace("_", " ").toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Total",
            dataIndex: "TotalAmount",
            render: (v) => `$${v}`,
        },
    ];

    return (
        <Card>
            <Title level={4}>Rental Management</Title>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    // marginBottom: 14,
                }}
            >
                {/* ===== STATUS FILTER ===== */}
                <Segmented
                    value={activeStatus}
                    onChange={setActiveStatus}
                    options={RENTAL_STATUSES.map((s) => ({
                        value: s.key,
                        label: (
                            <Space>
                                {s.label}
                                <Text type="secondary">
                                    ({summary?.[s.key] || 0})
                                </Text>
                            </Space>
                        ),
                    }))}
                    style={{ marginBottom: 24 }}
                />
            </div>

            {/* ===== TABLE ===== */}
            <Table
                rowKey="RentalId"
                loading={loading}
                dataSource={rentals}
                columns={columns}
                pagination={{ pageSize: 8 }}
                onRow={(record) => ({
                    onClick: () =>
                        navigate(`/admin/rentals/${record.RentalId}`),
                })}
            />
        </Card>
    );
};

export default AdminRentalList;
