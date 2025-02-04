import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,

        },
        productCategory: {
            type: String,
            default: "Uncategorized",
            required: true,

        },
        images: {
            type: String,
            unique: true,
            required: true,
        },
        scheduledStartDate: {
            type: Date,
            default: Date.now,
        },
        scheduledEndDate: {
            type: Date,
            default: scheduledStartDate + 7,
        },
        oldPrice: {
            type: Number,
            default: 0,
        },
        newPrice: {
            type: Number,
            default: 0,
            required: true,

        }
    },
    { timestamps: true }
);

productSchema.pre("save", function (next) {
    if (this.productDiscountedPrice > this.productPrice) {
        const error = new Error(
            "Discounted price cannot be greater than the original price."
        );
        return next(error);
    }
    next();
});

export const Product = mongoose.model("Product", productSchema);
