# Product Management System

A full-stack Product Management System built for managing products through a React.js frontend, Node.js/Express.js backend, and MongoDB database.

The application provides public product browsing and searching, while authenticated admin users can create, update, delete, and manage products with image uploads.

---

## 🚀 Features

### Public Features

- View all products
- Search products by name or category
- View product details
- View product price
- View product category
- View stock status
- View product images
- Responsive user interface

### Admin Features

- Admin login
- JWT-based authentication
- Create new products
- Upload product images
- Edit existing products
- Update product images
- Delete products
- Manage stock status
- Logout
- Protected admin operations

### Validation

- Product name is required
- Price is required
- Price must be greater than 0
- Category is required
- Product image is optional
- Supported image formats:
  - JPG
  - JPEG
  - PNG
  - WEBP
- Maximum image size: 5MB

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Axios
- HTML5
- CSS3
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Multer

### Development Tools

- Git
- GitHub
- Postman
- VS Code

---

## 📁 Project Structure

```text
Product-management/
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   └── EditProduct.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
└── README.md
🔐 Authentication

The application uses JWT-based authentication for admin operations.

The admin first logs in through the login page. After successful authentication, a JWT token is generated and stored on the frontend.

The token is sent with protected API requests using:

Authorization: Bearer <token>

Only authenticated admin users can:

Create products
Update products
Delete products

Product viewing APIs remain publicly accessible.

🔑 Admin Login

For the local machine-test setup:

Email: admin@gmail.com
Password: admin123
📡 API Endpoints
Authentication
POST /api/auth/login

Used for admin login and JWT token generation.

Products
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
Public Routes
GET /api/products
GET /api/products/:id
Protected Admin Routes
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

Protected routes require a valid JWT token.

📦 Product Fields

Each product contains the following fields:

name
price
category
inStock
image

Example:

{
  "name": "MacBook",
  "price": 500000,
  "category": "Electronics",
  "inStock": true,
  "image": "/uploads/example.jpg"
}
🖼️ Image Upload

Product images are uploaded using Multer.

Uploaded images are stored inside:

backend/uploads/

Images can then be accessed through:

/uploads/<filename>

The frontend displays uploaded product images in the product list and product details pages.

🔄 Application Flow
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    └──────────┬──────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
              ▼                                 ▼
       Product Browsing                  Admin Login
              │                                 │
              │                                 ▼
              │                            JWT Token
              │                                 │
              └────────────────┬────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   Express Backend   │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
          CRUD APIs      Authentication    Image Upload
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    └─────────────────────┘
⚙️ Backend Setup
1. Go to backend directory
cd backend
2. Install dependencies
npm install
3. Create .env

Create a .env file inside the backend folder:

PORT=5002
MONGO_URI=mongodb://127.0.0.1:27017/product-manager
JWT_SECRET=your_secret_key
4. Start backend
node server.js

Backend will run on:

http://localhost:5002
⚛️ Frontend Setup
1. Go to frontend directory
cd frontend
2. Install dependencies
npm install
3. Create .env

Create a .env file inside the frontend folder:

VITE_API_URL=http://localhost:5002
4. Start frontend
npm run dev

Frontend will run on:

http://localhost:5173
🧪 Testing with Postman

The backend APIs can be tested using Postman.

Public APIs
GET http://localhost:5002/api/products
GET http://localhost:5002/api/products/:id
Admin Login
POST http://localhost:5002/api/auth/login

Request body:

{
  "email": "admin@gmail.com",
  "password": "admin123"
}

The response returns a JWT token.

For protected requests, add:

Authorization: Bearer <token>
🔒 Security

The application implements:

JWT authentication
Admin role validation
Protected POST requests
Protected PUT requests
Protected DELETE requests
Environment variables for sensitive configuration
Authentication middleware
Input validation
📱 Responsive Design

The frontend is responsive and supports:

Desktop screens
Tablet screens
Mobile screens

The product grid automatically adjusts based on screen size.

🎯 Main Functionalities

The complete application supports:

Admin Login
      ↓
JWT Authentication
      ↓
Product Management
      ↓
 ┌───────────────┐
 │               │
 ▼               ▼
Create          View
 │               │
 ▼               ▼
Update          Search
 │               │
 ▼               ▼
Delete         Details
👨‍💻 Author
Aman Dwivedi

B.Tech Computer Science and Engineering

GitHub:
https://github.com/Amandwivedi12

LinkedIn:
https://linkedin.com/in/aman021