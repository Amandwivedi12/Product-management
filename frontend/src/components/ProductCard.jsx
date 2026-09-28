import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function ProductCard({
    product,
    isAdmin,
    onDelete
}) {

    return (

        <div className="product-card">

            {product.image ? (

                <img
                    src={
                        `${API_URL}${product.image}`
                    }
                    alt={product.name}
                    className="product-image"
                />

            ) : (

                <div className="no-image">
                    No Image
                </div>

            )}


            <div className="product-content">

                <h3>
                    {product.name}
                </h3>

                <div className="price">
                    ₹{product.price}
                </div>

                <p>
                    Category:{" "}
                    {product.category}
                </p>


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


                <div className="product-actions">

                    <Link
                        to={`/products/${product._id}`}
                        className="view-btn"
                    >
                        View
                    </Link>


                    {isAdmin && (

                        <>
                            <Link
                                to={`/admin/edit/${product._id}`}
                                className="edit-btn"
                            >
                                Edit
                            </Link>

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    onDelete(
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
    );
}

export default ProductCard;