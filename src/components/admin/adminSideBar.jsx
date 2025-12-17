import { Menu } from "antd";
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
    <>
      <div style={{ padding: 24, fontSize: 24, fontWeight: 700, color: "#3563e9" }}>
        MORENT
      </div>

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
    </>
  );
};

export default AdminSideBar;