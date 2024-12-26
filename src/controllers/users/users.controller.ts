import { Request, Response } from "express";
import { parsePagination, formatResponse } from "../../utils/common.utils";
import { Services } from "../../services";
import { ERROR_MESSAGES } from "../../config/constants";

export class UserController {
  /**
   * Handles the creation of a new user.
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<Response>} The response containing the newly created user's data.
   * @throws {Error} Throws "InvalidGenderError" for invalid gender input.
   */
  static async addUser(req: Request, res: Response) {
    const user = req.body;
    try {
      const response = await Services.userService.addUser(user);
      return res
        .status(201)
        .json(
          formatResponse("success", response, "User created successfully.")
        );
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "InvalidGenderError") {
          return res
            .status(400)
            .json(formatResponse("error", null, ERROR_MESSAGES.INVALID_GENDER));
        }
      }
      throw error; // Forward to error middleware
    }
  }

  /**
   * Retrieves a user's data based on their ID.
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<Response>} The response containing the user's data.
   * @throws {Error} Throws "UserNotFoundError" if the user is not found.
   */
  static async getUser(req: Request, res: Response) {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      return res
        .status(400)
        .json(formatResponse("error", null, ERROR_MESSAGES.INVALID_USER_ID));
    }
    try {
      const response = await Services.userService.getUser(userId);
      return res
        .status(200)
        .json(
          formatResponse("success", response, "User retrieved successfully.")
        );
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "UserNotFoundError") {
          return res
            .status(404)
            .json(formatResponse("error", null, ERROR_MESSAGES.USER_NOT_FOUND));
        }
        return res
          .status(500)
          .json(
            formatResponse(
              "error",
              null,
              error.message || "Internal Server Error"
            )
          );
      }
      throw error; // Forward to error middleware
    }
  }

  /**
   * Retrieves a paginated list of users.
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<Response>} The response containing the list of users.
   */
  static async getAllUser(req: Request, res: Response) {
    const { size, page } = parsePagination(req);
    try {
      const response = await Services.userService.getAllUsers(size, page);
      return res.status(200).json(formatResponse("success", response));
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json(
            formatResponse(
              "error",
              null,
              error.message || "Internal Server Error"
            )
          );
      }
      throw error; // Forward to error middleware
    }
  }

  /**
   * Calculates and retrieves the percentage distribution of users by gender.
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<Response>} The response containing the gender percentages.
   */
  static async getUserGenderPercentage(req: Request, res: Response) {
    try {
      const response = await Services.userService.getUserGenderPercentage();
      return res
        .status(200)
        .json(
          formatResponse(
            "success",
            response,
            "Gender percentages calculated successfully."
          )
        );
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json(
            formatResponse(
              "error",
              null,
              error.message || "Internal Server Error"
            )
          );
      }
      throw error; // Forward to error middleware
    }
  }

  /**
   * Retrieves the number of records of users.
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<Response>} The response containing the gender percentages.
   */
  static async getUsersCount(req: Request, res: Response) {
    try {
      const response = await Services.userService.getUsersCount();
      return res
        .status(200)
        .json(formatResponse("success", response, "Count success."));
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json(
            formatResponse(
              "error",
              null,
              error.message || "Internal Server Error"
            )
          );
      }
      throw error; // Forward to error middleware
    }
  }
}
