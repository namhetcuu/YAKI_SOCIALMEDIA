import { Route } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import Dashboard from "../pages/Dashboard";
import UserManager from "../pages/UserManager";
import ProtectedRoute from "../../shared/components/ProtectedRoute";
const adminRoutes = (
  <Route
    path="/admin"
    element={
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <AdminLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Dashboard />} />
    <Route path="users" element={<UserManager />} />
  </Route>
);

export default adminRoutes;
