import { Admin } from "../../models/admin.model.js";
import { successResponse, errorResponse } from "../../utils/apiResponse.util.js";
import bcryptjs from "bcryptjs";
import { generateAccessToken } from "../../utils/generateTokens.util.js";

export const adminLoginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password)
            return errorResponse(res, 400, "Email and password are required");

        const isExist = await Admin.findOne({ email })
        if (!isExist)
            return errorResponse(res, 404, "Admin not found");

        const isPasswordCorrect = await bcryptjs.compare(password, isExist.password);
        if (!isPasswordCorrect)
            return errorResponse(res, 401, "Invalid password");

        const accessToken = generateAccessToken({
            id: isExist._id,
            email: isExist.email,
            role: isExist.role
        });

        const admin = {
            id: isExist._id,
            name: isExist.fullName,
            email: isExist.email,
            role: isExist.role,
            token: accessToken
        }

        successResponse(res, "Admin logged in successfully", admin)
    } catch (error) {
        return errorResponse(res, 500, error.message)
    }
}