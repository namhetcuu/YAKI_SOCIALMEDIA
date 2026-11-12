# ⚡ YAKI Social Media Platform

> **YAKI Social** là nền tảng mạng xã hội hiện đại, chuyên nghiệp lấy cảm hứng từ các mạng xã hội hàng đầu thế giới (**Facebook, Instagram, X/Twitter**), tích hợp trợ lý trí tuệ nhân tạo **Google Gemini AI**, tính năng chat trực thời gian thực qua **WebSocket STOMP**, và phân hệ quản trị mạnh mẽ.

---

## 📸 Điểm Nhấn Cải Tiến Giao Diện (UI/UX Redesign)

Dự án đã được thiết kế lại toàn bộ từ phong cách thô sơ cũ sang ngôn ngữ thiết kế **Modern Social UI System**:

### 1. Bảng Tin & Trang Chủ (Home Feed — Chuẩn Facebook & X)
* **Header cố định (Sticky Navigation)**: Logo nhận diện thương hiệu `⚡ YAKI Social` kèm hiệu ứng gradient tím, thanh tìm kiếm viên thuốc (Pill Search) `Explore YAKI...` với phím tắt nhanh `⌘K`, widget thời tiết `☀ 72°F`, thông báo, tin nhắn và avatar menu.
* **Cột trái Sidebar**: Điều hướng viên thuốc (Pill Tabs) mềm mại (`bg-indigo-50 text-indigo-600`), mini profile card ở góc dưới với avatar chấm xanh online và menu đăng xuất/cài đặt.
* **Hàng Stories**: Nút `+ Add Story` viền nét đứt và các vòng tròn Story với viền gradient đa sắc Instagram (vàng - hồng - tím), hỗ trợ xem story toàn màn hình.
* **Khung đăng bài viết**: Thiết kế bo tròn với nút Send tím gradient, hỗ trợ tạo nội dung tự động với **AI Assist**, đính kèm hình ảnh và video.
* **Thẻ bài viết (Post Card)**: Bo góc `rounded-3xl`, viền mờ `border-slate-100`, badge nhãn thông minh (`✦ Inspired` / `✦ AI Generated`), tương tác Like (tim động), Comment, Repost (🔄), Share và Bookmark (🔖).
* **Cột phải (HomeRight)**: Widget **Trending** (hiển thị `#Minimalism`, `#YAKIUpdate` kèm mũi tên xu hướng `↗`) và widget **Suggested for you** với các nút `Follow`/`Followed` tương tác tức thì.

### 2. Modal Chi Tiết Bài Viết (Instagram-Style Lightbox Modal)
* Bấm trực tiếp vào ảnh bài viết bất kỳ trên bảng tin để mở Lightbox chia 2 nửa:
  * **Nửa trái**: Hiển thị media độ nét cao trên nền tối sang trọng, kèm số phân trang ảnh (`1/4`) và các chấm phân trang carousel.
  * **Nửa phải**: Tác giả kèm tích xanh xác minh, nút Follow, nhãn âm thanh *"Original Audio"*, danh sách bình luận chi tiết, nút Thích/Trả lời bình luận, bộ đếm like thời gian thực và ô thêm bình luận tích hợp AI.

### 3. Nhắn Tin Thời Gian Thực (Messenger — Chuẩn Messenger & Instagram Direct)
* **Cột danh sách hội thoại**: Tiêu đề lớn *Messages*, thanh tìm kiếm tin nhắn, danh sách hội thoại có trạng thái online (chấm xanh), trích đoạn tin nhắn gần nhất và mốc thời gian (`2m`, `1h`, `Yesterday`).
* **Khung chat chính**: Header hiển thị avatar, tên, trạng thái `"Active now"`, nút gọi thoại, video call và info.
* **Bong bóng tin nhắn**: Phân biệt rõ ràng bong bóng xám mềm mại (đối phương) và tím gradient (bạn).
* **Thanh nhập liệu**: Đính kèm hình ảnh, microphone thu âm, biểu tượng cảm xúc, nút **`✦ AI Sticker`** và nút gửi tím tròn.

### 4. Luồng Xác Thực & Onboarding Đa Bước (Auth & Profile Setup)
* Giao diện xác thực tinh gọn với thanh đo tiến trình (`Step 3 of 3 - 100%`).
* Vùng tải ảnh đại diện với vòng tròn gradient và nút camera nổi.
* Nhập Họ tên, `@username`, Bio cá nhân.
* Bộ chọn sở thích tương tác đa dạng (📷 Photography, ⚙ Tech, 🎵 Music, ✈ Travel, 🎨 Art, 🎮 Gaming, 🍽 Food, 🔬 Science) chuyển màu tím khi được chọn.

### 5. Video Ngắn (Reels) & Trợ Lý Ảo (Chat with AI)
* **Reels**: Trình phát video ngắn định dạng dọc chuẩn TikTok/Reels với thanh tương tác nổi bên phải (Thích, Bình luận, Chia sẻ, Tắt/Bật âm thanh).
* **Chat with AI**: Trò chuyện thông minh cùng trợ lý YAKI AI được trợ lực bởi mô hình **Google Gemini**, hỗ trợ gợi ý ý tưởng, viết bài đăng, giải đáp câu hỏi và lập trình.

### 6. Phân Hệ Quản Trị (Admin Dashboard & User Management)
* Đồng bộ nhận diện thương hiệu `⚡ YAKI Admin`.
* Bảng thống kê số liệu người dùng, biểu đồ hoạt động và phân bổ tài khoản.
* Trang **User Management** (`/admin/users`): Tìm kiếm người dùng, phân loại vai trò (`ADMIN`, `CREATOR`, `USER`) và chuyển đổi trạng thái kích hoạt/tạm dừng (Active/Suspend).

---

## 🛠 Công Nghệ Sử Dụng (Tech Stack)

### Frontend:
* **React 19** + **Vite 6**
* **Tailwind CSS v4** (Utility-first styling hiện đại)
* **Material UI (MUI v6)** + Emotion
* **Framer Motion** (Hiệu ứng chuyển động mượt mà)
* **Redux** + **Redux Thunk** (Quản lý state toàn cục)
* **SockJS & StompJS** (Giao thức WebSocket tin nhắn tức thì)
* **Google Generative AI SDK** (Tích hợp Gemini AI)

### Backend:
* **Java 17** + **Spring Boot 3.4.2**
* **Spring Security 6** + **JWT (Nimbus JOSE)** với thuật toán mã hóa `HS256`
* **Spring Data JPA** + **Hibernate ORM**
* **Supabase PostgreSQL** (Cloud Database)
* **Spring WebSocket** (STOMP Protocol)
* **Cloudinary SDK** (Lưu trữ hình ảnh/video đám mây)

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### Cách 1: Khởi động nhanh bằng file script (Khuyên dùng trên Windows)
Ở thư mục gốc của dự án, bạn chỉ cần bấm đúp chuột vào:
1. `start_backend.bat` ➔ Khởi động Spring Boot Backend trên cổng `8080`.
2. `start_frontend.bat` ➔ Khởi động Vite Frontend trên cổng `5173`.

### Cách 2: Khởi động thủ công qua dòng lệnh

#### 1. Khởi chạy Backend (Spring Boot):
```bash
cd "yaki_social_media(backend)"
java -jar target/zosh_social_youtube-0.0.1-SNAPSHOT.jar
# Hoặc dùng Maven Wrapper:
# .\mvnw.cmd spring-boot:run
```
> Backend chạy tại: `http://localhost:8080/yaki`

#### 2. Khởi chạy Frontend (React + Vite):
```bash
cd "yaki_social_media(frontend)"
npm install
npm run dev
```
> Frontend chạy tại: `http://localhost:5173`

---

## 🔑 Tài Khoản Thử Nghiệm Có Sẵn (Demo Accounts)

Hệ thống đã chuẩn bị sẵn 2 tài khoản để kiểm tra toàn bộ tính năng:

| Vai trò | Tên đăng nhập (Username) | Mật khẩu (Password) | Trang truy cập sau khi đăng nhập |
| :--- | :--- | :--- | :--- |
| **Thành viên thường (User)** | `yakitester` | `User@123456` | `http://localhost:5173/home` |
| **Quản trị viên (Admin)** | `admin` | `Admin@123456` | `http://localhost:5173/admin` |

---

## 📂 Cấu Trúc Thư Mục Chính

```
YAKI_SOCIALMEDIA/
├── start_backend.bat              # Script bật nhanh backend
├── start_frontend.bat             # Script bật nhanh frontend
├── README.md                      # Tài liệu hướng dẫn dự án
├── yaki_social_media(backend)/    # Mã nguồn máy chủ Spring Boot
│   ├── src/main/java/             # Controllers, Services, Entities, Configurations
│   ├── src/main/resources/        # application.yaml, schema.sql
│   └── pom.xml
└── yaki_social_media(frontend)/   # Mã nguồn ứng dụng React
    ├── src/
    │   ├── user/                  # Các trang & component người dùng
    │   │   ├── components/        # Header, Sidebar, MiddlePart, Post, HomeRight...
    │   │   └── pages/             # HomePage, Message, Profile, Reels, ChatWithAI...
    │   ├── admin/                 # Phân hệ quản trị (Dashboard, UserManager...)
    │   ├── redux/                 # Redux Store, Actions, Reducers
    │   └── App.jsx
    ├── package.json
    └── vite.config.js
```

---
© 2026 YAKI Social Media. Designed & Developed with modern standards.
