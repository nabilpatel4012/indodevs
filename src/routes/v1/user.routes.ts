import express from "express";
import { Controllers } from "../../controllers";
import { asyncHandler } from "../../utils/common.utils";

export const userRoutes = express.Router();

userRoutes.post("/", asyncHandler(Controllers.userController.addUser));
userRoutes.get("/", asyncHandler(Controllers.userController.getAllUser));
userRoutes.get(
  "/stats",
  asyncHandler(Controllers.userController.getUserGenderPercentage)
);
userRoutes.get("/:id", asyncHandler(Controllers.userController.getUser));
