import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";
import { CONFIG } from "../../config/env.config";

export const octokit = new Octokit({
  auth: CONFIG.ACCESS_TOKEN, //TODO: Add personal Access token here
  userAgent: "indodevs v-0.0.1",
  previews: ["jean-grey", "symmetra"],
});

export class OctokitService {
  static async getAuthenticatedUser() {
    console.log("TOKEN", CONFIG.ACCESS_TOKEN);
    try {
      const response = await octokit.rest.users.getAuthenticated();
      console.log("AUTH_HEADERS", response.headers);
      return response.data; // Return only the relevant data
    } catch (error) {
      throw new Error(
        `Error getting authenticated user: ${(error as Error).message}`
      );
    }
  }

  static async getIssuesOnRepo() {
    try {
      const response = await octokit.rest.issues.listForRepo({
        owner: "nabilpatel4012",
        repo: "indodevs",
      });
      console.log("ISSUE_HEADERS", response.headers);
      return response.data;
    } catch (error) {
      throw new Error(`Error getting pull: ${(error as Error).message}`);
    }
  }
}
