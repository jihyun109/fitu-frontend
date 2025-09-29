import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/adminHeader/adminHeader";

const AdminPage = () => {
  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  );
};

export default AdminPage;
