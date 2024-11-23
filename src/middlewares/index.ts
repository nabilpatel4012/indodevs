import { errorHandler } from "./errors/errors.middleware";
import { Logger } from "./logging/logger";

export class Middlewares {
  static logger = Logger.logger;
  static error = errorHandler;
}
