import { useEffect, useState } from "react";
import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function EditProduct() {

    const { id } = useParams();

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

    const [oldImage, setOldImage] =
        useState("");


    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    // GET PRODUCT

    useEffect(() => {

        if (!token) {

            navigate("/login");

            return;
        }


        const fetchProduct =
            async () => {

                try {

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


                    const product =
                        data.product;


                    setName(
                        product.name
                    );

                    setPrice(
                        product.price
                    );

                    setCategory(
                        product.category
                    );

                    setInStock(
                        product.inStock
                    );

                    setOldImage(
                        product.image ||
                        ""
                    );

                } catch (error) {

                    setError(
                        error.message
                    );

                } finally {

                    setLoading(false);
                }
            };


        fetchProduct();

    }, [id, token, navigate]);


    // UPDATE

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            setError("");
            setSuccess("");


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

                setSaving(true);


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
                        `${API_URL}/api/products/${id}`,
                        {
                            method: "PUT",

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
                        "Failed to update product"
                    );
                }


                setSuccess(
                    "Product updated successfully"
                );


                setTimeout(() => {

                    navigate(
                        `/products/${id}`
                    );

                }, 800);


            } catch (error) {

                console.error(error);

                setError(
                    error.message
                );

            } finally {

                setSaving(false);
            }
        };


    if (loading) {

        return (
            <div className="page-center">
                Loading product...
            </div>
        );
    }


    return (

        <div className="container">

            <div className="form-page">

                <Link
                    to={`/products/${id}`}
                    className="back-link"
                >
                    ← Back to Product
                </Link>


                <div className="form-card">

                    <h1>
                        Edit Product
                    </h1>

                    <p>
                        Update product information
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

                        <label>
                            Product Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                        />


                        <label>
                            Price
                        </label>

                        <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={price}
                            onChange={(e) =>
                                setPrice(
                                    e.target.value
                                )
                            }
                        />


                        <label>
                            Category
                        </label>

                        <input
                            type="text"
                            value={category}
                            onChange={(e) =>
                                setCategory(
                                    e.target.value
                                )
                            }
                        />


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


                        {/* CURRENT IMAGE */}

                        {oldImage && (

                            <div className="current-image">

                                <p>
                                    Current Image
                                </p>

                                <img
                                    src={
                                        `${API_URL}${oldImage}`
                                    }
                                    alt="Current product"
                                />

                            </div>

                        )}


                        <label>
                            New Product Image
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
                            Leave empty to keep
                            current image.
                        </small>


                        <div className="form-actions">

                            <button
                                type="submit"
                                className="primary-btn"
                                disabled={saving}
                            >
                                {saving
                                    ? "Updating..."
                                    : "Update Product"}
                            </button>


                            <Link
                                to={`/products/${id}`}
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

export default EditProduct;