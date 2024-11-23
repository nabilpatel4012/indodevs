import { CONFIG } from "../../config/env.config";

let Octokit: typeof import("@octokit/rest").Octokit;

// Dynamically import @octokit/rest
(async () => {
  const module = await import("@octokit/rest");
  Octokit = module.Octokit;
})();

export class OctokitService {
  private static octokitInstance: import("@octokit/rest").Octokit | null = null;

  private static async getOctokit(): Promise<import("@octokit/rest").Octokit> {
    if (!this.octokitInstance) {
      if (!Octokit) {
        const module = await import("@octokit/rest");
        Octokit = module.Octokit;
      }
      this.octokitInstance = new Octokit({
        auth: CONFIG.ACCESS_TOKEN,
        userAgent: "indodevs v-0.0.1",
        previews: ["jean-grey", "symmetra"],
      });
    }
    return this.octokitInstance;
  }

  static async getAuthenticatedUser(): Promise<any> {
    const octokit = await this.getOctokit();
    try {
      console.log("Fetching authenticated user...");
      const response = await octokit.rest.users.getAuthenticated();
      console.log("Authenticated user headers:", response.headers);
      return response.data;
    } catch (error) {
      const message = this.extractErrorMessage(error);
      console.error("Error fetching authenticated user:", message);
      throw new Error(`Failed to fetch authenticated user: ${message}`);
    }
  }

  static async getIssuesOnRepo(
    owner: string,
    repo: string,
    perPage: number = 10,
    page: number = 1
  ): Promise<any> {
    const octokit = await this.getOctokit();
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
      const message = this.extractErrorMessage(error);
      console.error("Error fetching issues:", message);
      throw new Error(`Failed to fetch issues: ${message}`);
    }
  }

  private static extractErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
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
