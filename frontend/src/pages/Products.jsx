import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5002";

function Products() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =========================
    // Admin Token
    // =========================
    const token = localStorage.getItem("token");
    const isAdmin = !!token;

    // =========================
    // Fetch Products
    // =========================
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            console.log(
                "Fetching products from:",
                API_URL
            );

            const response = await axios.get(
                `${API_URL}/api/products`
            );

            console.log(
                "Products API response:",
                response.data
            );

            /*
                Backend response:

                {
                    message:
                        "Products fetched successfully",

                    products: [...]
                }
            */

            if (
                Array.isArray(
                    response.data.products
                )
            ) {
                setProducts(
                    response.data.products
                );
            } else {
                setProducts([]);
            }

        } catch (error) {
            console.error(
                "Error fetching products:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Unable to load products. Please try again."
            );

            setProducts([]);

        } finally {
            setLoading(false);
        }
    };

    // =========================
    // Load Products
    // =========================
    useEffect(() => {
        fetchProducts();
    }, []);

    // =========================
    // Admin Logout
    // =========================
    const handleLogout = () => {
        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) {
            return;
        }

        localStorage.removeItem("token");

        navigate("/");

        window.location.reload();
    };

    // =========================
    // Delete Product
    // =========================
    const handleDelete = async (id) => {
        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this product?"
            );

        if (!confirmDelete) {
            return;
        }

        try {
            await axios.delete(
                `${API_URL}/api/products/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setProducts(
                (prevProducts) =>
                    prevProducts.filter(
                        (product) =>
                            product._id !== id
                    )
            );

            alert(
                "Product deleted successfully."
            );

        } catch (error) {
            console.error(
                "Delete error:",
                error
            );

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {
                alert(
                    "Your admin session has expired. Please login again."
                );

                localStorage.removeItem(
                    "token"
                );

                navigate("/login");

                return;
            }

            alert(
                error.response?.data?.message ||
                "Failed to delete product."
            );
        }
    };

    // =========================
    // Search Filter
    // =========================
    const filteredProducts =
        products.filter((product) => {

            const searchText =
                search
                    .toLowerCase()
                    .trim();

            return (
                product.name
                    ?.toLowerCase()
                    .includes(searchText) ||

                product.category
                    ?.toLowerCase()
                    .includes(searchText)
            );
        });

    // =========================
    // Loading
    // =========================
    if (loading) {
        return (
            <div className="page-container">

                <div className="loading-container">

                    <div className="loader"></div>

                    <h2>
                        Loading products...
                    </h2>

                    <p>
                        Please wait while we
                        fetch the products.
                    </p>

                </div>

            </div>
        );
    }

    // =========================
    // Main UI
    // =========================
    return (
        <div className="page-container">

            {/* =========================
                Header
            ========================= */}
            <div className="products-header">

                {/* Title */}
                <div>

                    <h1>
                        Product Management
                    </h1>

                    <p>
                        Browse and manage your products
                    </p>

                </div>

                {/* Header Actions */}
                <div className="header-actions">

                    {isAdmin ? (
                        <>
                            {/* Add Product */}
                            <button
                                className="admin-btn"
                                onClick={() =>
                                    navigate(
                                        "/add-product"
                                    )
                                }
                            >
                                + Add Product
                            </button>

                            {/* Logout */}
                            <button
                                className="logout-btn"
                                onClick={
                                    handleLogout
                                }
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        /* Admin Login */
                        <button
                            className="admin-login-btn"
                            onClick={() =>
                                navigate("/login")
                            }
                        >
                            Admin Sign In
                        </button>
                    )}

                </div>

            </div>

            {/* =========================
                Search
            ========================= */}
            <div className="search-container">

                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by product name or category..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>

            {/* =========================
                Error
            ========================= */}
            {error && (
                <div className="error-message">

                    <strong>
                        Error:
                    </strong>{" "}

                    {error}

                    <button
                        onClick={
                            fetchProducts
                        }
                        style={{
                            marginLeft: "12px"
                        }}
                    >
                        Retry
                    </button>

                </div>
            )}

            {/* =========================
                Product Count
            ========================= */}
            <div className="products-info">

                <p>

                    Showing{" "}

                    <strong>
                        {
                            filteredProducts.length
                        }
                    </strong>{" "}

                    of{" "}

                    <strong>
                        {products.length}
                    </strong>{" "}

                    products

                </p>

            </div>

            {/* =========================
                Empty Products
            ========================= */}
            {filteredProducts.length === 0 ? (

                <div className="empty-products">

                    <div className="empty-icon">
                        📦
                    </div>

                    <h2>
                        No products found
                    </h2>

                    <p>
                        {search
                            ? "Try searching with a different product name or category."
                            : "No products are available right now."}
                    </p>

                    {isAdmin &&
                        !search && (
                            <button
                                className="admin-btn"
                                onClick={() =>
                                    navigate(
                                        "/add-product"
                                    )
                                }
                            >
                                + Add Your First Product
                            </button>
                        )}

                </div>

            ) : (

                /* =========================
                   Product Grid
                ========================= */
                <div className="products-grid">

                    {filteredProducts.map(
                        (product) => (

                            <div
                                className="product-card"
                                key={
                                    product._id
                                }
                            >

                                {/* =========================
                                    Product Image
                                ========================= */}
                                {product.image ? (

                                    <div className="product-image-wrapper">

                                        <img
                                            className="product-image"
                                            src={`${API_URL}${product.image}`}
                                            alt={
                                                product.name
                                            }
                                            onError={(
                                                e
                                            ) => {

                                                e
                                                    .currentTarget
                                                    .style
                                                    .display =
                                                    "none";

                                                const parent =
                                                    e
                                                        .currentTarget
                                                        .parentElement;

                                                if (
                                                    parent &&
                                                    !parent.querySelector(
                                                        ".image-error"
                                                    )
                                                ) {

                                                    const fallback =
                                                        document.createElement(
                                                            "div"
                                                        );

                                                    fallback.className =
                                                        "image-error";

                                                    fallback.innerText =
                                                        "Image unavailable";

                                                    parent.appendChild(
                                                        fallback
                                                    );
                                                }

                                            }}
                                        />

                                    </div>

                                ) : (

                                    <div className="no-image">

                                        <span>
                                            📦
                                        </span>

                                        <p>
                                            No Image Available
                                        </p>

                                    </div>

                                )}

                                {/* =========================
                                    Product Content
                                ========================= */}
                                <div className="product-content">

                                    <h3>
                                        {
                                            product.name
                                        }
                                    </h3>

                                    <p className="product-price">

                                        ₹
                                        {Number(
                                            product.price ||
                                            0
                                        ).toLocaleString(
                                            "en-IN"
                                        )}

                                    </p>

                                    <p className="product-info">

                                        <strong>
                                            Category:
                                        </strong>{" "}

                                        {
                                            product.category
                                        }

                                    </p>

                                    {/* Stock */}
                                    <span
                                        className={
                                            product.inStock
                                                ? "stock-badge"
                                                : "stock-badge out-of-stock"
                                        }
                                    >
                                        {product.inStock
                                            ? "In Stock"
                                            : "Out of Stock"}
                                    </span>

                                    {/* =========================
                                        Buttons
                                    ========================= */}
                                    <div className="button-row">

                                        {/* View */}
                                        <button
                                            className="view-btn"
                                            onClick={() =>
                                                navigate(
                                                    `/products/${product._id}`
                                                )
                                            }
                                        >
                                            View
                                        </button>

                                        {/* Admin Actions */}
                                        {isAdmin && (
                                            <>
                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        navigate(
                                                            `/edit-product/${product._id}`
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDelete(
                                                            product._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}

                                    </div>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>
    );
}

export default Products;