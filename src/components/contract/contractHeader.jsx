import { Card, Tag, Typography, Row, Col } from "antd";

const { Title, Text } = Typography;

const ContractHeader = ({ rental }) => (
    <Card style={{ marginBottom: 24 }}>
        <Title level={3}>Rental Contract</Title>

        <Row align="middle" justify="space-between">
            <Col >
                <Text strong>Rental ID: </Text>
                <Text>{rental.RentalId}</Text>
            </Col>

            <Col>
                <Tag color="blue">
                    {rental.derivedStatus}
                </Tag>
            </Col>
        </Row>
    </Card>
);

export default ContractHeader;
