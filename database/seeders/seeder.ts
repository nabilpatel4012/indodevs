import axios from "axios";
import { faker } from "@faker-js/faker";

const [, , count] = process.argv;

const seeder = (count: number = 10) => {
  for (let i = 0; i < count; i++) {
    axios.post("http://localhost:3000/api/v1/users", {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      gender: faker.helpers.arrayElement(["man", "woman", "other"]),
    });
    setTimeout(() => {
      console.log(".");
    }, 20);
  }
};
seeder(Number(count));
