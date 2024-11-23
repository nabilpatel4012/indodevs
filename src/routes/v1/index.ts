import express from "express";
import { userRoutes } from "./user.routes";
import { authRoutes } from "./auth.routes";

const apiV1Routes = express.Router();

apiV1Routes.use("/users", userRoutes);
apiV1Routes.use("/auth", authRoutes);

export default apiV1Routes;
