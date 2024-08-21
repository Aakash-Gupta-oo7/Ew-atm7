import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        VariantImages: {
            type: mongoose.Types.ObjectId,
            ref: "Images"
        },
        Variant: {
            type: mongoose.Types.ObjectId,
            ref: "Variants"
        },
        reviews: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Reviews"
            }
        ],
        photos: {
            type: mongoose.Types.ObjectId,
            ref: "Images"
        }
    },
    {
        timestamps: true
    }
);

export const BrandModel = mongoose.model("Brands", BrandSchema);