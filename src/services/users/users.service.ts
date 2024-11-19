import { db } from "../../db/db";
import { userRequest } from "../../types/users.types";

export class UserService {
  static async addUser(user: userRequest) {
    if (
      user.gender !== "man" &&
      user.gender !== "woman" &&
      user.gender !== "other"
    ) {
      throw new Error("gender-bad");
    }
    const result = await db
      .insertInto("person")
      .values({
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
      })
      .executeTakeFirstOrThrow();

    const insertedId = result.insertId!;

    const response = this.getUser(Number(insertedId));
    return response;
  }
  static async getUser(id: number) {
    const query = db
      .selectFrom("person")
      .select(["id", "first_name", "last_name", "created_at"])
      .where("id", "=", id);
    return await query.executeTakeFirstOrThrow();
  }
  static async getAllUsers(size: number, page: number) {
    const query = db.selectFrom("person").selectAll().limit(size).offset(size*(page-1));
    return await query.execute();
  }
}
