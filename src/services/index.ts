import { OctokitService } from "./octokit/octokit.service";
import { UserService } from "./users/users.service";

export class Services {
  static userService = UserService;
  static octokitService = OctokitService;
}
