export interface userRequest {
  first_name: string;
  last_name: string;
  gender: "man" | "woman" | "other";
}

export interface userResponse {
  firstName: string;
  lastName: string;
  gender: string;
  createdAt: Date;
}
