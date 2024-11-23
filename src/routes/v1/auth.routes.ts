import express from "express";
import { Controllers } from "../../controllers";
import { asyncHandler } from "../../utils/common.utils";

export const authRoutes = express.Router();

authRoutes.get(
  "/",
  asyncHandler(Controllers.octokitController.getAuthenticated)
);
authRoutes.get(
  "/issues",
  asyncHandler(Controllers.octokitController.getRepoIssues)
);
