const mongoose = require("mongoose");


const productSchema =
    new mongoose.Schema(

        {

            name: {

                type: String,

                required: true,

                trim: true

            },


            price: {

                type: Number,

                required: true,

                min: 0.01

            },


            category: {

                type: String,

                required: true,

                trim: true

            },


            inStock: {

                type: Boolean,

                required: true,

                default: true

            },


            image: {

                type: String

            }

        },

        {
            timestamps: true
        }

    );


module.exports =
    mongoose.model(
        "Product",
        productSchema
    );