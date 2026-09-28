import { useEffect, useState } from "react";
import {
    Link,
    useParams
} from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const token =
        localStorage.getItem("adminToken");


    useEffect(() => {

        const fetchProduct = async () => {

            try {

                setLoading(true);

                const response =
                    await fetch(
                        `${API_URL}/api/products/${id}`
                    );

                const data =
                    await response.json();

                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to fetch product"
                    );
                }

                setProduct(
                    data.product
                );

            } catch (error) {

                console.error(error);

                setError(
                    error.message
                );

            } finally {

                setLoading(false);
            }
        };

        fetchProduct();

    }, [id]);


    if (loading) {

        return (
            <div className="page-center">
                Loading product...
            </div>
        );
    }


    if (error) {

        return (
            <div className="page-center">

                <div className="error-message">
                    {error}
                </div>

                <Link
                    to="/"
                    className="primary-btn"
                >
                    Back to Products
                </Link>

            </div>
        );
    }


    if (!product) {
        return null;
    }


    return (

        <div className="container">

            <div className="details-header">

                <Link
                    to="/"
                    className="back-link"
                >
                    ← Back to Products
                </Link>

            </div>


            <div className="details-card">

                {/* IMAGE */}

                <div className="details-image-section">

                    {product.image ? (

                        <img
                            src={
                                `${API_URL}${product.image}`
                            }
                            alt={
                                product.name
                            }
                            className="details-image"
                        />

                    ) : (

                        <div className="details-no-image">
                            No Image Available
                        </div>

                    )}

                </div>


                {/* DETAILS */}

                <div className="details-content">

                    <span className="details-label">
                        PRODUCT DETAILS
                    </span>

                    <h1>
                        {product.name}
                    </h1>

                    <div className="details-price">
                        ₹{product.price}
                    </div>

                    <div className="detail-row">

                        <span>
                            Category
                        </span>

                        <strong>
                            {product.category}
                        </strong>

                    </div>


                    <div className="detail-row">

                        <span>
                            Availability
                        </span>

                        <span
                            className={
                                product.inStock
                                    ? "stock in-stock"
                                    : "stock out-stock"
                            }
                        >
                            {product.inStock
                                ? "In Stock"
                                : "Out of Stock"}
                        </span>

                    </div>


                    {/* ADMIN ACTIONS */}

                    {token && (

                        <div className="details-actions">

                            <Link
                                to={`/admin/edit/${product._id}`}
                                className="edit-btn"
                            >
                                Edit Product
                            </Link>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default ProductDetails;