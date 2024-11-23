import { Octokit } from "@octokit/rest";
import { CONFIG } from "../../config/env.config";

export const octokit = new Octokit({
  auth: CONFIG.ACCESS_TOKEN, // Use the access token from the config
  userAgent: "indodevs v-0.0.1",
  previews: ["jean-grey", "symmetra"],
});

export class OctokitService {
  /**
   * Fetch the authenticated user's details.
   * @returns {Promise<any>} Authenticated user details.
   */
  static async getAuthenticatedUser(): Promise<any> {
    try {
      console.log("Fetching authenticated user...");
      const response = await octokit.rest.users.getAuthenticated();
      console.log("Authenticated user headers:", response.headers);
      return response.data;
    } catch (error) {
      const message = OctokitService.extractErrorMessage(error);
      console.error("Error fetching authenticated user:", message);
      throw new Error(`Failed to fetch authenticated user: ${message}`);
    }
  }

  /**
   * Fetch issues from a specified repository.
   * @param {string} owner - Owner of the repository.
   * @param {string} repo - Repository name.
   * @param {number} [perPage=10] - Number of issues per page.
   * @param {number} [page=1] - Page number for pagination.
   * @returns {Promise<any>} List of issues for the repository.
   */
  static async getIssuesOnRepo(
    owner: string,
    repo: string,
    perPage: number = 10,
    page: number = 1
  ): Promise<any> {
    try {
      console.log(`Fetching issues for repo: ${owner}/${repo}`);
      const response = await octokit.rest.issues.listForRepo({
        owner,
        repo,
        per_page: perPage,
        page,
      });
      console.log("Issue headers:", response.headers);
      return response.data;
    } catch (error) {
      const message = OctokitService.extractErrorMessage(error);
      console.error("Error fetching issues:", message);
      throw new Error(`Failed to fetch issues: ${message}`);
    }
  }

  /**
   * Extract error message from Octokit error response.
   * @param {unknown} error - The error object thrown by Octokit.
   * @returns {string} The error message.
   */
  private static extractErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    // Handle Octokit-specific error format
    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as any).message === "string"
    ) {
      return (error as any).message;
    }

    return "An unknown error occurred";
  }
}
