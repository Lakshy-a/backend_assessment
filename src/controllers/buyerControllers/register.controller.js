import { Buyer } from "../../models/buyer.model.js";
import { successResponse, errorResponse } from "../../utils/apiResponse.util.js";

export const buyerRegisterController = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password)
            return errorResponse(res, 400, "Please fill all fields");

        const isExist = await Buyer.findOne({ email });
        if (isExist)
            return errorResponse(res, 400, "Email already exist");

        await Buyer.create({
            fullName,
            email,
            password,
        })

        successResponse(res, "Buyer registered successfully")

    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
}