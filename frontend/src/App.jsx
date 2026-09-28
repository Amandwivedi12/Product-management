import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Product List */}
                <Route
                    path="/"
                    element={<Products />}
                />

                {/* Public Product Details */}
                <Route
                    path="/products/:id"
                    element={<ProductDetails />}
                />

                {/* Admin Login */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Admin Add Product */}
                <Route
                    path="/add-product"
                    element={<AddProduct />}
                />

                {/* Admin Edit Product */}
                <Route
                    path="/edit-product/:id"
                    element={<EditProduct />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;