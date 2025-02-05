import { Staff } from "../../models/staff.model.js";
import { Admin } from "../../models/admin.model.js";
import { errorResponse, successResponse } from "../../utils/apiResponse.util.js";
import jwt from "jsonwebtoken"

export const getSpecificStaff = async (req, res) => {
    const staffId = req.params.id;

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

        if (!staffId)
            return errorResponse(res, 400, "Staff ID is required");

        const staff = await Staff.findById(staffId).select("-password");

        if (!staff)
            return errorResponse(res, 404, "Staff not found");

        return successResponse(res, "Staff member fetched succseefully", staff);
    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Internal Server Error");
    }
}