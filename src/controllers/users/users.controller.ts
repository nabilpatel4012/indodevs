import { Request, Response } from "express";
import { userRequest } from "../../types/users.types";
import { Services } from "../../services";

export class UserController {
  static async addUser(req: userRequest, res: Response) {
    try {
      const response = await Services.userService.addUser(req);
      res.status(201).json({ status: "success", response: response });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Gender can only be 'man', 'woman' or 'other'",
      });
    }
  }
  static async getUser(req: Request, res: Response) {
    try {
      const response = await Services.userService.getUser(
        Number(req.params.id)
      );
      return res.status(200).json({ status: "success", response: response });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Cannot get user with Id",
      });
    }
  }
  static async getAllUser(req: Request, res: Response) {
    if (req.query) {
    }
    const size = Number(req.query.size);
    const page = Number(req.query.page);
    try {
      const response = await Services.userService.getAllUsers(
        size || 10,
        page || 1
      );
      return res.status(200).json({ status: "success", response: response });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Cannot get users",
        error: error,
      });
    }
  }
  static async getUserGenderPercentage(req: Request, res: Response) {
    try {
      const response = await Services.userService.getUserGenderPercentage();
      return res.status(200).json({ status: "success", response: response });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        status: "error",
        message: "Cannot get users",
        error: error,
      });
    }
  }
}
