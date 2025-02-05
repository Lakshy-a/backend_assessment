import express from "express";
import adminRoutes from "./routes/admin.routes.js"
import vendorRoutes from "./routes/vendor.routes.js"
import staffRoutes from "./routes/staff.routes.js"
import buyerRoutes from "./routes/buyer.routes.js"
import productRoutes from "./routes/product.routes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", adminRoutes)
app.use("/api/vendor", vendorRoutes)
app.use("/api/staff", staffRoutes)
app.use("/api/buyer", buyerRoutes)
app.use("/api/product", productRoutes)

export { app };
