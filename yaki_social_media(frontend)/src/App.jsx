import { Outlet, Routes } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuthStatus } from "./redux/Auth/auth.action";

import authRoutes from "./user/routes/authRoutes";
import userRoutes from "./user/routes/userRoutes";
import adminRoutes from "./admin/routes/adminRoutes";
import HomePage from "./user/pages/HomePage/HomePage";

// function HomeLayout() {
//   return (
//     <HomePage>
//       <Outlet />
//     </HomePage>
//   );
// }

function App() {
  //Routes, Route: Dùng để định nghĩa các tuyến đường (routing) trong React Router.
  // useNavigate: Dùng để điều hướng giữa các trang.
  // useLocation: Lấy thông tin về đường dẫn hiện tại của trang web.
  // useDispatch, useSelector:
  // useDispatch(): Dùng để gửi action lên Redux.
  // useSelector(): Lấy dữ liệu từ Redux store.
  // useEffect: Chạy các side-effect khi component được render.
  // checkAuthStatus: Action kiểm tra trạng thái đăng nhập của người dùng.

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
  const { user } = useSelector((state) => state.auth);

  //🔄 useEffect 1: này chạy đúng 1 lần duy nhất khi component App được render lần đầu.
  useEffect(() => {
    dispatch(checkAuthStatus()); // Gọi API kiểm tra trạng thái auth khi mở app
  }, [dispatch]);

  // useEffect 2: Khi bạn reload (F5) Trình duyệt tải lại toàn bộ app.Redux store reset về mặc định → user bị xóa.
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      if (
        location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/forgot-password" &&
        location.pathname !== "/admin"
      ) {
        navigate("/login");
      }
    } else {
      if (!user) {
        dispatch(checkAuthStatus());
      }else {
        if(location.pathname.startsWith("/admin") && user.role && user.role !== "ADMIN"){
          navigate("/home")
        }
      }
    }
  }, [user, dispatch, navigate, location.pathname]);

  return (
    <div className="w-[100vw] h-[100vh] ">
      <Routes>
        {authRoutes}
        {userRoutes}
        {adminRoutes}
      </Routes>
    </div>
  );
}

export default App;
