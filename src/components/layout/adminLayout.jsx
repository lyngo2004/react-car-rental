import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../admin/adminSideBar";

const { Sider, Content } = Layout;

const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={260} theme="light">
        <AdminSideBar />
      </Sider>

      <Layout>
        <Content style={{ padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;