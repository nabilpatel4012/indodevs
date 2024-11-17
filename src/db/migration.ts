import { Kysely, sql } from "kysely";
import { Database } from "./models/person-model";

export async function up(db: Kysely<Database>): Promise<void> {
  console.warn("Migrating DB UP......");

  // Create "person" table with proper column definitions
  await db.schema
    .createTable("person")
    .addColumn("id", "bigint", (col) => col.primaryKey().autoIncrement()) // Use bigint for id and auto-increment
    .addColumn("first_name", "varchar(255)", (col) => col.notNull()) // Specify length for varchar
    .addColumn("last_name", "varchar(255)") // Specify length for varchar
    .addColumn("gender", "varchar(50)", (col) => col.notNull()) // Specify length for varchar
    .addColumn(
      "created_at",
      "timestamp",
      (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull() // Use CURRENT_TIMESTAMP for default value
    )
    .execute();

  // Create "pet" table with a foreign key reference to "person.id"
  await db.schema
    .createTable("pet")
    .addColumn("id", "bigint", (col) => col.primaryKey().autoIncrement()) // Use bigint for id and auto-increment
    .addColumn("name", "varchar(255)", (col) => col.notNull().unique()) // Specify length for varchar and make name unique
    .addColumn(
      "owner_id",
      "bigint",
      (col) => col.references("person.id").onDelete("cascade").notNull() // Foreign key to person.id
    )
    .addColumn("species", "varchar(100)", (col) => col.notNull()) // Specify length for varchar
    .execute();

  // Create an index on "owner_id" in the "pet" table
  await db.schema
    .createIndex("pet_owner_id_index")
    .on("pet")
    .column("owner_id")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  // Drop the "pet" table first (since it has a foreign key constraint)
  await db.schema.dropTable("pet").execute();
  // Then drop the "person" table
  await db.schema.dropTable("person").execute();
}
