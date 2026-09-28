require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Product = require("./models/product");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();


// ==========================================
// MULTER IMAGE UPLOAD CONFIGURATION
// ==========================================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1E9);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    }

});


// Only image files
const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only JPG, JPEG, PNG and WEBP images are allowed"
            )
        );
    }
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});


// ==========================================
// PORT
// ==========================================

const PORT = process.env.PORT || 5002;


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());
app.use(cors());


// Uploaded images publicly accessible
app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);


// ==========================================
// ADMIN LOGIN
// ==========================================

app.post("/api/auth/login", (req, res) => {

    try {

        const { email, password } = req.body;


        if (!email || !password) {

            return res.status(400).json({
                message:
                    "Email and password are required"
            });

        }


        const adminEmail = "admin@gmail.com";
        const adminPassword = "admin123";


        if (
            email !== adminEmail ||
            password !== adminPassword
        ) {

            return res.status(401).json({
                message:
                    "Invalid email or password"
            });

        }


        const token = jwt.sign(

            {
                email: adminEmail,
                role: "admin"
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );


        res.status(200).json({

            message:
                "Login successful",

            token:
                token

        });


    } catch (error) {

        console.log(
            "LOGIN ERROR:",
            error
        );


        res.status(500).json({

            message:
                "Login failed",

            error:
                error.message

        });

    }

});


// ==========================================
// CREATE PRODUCT
// ADMIN ONLY
// ==========================================

app.post(
    "/api/products",
    authMiddleware,
    upload.single("image"),

    async (req, res) => {

        try {

            console.log(
                "CREATE BODY:",
                req.body
            );

            console.log(
                "CREATE FILE:",
                req.file
            );


            if (
                !req.body ||
                !req.body.name ||
                !req.body.price ||
                !req.body.category
            ) {

                return res.status(400).json({

                    message:
                        "Name, price and category are required"

                });

            }


            const price =
                Number(req.body.price);


            if (isNaN(price) || price <= 0) {

                return res.status(400).json({

                    message:
                        "Price must be a positive value"

                });

            }


            const productData = {

                name:
                    req.body.name.trim(),

                price:
                    price,

                category:
                    req.body.category.trim(),

                inStock:
                    req.body.inStock === undefined
                        ? true
                        : req.body.inStock === "true"

            };


            if (req.file) {

                productData.image =
                    `/uploads/${req.file.filename}`;

            }


            const product =
                await Product.create(
                    productData
                );


            res.status(201).json({

                message:
                    "Product created successfully",

                product:
                    product

            });


        } catch (error) {

            console.log(
                "CREATE PRODUCT ERROR:",
                error
            );


            res.status(500).json({

                message:
                    "Failed to create product",

                error:
                    error.message

            });

        }

    }
);


// ==========================================
// GET ALL PRODUCTS
// PUBLIC
// ==========================================

app.get(
    "/api/products",
    async (req, res) => {

        try {

            const products =
                await Product.find()
                    .sort({
                        createdAt: -1
                    });


            res.status(200).json({

                message:
                    "Products fetched successfully",

                products:
                    products

            });


        } catch (error) {

            console.log(
                "GET PRODUCTS ERROR:",
                error
            );


            res.status(500).json({

                message:
                    "Failed to fetch products",

                error:
                    error.message

            });

        }

    }
);


// ==========================================
// GET PRODUCT BY ID
// PUBLIC
// ==========================================

app.get(
    "/api/products/:id",
    async (req, res) => {

        try {

            if (
                !mongoose.Types.ObjectId.isValid(
                    req.params.id
                )
            ) {

                return res.status(400).json({

                    message:
                        "Invalid product ID"

                });

            }


            const product =
                await Product.findById(
                    req.params.id
                );


            if (!product) {

                return res.status(404).json({

                    message:
                        "Product not found"

                });

            }


            res.status(200).json({

                message:
                    "Product fetched successfully",

                product:
                    product

            });


        } catch (error) {

            console.log(
                "GET PRODUCT ERROR:",
                error
            );


            res.status(500).json({

                message:
                    "Failed to fetch product",

                error:
                    error.message

            });

        }

    }
);


// ==========================================
// UPDATE PRODUCT
// ADMIN ONLY
// WITH OPTIONAL IMAGE
// ==========================================

app.put(
    "/api/products/:id",
    authMiddleware,
    upload.single("image"),

    async (req, res) => {

        try {

            console.log(
                "UPDATE BODY:",
                req.body
            );

            console.log(
                "UPDATE FILE:",
                req.file
            );


            if (
                !mongoose.Types.ObjectId.isValid(
                    req.params.id
                )
            ) {

                return res.status(400).json({

                    message:
                        "Invalid product ID"

                });

            }


            if (
                !req.body ||
                !req.body.name ||
                !req.body.price ||
                !req.body.category
            ) {

                return res.status(400).json({

                    message:
                        "Name, price and category are required"

                });

            }


            const price =
                Number(req.body.price);


            if (isNaN(price) || price <= 0) {

                return res.status(400).json({

                    message:
                        "Price must be a positive value"

                });

            }


            // Find existing product first
            const existingProduct =
                await Product.findById(
                    req.params.id
                );


            if (!existingProduct) {

                return res.status(404).json({

                    message:
                        "Product not found"

                });

            }


            const updateData = {

                name:
                    req.body.name.trim(),

                price:
                    price,

                category:
                    req.body.category.trim(),

                inStock:
                    req.body.inStock === undefined
                        ? true
                        : req.body.inStock === "true"

            };


            // New image uploaded
            if (req.file) {

                updateData.image =
                    `/uploads/${req.file.filename}`;


                // Delete old image
                if (existingProduct.image) {

                    const oldImagePath =
                        path.join(
                            __dirname,
                            existingProduct.image
                                .replace(
                                    "/uploads/",
                                    ""
                                )
                        );


                    if (
                        fs.existsSync(
                            oldImagePath
                        )
                    ) {

                        fs.unlinkSync(
                            oldImagePath
                        );

                    }

                }

            }


            const product =
                await Product.findByIdAndUpdate(

                    req.params.id,

                    updateData,

                    {
                        returnDocument: "after",
                        runValidators: true
                    }

                );


            res.status(200).json({

                message:
                    "Product updated successfully",

                product:
                    product

            });


        } catch (error) {

            console.log(
                "UPDATE PRODUCT ERROR:",
                error
            );


            res.status(500).json({

                message:
                    "Failed to update product",

                error:
                    error.message

            });

        }

    }
);


// ==========================================
// DELETE PRODUCT
// ADMIN ONLY
// ==========================================

app.delete(
    "/api/products/:id",
    authMiddleware,

    async (req, res) => {

        try {

            if (
                !mongoose.Types.ObjectId.isValid(
                    req.params.id
                )
            ) {

                return res.status(400).json({

                    message:
                        "Invalid product ID"

                });

            }


            const product =
                await Product.findById(
                    req.params.id
                );


            if (!product) {

                return res.status(404).json({

                    message:
                        "Product not found"

                });

            }


            // Delete image from uploads folder
            if (product.image) {

                const imagePath =
                    path.join(
                        __dirname,
                        product.image.replace(
                            "/uploads/",
                            ""
                        )
                    );


                if (
                    fs.existsSync(imagePath)
                ) {

                    fs.unlinkSync(
                        imagePath
                    );

                }

            }


            await Product.findByIdAndDelete(
                req.params.id
            );


            res.status(200).json({

                message:
                    "Product deleted successfully"

            });


        } catch (error) {

            console.log(
                "DELETE PRODUCT ERROR:",
                error
            );


            res.status(500).json({

                message:
                    "Failed to delete product",

                error:
                    error.message

            });

        }

    }
);


// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {

    res.json({

        message:
            "Product Manager API is Running"

    });

});


// ==========================================
// MULTER ERROR HANDLER
// ==========================================

app.use(
    (error, req, res, next) => {

        if (
            error instanceof multer.MulterError
        ) {

            return res.status(400).json({

                message:
                    error.message

            });

        }


        if (
            error.message &&
            error.message.includes(
                "Only JPG"
            )
        ) {

            return res.status(400).json({

                message:
                    error.message

            });

        }


        next(error);

    }
);


// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose
    .connect(
        process.env.MONGO_URI
    )

    .then(() => {

        console.log(
            "MongoDB Connected Successfully"
        );


        app.listen(
            PORT,
            () => {

                console.log(
                    `server is running on port ${PORT}`
                );

            }
        );

    })

    .catch((error) => {

        console.log(
            "MongoDB connection Failed",
            error.message
        );

    });