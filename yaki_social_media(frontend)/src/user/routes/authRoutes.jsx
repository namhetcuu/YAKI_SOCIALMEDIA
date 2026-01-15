import { Route } from "react-router-dom";
import Authentication from "../pages/Authentication/Authentication";
import Login from "../pages/Authentication/login";
import Register from "../pages/Authentication/register";
import ForgotPassword from "../pages/Authentication/ForgotPassword";

const authRoutes = (
  <Route path="/" element={<Authentication />}>
    <Route index element={<Login />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
  </Route>
);

export default authRoutes;
