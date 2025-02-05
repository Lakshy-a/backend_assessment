import { Vendor } from "../../models/vendors.model.js";
import { Admin } from "../../models/admin.model.js";
import { errorResponse, successResponse } from "../../utils/apiResponse.util.js";
import jwt from "jsonwebtoken"

export const getOneVendor = async (req, res) => {
    const vendorId = req.params.id;

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

        if (!vendorId)
            return errorResponse(res, 400, "Vendor ID is required");

        const vendor = await Vendor.findById(vendorId).select("-password");

        if (!vendor)
            return errorResponse(res, 404, "Vendor not found");

        return successResponse(res, "Vendor member fetched succseefully", vendor);
    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Internal Server Error");
    }
}