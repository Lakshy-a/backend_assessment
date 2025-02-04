import { Buyer } from "../../models/buyer.model.js";
import { successResponse, errorResponse } from "../../utils/apiResponse.util.js";
import bcryptjs from "bcryptjs";
import { generateAccessToken } from "../../utils/generateTokens.util.js";

export const buyerLoginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password)
            return errorResponse(res, 400, "Email and password are required");

        const isExist = await Buyer.findOne({ email })
        if (!isExist)
            return errorResponse(res, 404, "Buyer not found");

        const isPasswordCorrect = await bcryptjs.compare(password, isExist.password);
        if (!isPasswordCorrect)
            return errorResponse(res, 401, "Invalid password");

        const accessToken = generateAccessToken({
            id: isExist._id,
            email: isExist.email,
            role: isExist.role
        });

        const buyer = {
            id: isExist._id,
            name: isExist.fullName,
            email: isExist.email,
            role: isExist.role,
            token: accessToken
        }

        successResponse(res, "Buyer logged in successfully", buyer)
    } catch (error) {
        return errorResponse(res, 500, error.message)
    }
}