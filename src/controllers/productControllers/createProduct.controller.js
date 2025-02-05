import { Product } from "../../models/productInfo.model.js";
import { Admin } from "../../models/admin.model.js";
import { successResponse, errorResponse } from "../../utils/apiResponse.util.js";
import jwt from "jsonwebtoken";

export const createProduct = async (req, res) => {
    const { name, description, images, productCategory, oldPrice, newPrice } = req.body;

    try {
        const adminAccessToken = req.headers.accesstoken;
        if (!adminAccessToken)
            return errorResponse(res, 401, "No access token found");

        const adminDetails = jwt.verify(adminAccessToken, process.env.ACCESS_TOKEN_SECRET);
        const { email, role } = adminDetails;

        const isAdminExist = await Admin.findOne({ email });
        if (!isAdminExist)
            return errorResponse(res, 404, "Admin not found");

        if (role !== "Admin")
            return errorResponse(res, 403, "Unauthorized");


        if (!name || !description || !images || !productCategory || !oldPrice || !newPrice)
            return errorResponse(res, 400, "All fields are required");

        const isProductExist = await Product.findOne({ images, name });
        if (isProductExist) return errorResponse(res, 400, "Product already exist");

        await Product.create({
            name,
            oldPrice,
            newPrice,
            productCategory,
            description,
            images,
        })

        successResponse(res, "Product created successfully",)
    } catch (error) {
        console.log(error);
        errorResponse(res, 500, error.message);
    }
}