import { Card, Typography, Row, Col, Button, Space, Tag, Modal } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  StopOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const ContractHeaderAdmin = ({
  rental,
  availableActions = [],
  onAction,
}) => {
  const confirmAction = (action) => {
    Modal.confirm({
      title: `Confirm ${action}`,
      content: `Are you sure you want to ${action} this rental?`,
      okText: "Yes",
      cancelText: "No",
      onOk: () => onAction(action),
    });
  };

  return (
    <Card style={{ marginBottom: 24 }}>
      <Row align="middle" justify="space-between">
        <Col>
          <Title level={3} style={{ marginBottom: 0 }}>
            Rental Contract
          </Title>

          <Space size={12} style={{ marginTop: 6 }}>
            <Text strong>Rental ID:</Text>
            <Text>{rental.RentalId}</Text>
            <Tag color="blue">{rental.derivedStatus}</Tag>
          </Space>
        </Col>

        <Col>
          <Space>
            {availableActions.includes("approve") && (
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => confirmAction("approve")}
              >
                Approve
              </Button>
            )}

            {availableActions.includes("reject") && (
              <Button
                danger
                icon={<CloseOutlined />}
                onClick={() => confirmAction("reject")}
              >
                Reject
              </Button>
            )}

            {availableActions.includes("cancel") && (
              <Button
                icon={<StopOutlined />}
                onClick={() => confirmAction("cancel")}
              >
                Cancel
              </Button>
            )}
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default ContractHeaderAdmin;
