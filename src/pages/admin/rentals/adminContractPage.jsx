import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin, notification, Row, Col } from "antd";

import rentalAdminApi from "../../../utils/admin/rentalApi";

import ContractHeaderAdmin from "../../../components/contract/contractHeaderAdmin";
import ContractMainInfo from "../../../components/contract/contractMainInfo";
import ContractSummary from "../../../components/contract/contractSummary";

const AdminContractPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    // support both :id and :rentalId (để khỏi lệch route)
    const rentalId = params.rentalId || params.id;

    const [loading, setLoading] = useState(true);
    const [contract, setContract] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchContract = useCallback(async () => {
        if (!rentalId) return;

        setLoading(true);
        const res = await rentalAdminApi.getAdminRentalById(rentalId);
        setLoading(false);

        if (res?.EC === 0) {
            setContract(res.DT);
            return;
        }

        notification.error({
            message: "Load contract failed",
            description: res?.EM || "Unknown error",
        });
        navigate("/admin/rentals");
    }, [rentalId, navigate]);

    useEffect(() => {
        fetchContract();
    }, [fetchContract]);

    const handleAdminAction = async (action) => {
        if (!rentalId) return;
        if (actionLoading) return;

        setActionLoading(true);

        let res = null;
        if (action === "approve") res = await rentalAdminApi.approveRental(rentalId);
        if (action === "reject") res = await rentalAdminApi.rejectRental(rentalId);
        if (action === "cancel") res = await rentalAdminApi.cancelRental(rentalId);

        setActionLoading(false);

        if (res?.EC === 0) {
            notification.success({
                message: "Success",
                description: res.EM,
            });
            // reload to update derivedStatus + availableActions
            fetchContract();
            return;
        }

        notification.error({
            message: "Action failed",
            description: res?.EM || "Unknown error",
        });
    };

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: 100 }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!contract) return null;

    const { rental, customer, car, payment, availableActions } = contract;

    return (
        <div style={{ padding: "24px 40px" }}>
            <ContractHeaderAdmin
                rental={rental}
                availableActions={availableActions}
                onAction={handleAdminAction}
                actionLoading={actionLoading} // nếu bạn muốn disable nút khi đang call API
            />

            <Row gutter={32}>
                <Col lg={16}>
                    <ContractMainInfo
                        customer={customer}
                        rental={rental}
                        payment={payment}
                    />
                </Col>

                <Col lg={8}>
                    <ContractSummary
                        car={car}
                        rental={rental}
                        payment={payment}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default AdminContractPage;
