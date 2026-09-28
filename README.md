# Product Management System

A full-stack Product Management System built using React.js, Node.js, Express.js, MongoDB, JWT Authentication, and Multer.

The application allows users to view products publicly, while authenticated admins can create, update, delete, and manage products with image uploads.

---

## 🚀 Live Demo

### Frontend
https://product-management-pied-eight.vercel.app/

### Backend API
https://product-management-backend-b3zu.onrender.com

### GitHub Repository
https://github.com/Amandwivedi12/Product-management

---

## 📌 Project Overview

The Product Management System is an admin-based CRUD application designed to manage product information efficiently.

The application provides:

- Public product listing
- Product details page
- Admin login using JWT authentication
- Add product
- Edit product
- Delete product
- Product image upload
- Product validation
- Stock availability management
- RESTful APIs
- MongoDB database integration
- Responsive React UI

---

## ✨ Features

### 👤 Public Features

- View all products
- Search products
- View individual product details
- View product image
- Check product price
- Check product category
- Check stock availability

### 🔐 Admin Features

Authenticated admins can:

- Login securely
- Add new products
- Upload product images
- Edit existing products
- Delete products
- Update product information
- Manage product stock status

### 🛡️ Authentication

- JWT-based authentication
- Protected admin routes
- Authorization middleware
- Admin-only create, update, and delete operations
- Public GET APIs

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Vite
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- dotenv
- CORS

### Tools & Deployment

- Git
- GitHub
- Postman
- VS Code
- Vercel
- Render
- MongoDB Atlas

---

## 🏗️ Project Architecture

```text
Product Management System
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   │
│   │   ├── pages
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
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── controllers
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   └── Product.js
│   ├── routes
│   ├── uploads
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
🔐 Admin Login

The application contains an admin login system using JWT authentication.

Admin Credentials
Email: admin@gmail.com
Password: admin123

After successful login, the server generates a JWT token.

The token is stored on the frontend and sent with protected API requests.

Authorization: Bearer <JWT_TOKEN>
🔒 Authentication Flow
Admin
  │
  ▼
Login Page
  │
  ▼
POST /api/auth/login
  │
  ▼
Backend validates credentials
  │
  ▼
JWT Token Generated
  │
  ▼
Token stored in Browser
  │
  ▼
Protected API Request
  │
  ▼
Auth Middleware
  │
  ▼
Admin Authorization
  │
  ▼
Create / Update / Delete Product
📦 Product Fields

Each product contains the following information:

Field	Type	Required	Description
name	String	Yes	Product name
price	Number	Yes	Product price
category	String	Yes	Product category
inStock	Boolean	Yes	Product stock status
image	String	No	Product image path
createdAt	Date	Auto	Creation timestamp
updatedAt	Date	Auto	Update timestamp
🔌 API Endpoints
Base URL
https://product-management-backend-b3zu.onrender.com
🔑 Authentication API
Admin Login
POST /api/auth/login

Example Request:

{
  "email": "admin@gmail.com",
  "password": "admin123"
}

Example Response:

{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
📋 Product APIs
1. Get All Products
GET /api/products

Authentication:

Public
2. Get Product By ID
GET /api/products/:id

Authentication:

Public
3. Create Product
POST /api/products

Authentication:

Admin JWT Required

Header:

Authorization: Bearer <JWT_TOKEN>

Request uses:

multipart/form-data

Example fields:

name = MacBook
price = 500000
category = Electronics
inStock = true
image = product-image.jpg
4. Update Product
PUT /api/products/:id

Authentication:

Admin JWT Required

Header:

Authorization: Bearer <JWT_TOKEN>
5. Delete Product
DELETE /api/products/:id

Authentication:

Admin JWT Required

Header:

Authorization: Bearer <JWT_TOKEN>
🖼️ Image Upload

Product images are uploaded using Multer.

The backend accepts image files through:

multipart/form-data

Uploaded images are served through:

/uploads/<image-name>

The backend exposes the upload directory using Express static middleware.

🧾 CRUD Operations

The application implements complete CRUD functionality.

Create

Admin can add a new product.

POST /api/products
Read

Users can view all products.

GET /api/products

Users can also view a specific product.

GET /api/products/:id
Update

Admin can update product details.

PUT /api/products/:id
Delete

Admin can delete products.

DELETE /api/products/:id
✅ Validation

The application validates product information before submitting it.

Product Name
Required
Empty values are not allowed
Price
Required
Must be a number
Must be greater than zero
Category
Required
Empty values are not allowed
Stock
Boolean value
Indicates whether the product is available
🗄️ Database

The application uses MongoDB with Mongoose.

MongoDB stores product information including:

Product Name
Price
Category
Stock Status
Image
Created At
Updated At

For production deployment, MongoDB Atlas is used as the database.

🌐 Deployment
Frontend Deployment

The React frontend is deployed on Vercel.

Live URL:

https://product-management-pied-eight.vercel.app/

Frontend environment variable:

VITE_API_URL=https://product-management-backend-b3zu.onrender.com
Backend Deployment

The Node.js + Express backend is deployed on Render.

Live API:

https://product-management-backend-b3zu.onrender.com

Backend environment variables:

PORT=5002
MONGO_URI=<MONGODB_ATLAS_CONNECTION_STRING>
JWT_SECRET=<JWT_SECRET>

Sensitive environment variables are not committed to GitHub.

🧪 Running the Project Locally
1. Clone Repository
git clone https://github.com/Amandwivedi12/Product-management.git

Move into the project:

cd Product-management
⚙️ Backend Setup

Go to backend:

cd backend

Install dependencies:

npm install

Create a .env file:

PORT=5002
MONGO_URI=mongodb://127.0.0.1:27017/product-manager
JWT_SECRET=my_product_manager_secret_2026

Start backend:

node server.js

Backend will run on:

http://localhost:5002
⚛️ Frontend Setup

Open another terminal.

Go to frontend:

cd frontend

Install dependencies:

npm install

Create .env:

VITE_API_URL=http://localhost:5002

Start frontend:

npm run dev

Frontend will run on:

http://localhost:5173
🧪 Testing with Postman

The APIs can be tested using Postman.

Login
POST http://localhost:5002/api/auth/login

Body:

{
  "email": "admin@gmail.com",
  "password": "admin123"
}

Copy the returned JWT token.

For protected APIs, add:

Authorization: Bearer <JWT_TOKEN>
📤 Create Product Using Postman

Method:

POST

URL:

http://localhost:5002/api/products

Authorization:

Bearer Token

Body:

form-data

Fields:

name       → MacBook
price      → 500000
category   → Electronics
inStock    → true
image      → Select Image
📥 Get Products
GET http://localhost:5002/api/products

This endpoint is publicly accessible.

✏️ Update Product
PUT http://localhost:5002/api/products/:id

Admin JWT token is required.

🗑️ Delete Product
DELETE http://localhost:5002/api/products/:id

Admin JWT token is required.

🔐 Security

The application implements basic security practices:

JWT authentication
Protected admin operations
Admin role authorization
Environment variables for secrets
.env excluded from Git
Validation of product data
Authentication middleware
Unauthorized request handling
Invalid/expired token handling
📱 Responsive UI

The frontend provides a simple and responsive user experience.

Main screens include:

Product List
Product Details
Admin Login
Add Product
Edit Product
🔄 Application Flow
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   React Frontend │
                    │     Vercel       │
                    └────────┬─────────┘
                             │
                    REST API Requests
                             │
                             ▼
                    ┌──────────────────┐
                    │ Express Backend  │
                    │     Render       │
                    └────────┬─────────┘
                             │
                 ┌───────────┴───────────┐
                 │                       │
                 ▼                       ▼
          JWT Authentication       Product APIs
                 │                       │
                 └───────────┬───────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     MongoDB      │
                    │   MongoDB Atlas   │
                    └──────────────────┘
📂 Main Functionalities
Product Listing

Users can view all available products from the main product page.

Product Search

Users can search products based on the available product information.

Product Details

Users can open an individual product and view detailed information.

Admin Login

Only authenticated admin users can access product management operations.

Add Product

Admin can create a new product with:

Name
Price
Category
Stock status
Image
Edit Product

Admin can modify existing product information.

Delete Product

Admin can remove an existing product.

Image Management

Admin can upload product images while creating or updating products.

🧰 Development Tools

The project was developed using:

Visual Studio Code
Git
GitHub
Postman
MongoDB
MongoDB Atlas
Vercel
Render
Node.js
npm
📌 Environment Variables

Environment variables are required for local and production environments.

Backend
PORT=5002
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Frontend
VITE_API_URL=http://localhost:5002

For production:

VITE_API_URL=https://product-management-backend-b3zu.onrender.com

Never commit .env files or database passwords to GitHub.

🚀 Future Improvements

Possible future improvements include:

Cloud-based image storage using Cloudinary or AWS S3
Multiple admin/user roles
Pagination
Advanced product filtering
Product categories
Sorting
Better authentication management
Password hashing with bcrypt
Admin dashboard with analytics
Product inventory management
Better error logging
Automated testing
👨‍💻 Author
Aman Dwivedi

B.Tech Computer Science & Engineering

Indore, Madhya Pradesh, India

GitHub

https://github.com/Amandwivedi12

LinkedIn

https://linkedin.com/in/aman021

🔗 Project Links
🌐 Live Application

https://product-management-pied-eight.vercel.app/

⚙️ Backend API

https://product-management-backend-b3zu.onrender.com

💻 GitHub Repository

https://github.com/Amandwivedi12/Product-management

⭐ Project Summary

The Product Management System is a full-stack CRUD application that demonstrates practical implementation of:

React.js
Node.js
Express.js
MongoDB
Mongoose
REST APIs
JWT Authentication
Admin Authorization
CRUD Operations
Image Upload
Form Validation
Axios
Git & GitHub
Vercel Deployment
Render Deployment
MongoDB Atlas

The project demonstrates the complete flow from frontend UI to backend APIs and database operations with admin authentication and product management functionality.
