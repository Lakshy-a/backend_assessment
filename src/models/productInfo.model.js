import mongoose from "mongoose";
import { Vendor } from "./vendors.model.js";

const productSchema = new mongoose.Schema(
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
            default: function () {
                return new Date(this.scheduledStartDate.getTime() + 7 * 24 * 60 * 60 * 1000);
            },
        },
        oldPrice: {
            type: Number,
            default: 0,
        },
        newPrice: {
            type: Number,
            required: true,
        },
        vendorInfo: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Vendor",
                default: ""
            }
        ],
    },
    { timestamps: true }
);

productSchema.virtual("discountPercentage").get(function () {
    if (this.oldPrice > 0) {
        return ((this.oldPrice - this.newPrice) / this.oldPrice) * 100;
    }
    return 0;
});

productSchema.pre("save", function (next) {
    if (this.newPrice > this.oldPrice) {
        return next(new Error("Discounted price cannot be greater than the original price."));
    }
    next();
});

export const Product = mongoose.model("Product", productSchema);
