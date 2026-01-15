//Đây là một Redux reducer dùng để xử lý trạng thái xác thực (authentication) của ứng dụng,
//bao gồm đăng nhập (login) và đăng ký (register).

import { act } from "react";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  REGISTER_REQUEST,
  SEARCH_USER_SUCCESS,
} from "./auth.actionType";
//📌 Dòng chảy dữ liệu:
// UI (Giao diện người dùng) gọi action
// Khi người dùng nhập thông tin đăng nhập và nhấn nút "Đăng nhập", một action (loginUserAction) sẽ được gọi.
// Action gửi dispatch đến reducer
// loginUserAction gọi dispatch({ type: LOGIN_REQUEST }), rồi gửi request đến API.
// Reducer cập nhật state
// Khi nhận action LOGIN_REQUEST, reducer đặt loading = true.
// Nếu API trả về thành công, reducer nhận LOGIN_SUCCESS và lưu JWT vào state.
// Nếu có lỗi, reducer nhận LOGIN_FAIL và lưu lỗi vào state.
// UI cập nhật theo state mới
// Nếu loading = true → Hiển thị spinner.
// Nếu jwt có giá trị → Chuyển hướng đến trang chính.
// Nếu error có giá trị → Hiển thị thông báo lỗi.
//Giá trị mặc định (initial state) của reducer:
const initialState = {
  jwt: null,
  error: null,
  loading: false,
  user: null,
  searchUser: [],
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_REQUEST:
      //...state: Giữ nguyên các giá trị cũ của state để không làm mất dữ liệu khác.
      //loading: true: Đánh dấu rằng quá trình đăng nhập đang diễn ra (hiển thị spinner hoặc loading UI).
      //error: null: Xóa bất kỳ lỗi nào trước đó để đảm bảo không hiển thị lỗi cũ khi bắt đầu đăng nhập.
      return { ...state, loading: true, error: null };
    case REGISTER_SUCCESS:
      return {
        ...state,
        jwt: action.payload,
        loading: false,
        error: null,
      };

    case GET_PROFILE_REQUEST: {
      return { ...state, loading: true, error: null };
    }

    case GET_PROFILE_SUCCESS: {
      return {
        ...state,
        user: action.payload.result,
        error: null,
        loading: false,
      };
    }

    case SEARCH_USER_SUCCESS: {
      return {
        ...state,
        searchUser: action.payload.result,
        loading: false,
        error: null,
      };
    }

    case LOGIN_SUCCESS:
      return {
        ...state,
        jwt: action.payload.token,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        jwt: null,
        loading: false,
        error: action.payload,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
