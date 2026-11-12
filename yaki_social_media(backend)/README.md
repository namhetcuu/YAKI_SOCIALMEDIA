
# 📦 Social Media App - Backend

This is the backend service for a full-stack social media application, built with **Spring Boot**.  
It provides RESTful APIs, real-time communication via **WebSocket**, and secure authentication using **JWT** and **Spring Security**.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control
- Token introspection and refresh

### 🧑‍🤝‍🧑 User Management
- View and update user profiles
- Follow/unfollow users
- Search users by keyword

### 📝 Post & Comment System
- Create, update, delete, and fetch posts
- Like, save, and repost functionality
- Comment on posts

### 💬 Real-Time Chat
- WebSocket-based real-time messaging
- Chat rooms (1-1 or group support)
- Live notifications

### 🎥 Reels & Video Support
- Create and view short videos (Reels)
- Integration-ready with **Zego Cloud** for live streaming

---

## 🛠️ Tech Stack

- **Java 17**
- **Spring Boot 3.x**
- **Spring Security**
- **Spring WebSocket / STOMP**
- **JWT (JSON Web Token)**
- **Spring Data JPA & Hibernate**
- **MySQL / PostgreSQL**
- **Lombok**
- **Zego Cloud SDK** (for real-time video)

---

## 📁 Project Structure



## ⚙️ Getting Started

### Prerequisites
- Java 17
- Maven
- MySQL or PostgreSQL database

### Clone the repository
```bash
git clone https://github.com/your-username/social-media-backend.git
cd social-media-backend
```

---

## Supabase database setup

The backend uses Supabase Postgres through JDBC; the React application continues
to call the existing Spring Boot API. Supabase Auth is not enabled by this change,
so the application's current JWT login flow is preserved.

### 1. Create the project and get its connection details

In the Supabase dashboard, open the project and select **Connect**. For a Spring
Boot server that runs continuously:

- use **Direct connection** when the host supports IPv6;
- otherwise use **Session pooler** on port `5432` (works on IPv4);
- keep `sslmode=require` in the JDBC URL.

If Transaction pooler on port `6543` is used, append `prepareThreshold=0` to
the JDBC URL because this pooler does not support JDBC prepared statements:

```text
jdbc:postgresql://POOLER_HOST:6543/postgres?sslmode=require&prepareThreshold=0
```

From the backend directory, create the private `.env` file:

```powershell
Copy-Item .env.example .env
```

Replace every placeholder inside `.env` with the values from Supabase. Spring
Boot loads this file automatically when it is launched from the backend directory.
Alternatively, you can set the same variables directly in PowerShell:

```powershell
$env:SUPABASE_DB_URL = 'jdbc:postgresql://POOLER_HOST:5432/postgres?sslmode=require'
$env:SUPABASE_DB_USERNAME = 'postgres.PROJECT_REF'
$env:SUPABASE_DB_PASSWORD = 'YOUR_DATABASE_PASSWORD'
$env:JWT_SIGNER_KEY = 'A_LONG_RANDOM_APPLICATION_SECRET'
$env:BOOTSTRAP_ADMIN_PASSWORD = 'A_STRONG_INITIAL_ADMIN_PASSWORD'
./mvnw.cmd spring-boot:run
```

Use username `postgres` for a direct connection. Use
`postgres.PROJECT_REF` for the shared pooler's session connection. Copy the exact
host and username shown by Supabase instead of constructing them manually.

On first startup, Hibernate creates/updates the tables in the private `yaki`
schema. That schema is intentionally outside Supabase's default Data API exposure;
all data access remains behind Spring Security and the backend API. Once the schema
is stable, set `JPA_DDL_AUTO=validate` in production.

`BOOTSTRAP_ADMIN_PASSWORD` is optional. When it is unset, the backend does not
create an initial admin. It never falls back to a known default password.

### 2. Move existing MySQL data (optional)

For an existing local database, start the backend against Supabase once so that
the PostgreSQL tables are created. Then use DBeaver's **Data Transfer** tool (or
pgloader) to copy rows from MySQL into the matching `yaki` tables. Transfer parent
tables before child/join tables and preserve the existing IDs.

After importing rows with numeric identity IDs, run this in Supabase SQL Editor:

```sql
SELECT setval(pg_get_serial_sequence('yaki.saved_posts', 'id'),
              COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM yaki.saved_posts;
SELECT setval(pg_get_serial_sequence('yaki.user_followers', 'id'),
              COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM yaki.user_followers;
SELECT setval(pg_get_serial_sequence('yaki.user_following', 'id'),
              COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM yaki.user_following;
```

Do not put the database password or JDBC URL in frontend environment variables.
