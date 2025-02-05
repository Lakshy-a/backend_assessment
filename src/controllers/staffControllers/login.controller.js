import { errorResponse, successResponse } from "../../utils/apiResponse.util.js";
import { Staff } from "../../models/staff.model.js";
import bcryptjs from "bcryptjs"
import { generateAccessToken } from "../../utils/generateTokens.util.js";

export const staffLoginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password)
            return errorResponse(res, 400, "Email and password are required");

        const staff = await Staff.findOne({ email });
        if (!staff)
            return errorResponse(res, 404, "Staff not found");

        const isPasswordCorrect = await bcryptjs.compare(password, staff.password);
        if (!isPasswordCorrect)
            return errorResponse(res, 401, "Invalid password");

        const accessTokenData = {
            staffId: staff._id,
            email: staff.email,
            role: staff.role
        }

        const staffAccessToken = generateAccessToken(accessTokenData);

        const data = {
            accessToken: staffAccessToken,
            role: staff.role,
            name: staff.fullName,
            email: staff.email
        }

        successResponse(res, 400, data);

    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, res.message);
    }
}