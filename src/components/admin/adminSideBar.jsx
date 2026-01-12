import { Layout, Menu } from "antd";

import {
  DashboardOutlined,
  ShoppingCartOutlined,
  CarOutlined,
  UserOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation, replace } from "react-router-dom";

const { Sider } = Layout;

const AdminSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { key: "/admin/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/admin/rentals", icon: <ShoppingCartOutlined />, label: "Rentals" },
    { key: "/admin/cars", icon: <CarOutlined />, label: "Cars" },
    { key: "/admin/customers", icon: <UserOutlined />, label: "Customers" },
    { key: "/admin/invoice", icon: <FileTextOutlined />, label: "Invoice" },
    { key: "/admin/analytics", icon: <BarChartOutlined />, label: "Analytics" },
    { key: "/admin/settings", icon: <SettingOutlined />, label: "Setting" },
  ];

  return (
    <Sider
      width={240}
      style={{
        background: "#fff",
        borderRight: "1px solid #f0f0f0",
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        onClick={({ key }) => navigate(key)}
      />

      <div style={{ padding: 16 }}>
        <Menu
          items={[
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Log out",
              danger: true,
              onClick: () => {
                localStorage.removeItem("accessToken");
                navigate("/login", { replace: true });
              },
            },
          ]}
        />
      </div>
    </Sider>
  );
};

export default AdminSideBar;