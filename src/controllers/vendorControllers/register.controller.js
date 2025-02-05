import { successResponse, errorResponse } from "../../utils/apiResponse.util.js"
import { Vendor } from "../../models/vendors.model.js";

export const vendorRegisterController = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password)
            return errorResponse(res, 400, "Please fill all fields");

        const isExist = await Vendor.findOne({ email });
        if (isExist)
            return errorResponse(res, 400, "Email already exist");

        await Vendor.create({
            fullName,
            email,
            password,
        })

        successResponse(res, "Vendor registered successfully")

    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
}