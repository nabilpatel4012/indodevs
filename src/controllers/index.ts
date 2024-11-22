import { OctokitController } from "./octokit/octokit.controller";
import { UserController } from "./users/users.controller";

export class Controllers {
  static userController = UserController;
  static octokitController = OctokitController;
}
