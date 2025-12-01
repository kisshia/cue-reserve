# CueReserve - Billiards Table Reservation System

A full-stack web application for managing billiards table reservations. Users can register, view available tables, and make reservations.

## 📋 Project Overview

CueReserve is a billiards reservation system built with:
- **Frontend:** React.js with Vite
- **Backend:** Node.js with Express
- **Database:** MySQL with Sequelize ORM
- **Authentication:** JWT tokens with bcrypt password hashing

## ✨ Sprint 1 - Completed Features

### ✅ Authentication System
- User registration with password hashing
- User login with JWT token generation
- Token-based authentication middleware
- Secure password storage

### ✅ Database Setup
- Three main tables: `users`, `tables`, `reservations`
- Foreign key relationships
- Proper constraints and validations
- MySQL database with Sequelize models

### ✅ Frontend UI
- Beautiful dark-themed dashboard
- Registration form with validation
- Login system
- Available tables display with status
- Professional UI with shadcn/ui components

### ✅ Backend Infrastructure
- Express.js REST API
- CORS enabled for frontend communication
- Sequelize database models and migrations
- Proper folder structure (controllers, models, routes, middleware)

## 📦 Project Structure

```
CueReserve/
├── frontend/                 # React application
│   ├── src/
│   │   ├── pages/           # Page components (Register, Login, Home)
│   │   ├── context/         # AuthContext for state management
│   │   ├── components/      # Reusable UI components
│   │   └── App.jsx
│   ├── vite.config.ts       # Vite configuration (Port: 8081)
│   └── package.json
│
├── backend/                  # Node.js/Express API
│   ├── src/
│   │   ├── server.js        # Main server file
│   │   ├── controllers/     # Business logic (auth, tables, users)
│   │   ├── models/          # Sequelize models (User, Table, Reservation)
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Authentication middleware
│   │   └── config/          # Database configuration
│   ├── .env                 # Environment variables
│   └── package.json
│
└── database/                # Database files
    ├── cue_reserve.sql      # Database schema and migrations
    └── README.md
```

## 🚀 How to Run

### Prerequisites
- Node.js (v14+)
- MySQL/MariaDB (via XAMPP or standalone)
- npm or yarn

### 1. Start MySQL
```bash
# macOS with XAMPP
sudo /Applications/XAMPP/xamppfiles/bin/mysql.server start

# Or use XAMPP GUI
open /Applications/XAMPP/xamppfiles/bin/xampp
```

### 2. Create Database
```bash
mysql -u root < /Users/kisshiadejesus/Desktop/CueReserve/database/cue_reserve.sql
```

### 3. Start Backend Server
```bash
cd /Users/kisshiadejesus/Desktop/CueReserve/backend
npm install
npm start
# Server runs on http://localhost:4000
```

### 4. Start Frontend Development Server
```bash
cd /Users/kisshiadejesus/Desktop/CueReserve/frontend
npm install
npm run dev
# Frontend runs on http://localhost:8081
```

### 5. Access Application
- **Frontend:** http://localhost:8081
- **Backend API:** http://localhost:4000
- **phpMyAdmin:** http://localhost/phpmyadmin

## 🔌 API Endpoints (Sprint 1)

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/me` - Get current user (protected)

## 🗄️ Database Schema

### users table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user','admin') DEFAULT 'user',
  createdAt DATETIME,
  updatedAt DATETIME
);
```

### tables table
```sql
CREATE TABLE tables (
  id INT PRIMARY KEY AUTO_INCREMENT,
  table_number INT UNIQUE NOT NULL,
  status ENUM('available','reserved','maintenance') DEFAULT 'available',
  createdAt DATETIME,
  updatedAt DATETIME
);
```

### reservations table
```sql
CREATE TABLE reservations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  date DATE NOT NULL,
  time_start TIME NOT NULL,
  time_end TIME NOT NULL,
  userId INT NOT NULL,
  tableId INT NOT NULL,
  status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (tableId) REFERENCES tables(id) ON DELETE CASCADE
);
```

## 🧪 Testing

### Test Account Credentials
- **Email:** user@example.com
- **Password:** password123

### Manual Testing
1. Register a new account
2. Login with credentials
3. View available tables
4. Create a reservation

## 📝 Environment Configuration

### Backend .env
```
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=cue_reserve
DB_USER=root
DB_PASS=
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

## 🔐 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ CORS enabled for frontend communication
- ✅ Protected API routes with authentication middleware
- ✅ Database constraints and validation

## 🎯 Sprint 2 - In Progress

### Planned Features
- [ ] Additional API endpoints (Tables CRUD, Reservations CRUD)
- [ ] User profile management
- [ ] Reservation management forms
- [ ] Available tables view
- [ ] User reservations history
- [ ] Sample data (10+ rows per table)
- [ ] Postman API testing collection
- [ ] Demo video

## 📦 Technologies Used

### Frontend
- React.js
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Router
- Axios

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL2 driver
- JWT (jsonwebtoken)
- Bcrypt
- CORS
- dotenv

### Database
- MySQL
- MariaDB (via XAMPP)

## 📊 Development Commits

| Date | Commit | Features |
|------|--------|----------|
| Dec 1, 2025 | Initial Setup | Database, Backend Auth, Frontend UI |
| Dec 1, 2025 | API Integration | Connect frontend to backend API |
| Dec 1, 2025 | Testing | Test user registration and login |

## 📝 Notes

- CORS is configured to allow http://localhost:8080 and http://localhost:8081
- Database connection uses pool with max 5 connections
- Password minimum requirements: 6+ characters
- All timestamps use server timezone

## 📞 Support

For issues or questions, please check:
1. Backend logs in terminal
2. Browser console (DevTools)
3. Network tab in DevTools for API calls
4. phpMyAdmin for database verification

## 📄 License

This project is for educational purposes.

---

**Last Updated:** December 1, 2025
**Sprint:** 1 (Complete) → 2 (In Progress)
