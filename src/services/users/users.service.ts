import { sql } from "kysely";
import { db } from "../../db/db";
import { userRequest } from "../../types/users.types";
import { Person } from "../../db/models/person-model";

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
    const query = db
      .selectFrom("person")
      .selectAll()
      .limit(size)
      .offset(size * (page - 1));
    return await query.execute();
  }
  static async getUserGenderPercentage() {
    const totalCountResult = await db
      .selectFrom("person")
      .select(db.fn.count("id").as("total"))
      .executeTakeFirstOrThrow();
    const totalCount = Number(totalCountResult.total);
    if (totalCount === 0) {
      return [];
    }
    const genderCounts = await db
      .selectFrom("person")
      .select(["gender", db.fn.count("id").as("count")])
      .groupBy("gender")
      .orderBy("count", "desc")
      .execute();
    const genderPercentages = genderCounts.map((row) => ({
      gender: row.gender,
      percentage: (Number(row.count) / totalCount) * 100,
    }));

    return genderPercentages;
  }
}
