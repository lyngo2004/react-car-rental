import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./header";
import AdminSideBar from "../admin/adminSideBar";

const { Content } = Layout;

const AdminLayout = () => {
  return (
    <>
      {/* Header dùng chung */}
      <Header />

      {/* Layout NGANG cho admin */}
      <Layout style={{ minHeight: "calc(100vh - 64px)" }}>
        {/* Sidebar bên trái */}
        <AdminSideBar />

        {/* Content bên phải */}
        <Layout>
          <Content
            style={{
              padding: 24,
              background: "#F6F7F9",
              overflow: "auto",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminLayout;
