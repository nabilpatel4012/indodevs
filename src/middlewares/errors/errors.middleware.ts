import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../../config/constants";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`[ERROR]: ${err.message}`, err.stack);

  const statusCode = err.name === "ValidationError" ? 400 : 500;
  const message =
    statusCode === 500 ? ERROR_MESSAGES.INTERNAL_SERVER_ERROR : err.message;

  res.status(statusCode).json({
    status: "error",
    message,
  });
}
