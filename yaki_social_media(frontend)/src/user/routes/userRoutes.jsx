import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import MiddlePart from "../components/MiddlePart/MiddlePart";
import Reels from "../pages/Reels/Reels";
import CreateReelsForm from "../pages/Reels/CreateReelsForm";
import Profile from "../pages/Profile/Profile";
import Notification from "../pages/Notification/notification";
import Setting from "../pages/Setting/Setting";
import Communities from "../pages/Communites/Communites";
import Message from "../pages/Message/Message";
import ChatWithAI from "../pages/ChatWithAI/ChatWithAI";
import ContextProvider from "../pages/ChatWithAI/Context";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../../shared/components/ProtectedRoute";

const HomeLayout = () => (
  <HomePage>
    <Outlet />
  </HomePage>
);

const userRoutes = (
  <>
    <Route
      path="/message"
      element={
        <ProtectedRoute allowedRoles={["USER"]}>
          <Message />
        </ProtectedRoute>
      }
    />
    <Route
      path="/chatwithai"
      element={
        <ProtectedRoute allowedRoles={["USER"]}>
          <ContextProvider>
            <ChatWithAI />
          </ContextProvider>
        </ProtectedRoute>
      }
    />

    <Route
      path="/home"
      element={
        <ProtectedRoute allowedRoles={["USER"]}>
          <HomeLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<MiddlePart />} />
      <Route path="reels" element={<Reels />} />
      <Route path="create-reels" element={<CreateReelsForm />} />
      <Route path="notifications" element={<Notification />} />
      <Route path="profile/:id" element={<Profile />} />
      <Route path="communities" element={<Communities />} />
      <Route path="settings" element={<Setting />} />
    </Route>
  </>
);

export default userRoutes;
