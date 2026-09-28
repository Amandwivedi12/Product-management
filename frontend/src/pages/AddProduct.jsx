import { useState } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function AddProduct() {

    const navigate = useNavigate();

    const token =
        localStorage.getItem("adminToken");


    const [name, setName] =
        useState("");

    const [price, setPrice] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [inStock, setInStock] =
        useState(true);

    const [image, setImage] =
        useState(null);


    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // Authentication check

        if (!token) {

            navigate("/login");

            return;
        }


        // Frontend validation

        if (
            !name.trim() ||
            !price ||
            !category.trim()
        ) {

            setError(
                "Name, price and category are required"
            );

            return;
        }


        if (
            Number(price) <= 0
        ) {

            setError(
                "Price must be greater than 0"
            );

            return;
        }


        try {

            setLoading(true);


            const formData =
                new FormData();

            formData.append(
                "name",
                name
            );

            formData.append(
                "price",
                price
            );

            formData.append(
                "category",
                category
            );

            formData.append(
                "inStock",
                inStock
            );


            if (image) {

                formData.append(
                    "image",
                    image
                );
            }


            const response =
                await fetch(
                    `${API_URL}/api/products`,
                    {
                        method: "POST",

                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },

                        body: formData,
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to create product"
                );
            }


            setSuccess(
                "Product created successfully"
            );


            setTimeout(() => {

                navigate("/");

            }, 800);


        } catch (error) {

            console.error(error);

            setError(
                error.message
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="container">

            <div className="form-page">

                <Link
                    to="/"
                    className="back-link"
                >
                    ← Back to Products
                </Link>


                <div className="form-card">

                    <h1>
                        Add Product
                    </h1>

                    <p>
                        Create a new product
                    </p>


                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}


                    {success && (
                        <div className="success-message">
                            {success}
                        </div>
                    )}


                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        {/* NAME */}

                        <label>
                            Product Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter product name"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                        />


                        {/* PRICE */}

                        <label>
                            Price
                        </label>

                        <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) =>
                                setPrice(
                                    e.target.value
                                )
                            }
                        />


                        {/* CATEGORY */}

                        <label>
                            Category
                        </label>

                        <input
                            type="text"
                            placeholder="Enter category"
                            value={category}
                            onChange={(e) =>
                                setCategory(
                                    e.target.value
                                )
                            }
                        />


                        {/* STOCK */}

                        <label>
                            Stock Status
                        </label>

                        <select
                            value={
                                inStock
                                    ? "true"
                                    : "false"
                            }
                            onChange={(e) =>
                                setInStock(
                                    e.target.value ===
                                    "true"
                                )
                            }
                        >
                            <option value="true">
                                In Stock
                            </option>

                            <option value="false">
                                Out of Stock
                            </option>
                        </select>


                        {/* IMAGE */}

                        <label>
                            Product Image
                        </label>

                        <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={(e) =>
                                setImage(
                                    e.target.files[0]
                                )
                            }
                        />

                        <small>
                            JPG, JPEG, PNG or WEBP.
                            Maximum 5MB.
                        </small>


                        {/* BUTTONS */}

                        <div className="form-actions">

                            <button
                                type="submit"
                                className="primary-btn"
                                disabled={loading}
                            >
                                {loading
                                    ? "Creating..."
                                    : "Create Product"}
                            </button>

                            <Link
                                to="/"
                                className="cancel-btn"
                            >
                                Cancel
                            </Link>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddProduct;