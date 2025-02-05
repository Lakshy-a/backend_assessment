import { successResponse, errorResponse } from "../../utils/apiResponse.util.js";
import { Staff } from "../../models/staff.model.js";
import { Admin } from "../../models/admin.model.js";
import jwt from "jsonwebtoken";

export const staffRegisterController = async (req, res) => {
    try {
        const adminAccessToken = req.headers.accesstoken;
        if (!adminAccessToken)
            return errorResponse(res, 401, "No access token found");

        const adminDetails = jwt.verify(adminAccessToken, process.env.ACCESS_TOKEN_SECRET);
        const { email, role } = adminDetails;

        const isAdminExist = await Admin.findOne({ email });
        if (!isAdminExist)
            return errorResponse(res, 404, "Admin not found");

        if (role !== "Admin") {
            return errorResponse(res, 403, "Unauthorized");
        }

        const { fullName, email: staffEmail, password } = req.body;
        if (!fullName || !staffEmail || !password)
            return errorResponse(res, 400, "Please fill all the fields");

        const isStaffExist = await Staff.findOne({ email: staffEmail });
        if (isStaffExist)
            return errorResponse(res, 400, "Staff already exist with this email");

        await Staff.create({
            fullName,
            email: staffEmail,
            password,
        })

        successResponse(res, "Staff person created successfully",)
    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Internal Server error");
    }
}