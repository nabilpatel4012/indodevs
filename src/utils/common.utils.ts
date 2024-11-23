import { Request, Response, NextFunction } from "express";
import { PAGINATION } from "../config/constants";

export function formatResponse<T>(
  status: "success" | "error",
  data: T,
  message = ""
) {
  return {
    status,
    message,
    data,
  };
}

export function parsePagination(req: Request) {
  const size = Number(req.query.size) || PAGINATION.DEFAULT_SIZE;
  const page = Number(req.query.page) || PAGINATION.DEFAULT_PAGE;

  return { size, page };
}

export function validateValue(value: string, allowedValues: string[]): boolean {
  return allowedValues.includes(value);
}

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
}
