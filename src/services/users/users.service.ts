import { db } from "../../db/db";
import { userRequest } from "../../types/users.types";

export class UserService {
  /**
   * Adds a new user to the database.
   * @param {userRequest} user - The user details to be added.
   * @returns {Promise<any>} The newly created user's data.
   * @throws {Error} Throws "InvalidGenderError" if the gender is not valid.
   */
  static async addUser(user: userRequest) {
    if (!["man", "woman", "other"].includes(user.gender)) {
      throw new Error("InvalidGenderError");
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
    return this.getUser(Number(insertedId));
  }

  /**
   * Retrieves a user's data by their ID.
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<any>} The user's data.
   * @throws {Error} Throws an error if the user is not found.
   */
  static async getUser(id: number) {
    const query = db
      .selectFrom("person")
      .select(["id", "first_name", "last_name", "created_at"])
      .where("id", "=", id);

    return await query.executeTakeFirstOrThrow();
  }

  /**
   * Retrieves a paginated list of all users.
   * @param {number} size - The number of users to retrieve per page.
   * @param {number} page - The page number to retrieve.
   * @returns {Promise<any[]>} The list of users for the specified page.
   */
  static async getAllUsers(size: number, page: number) {
    const query = db
      .selectFrom("person")
      .selectAll()
      .limit(size)
      .offset(size * (page - 1));
    return await query.execute();
  }

  /**
   * Calculates the percentage of users by gender.
   * @returns {Promise<any[]>} A list of objects representing the gender and their percentage.
   */
  static async getUserGenderPercentage() {
    // Retrieve the total number of users
    const totalCountResult = await db
      .selectFrom("person")
      .select(db.fn.count("id").as("total"))
      .executeTakeFirstOrThrow();

    const totalCount = Number(totalCountResult.total);
    if (totalCount === 0) {
      return [];
    }

    // Retrieve the count of users grouped by gender
    const genderCounts = await db
      .selectFrom("person")
      .select(["gender", db.fn.count("id").as("count")])
      .groupBy("gender")
      .orderBy("count", "desc")
      .execute();

    // Calculate the percentage for each gender
    return genderCounts.map((row) => ({
      gender: row.gender,
      percentage: (Number(row.count) / totalCount) * 100,
    }));
  }
}
