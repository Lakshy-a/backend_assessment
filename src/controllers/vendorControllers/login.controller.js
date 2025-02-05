import bcryptjs from "bcryptjs"
import { successResponse, errorResponse } from "../../utils/apiResponse.util.js"
import { Vendor } from "../../models/vendors.model.js";
import {generateAccessToken} from "../../utils/generateTokens.util.js"

export const vendorLoginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password)
            return errorResponse(res, 400, "Email and password are required");

        const isExist = await Vendor.findOne({ email })
        if (!isExist)
            return errorResponse(res, 404, "Vendor not found");

        const isPasswordCorrect = await bcryptjs.compare(password, isExist.password);
        if (!isPasswordCorrect)
            return errorResponse(res, 401, "Invalid password");

        const accessToken = generateAccessToken({
            id: isExist._id,
            email: isExist.email,
            role: isExist.role
        });

        const vendor = {
            id: isExist._id,
            name: isExist.fullName,
            email: isExist.email,
            role: isExist.role,
            token: accessToken
        }

        successResponse(res, "Vendor logged in successfully", vendor)
    } catch (error) {
        return errorResponse(res, 500, error.message)
    }
}