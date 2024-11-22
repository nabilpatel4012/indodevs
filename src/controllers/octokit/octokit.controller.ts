// controllers/octokit.controller.ts
import { Request, Response } from "express";
import { Services } from "../../services/index";

export class OctokitController {
  static async getAuthenticated(req: Request, res: Response) {
    try {
      const userData = await Services.octokitService.getAuthenticatedUser();
      return res.status(200).json({
        status: "success",
        data: userData,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Unable to get authenticated user",
        error: (error as Error).message,
      });
    }
  }
  static async getRepoIssues(req: Request, res: Response) {
    try {
      const issuesData = await Services.octokitService.getIssuesOnRepo();
      return res.status(200).json({
        status: "success",
        data: issuesData,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Unable to get issues user",
        error: (error as Error).message,
      });
    }
  }
}
