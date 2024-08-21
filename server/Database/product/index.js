import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        descript: {
            type: String,
            required: true
        },
        photos: {
            type: mongoose.Types.ObjectId,
            ref: "Images"
        },
        price: {
            type: Number,
            default: "-",
            required: true
        },
        brand: {
            type: mongoose.Types.ObjectId,
            ref: "Brands",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const ProductModel = mongoose.model("Products", ProductSchema);