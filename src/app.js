import express from "express";
import adminRoutes from "./routes/admin.routes.js"
import vendorRoutes from "./routes/vendor.routes.js"
import staffRoutes from "./routes/staff.routes.js"
import buyerRoutes from "./routes/buyer.routes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", adminRoutes)
app.use("/api/vendor", vendorRoutes)
app.use("/api/staff", staffRoutes)
app.use("/api/buyer", buyerRoutes)

export { app };
