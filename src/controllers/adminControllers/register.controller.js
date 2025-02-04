import { Admin } from "../../models/admin.model.js";
import { successResponse, errorResponse } from "../../utils/apiResponse.util.js";

export const adminRegisterController = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password)
            return errorResponse(res, 400, "Please fill all fields");

        const isExist = await Admin.findOne({ email });
        if (isExist)
            return errorResponse(res, 400, "Email already exist");

        await Admin.create({
            fullName,
            email,
            password,
        })

        successResponse(res, "Admin registered successfully")

    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
}