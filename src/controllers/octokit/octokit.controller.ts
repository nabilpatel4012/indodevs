import { Request, Response } from "express";
import { formatResponse } from "../../utils/common.utils";
import { Services } from "../../services";
import { ERROR_MESSAGES } from "../../config/constants";

export class OctokitController {
  /**
   * Retrieves the authenticated user's details from GitHub.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  static async getAuthenticated(req: Request, res: Response) {
    try {
      const userData = await Services.octokitService.getAuthenticatedUser();
      return res
        .status(200)
        .json(
          formatResponse(
            "success",
            userData,
            "Authenticated user retrieved successfully."
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
              error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR
            )
          );
      }
      throw error; // Forward to error middleware
    }
  }

  /**
   * Retrieves issues from a specific repository based on query parameters.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  static async getRepoIssues(req: Request, res: Response) {
    const { owner, repo, perPage, page } = req.query;

    // Validate query parameters
    if (!owner || !repo) {
      return res
        .status(400)
        .json(
          formatResponse("error", null, ERROR_MESSAGES.MISSING_QUERY_PARAMETERS)
        );
    }

    try {
      const issuesData = await Services.octokitService.getIssuesOnRepo(
        String(owner),
        String(repo),
        Number(perPage) || 10,
        Number(page) || 1
      );
      return res
        .status(200)
        .json(
          formatResponse(
            "success",
            issuesData,
            "Repository issues retrieved successfully."
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
              error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR
            )
          );
      }
      throw error; // Forward to error middleware
    }
  }
}
