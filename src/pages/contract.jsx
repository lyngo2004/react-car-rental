import { useParams } from "react-router-dom";
import { Row, Col, Spin, Alert } from "antd";
import { useEffect, useState } from "react";
import rentalApi from "../utils/rentalApi";

import ContractHeader from "../components/contract/contractHeader";
import ContractMainInfo from "../components/contract/contractMainInfo";
import ContractSummary from "../components/contract/contractSummary";

const ContractPage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const res = await rentalApi.getRentalById(id);
            if (res?.EC === 0) setData(res.DT);
            else setError(res?.EM || "Cannot load contract");
        };
        fetch();
    }, [id]);

    if (error) return <Alert type="error" message={error} />;
    if (!data) return <Spin size="large" />;

    const { rental, customer, payment, car } = data;

    return (
        <div style={{ padding: "40px 80px", background: "#F6F7F9" }}>
            <ContractHeader rental={rental} />

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

export default ContractPage;
