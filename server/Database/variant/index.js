import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema(
    {
        Variants: [
            {
                name: {
                    type: String,
                    required: true
                },
                items: [
                    {
                        type: mongoose.Types.ObjectId,
                        ref: "Products"
                    }
                ]
            }
        ],
        recommended: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Products",
                unique: true
            }
        ]
    },
    {
        timestamps: true
    }
);

export const VariantModel = mongoose.model("Variants", VariantSchema);