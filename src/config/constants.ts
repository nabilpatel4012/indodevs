export const PAGINATION = {
  DEFAULT_SIZE: 10,
  DEFAULT_PAGE: 1,
};

export const ERROR_MESSAGES = {
  INVALID_USER_ID: "Invalid user ID provided.",
  INVALID_GENDER: "Gender can only be 'man', 'woman', or 'other'.",
  USER_NOT_FOUND: "User with the provided ID was not found.",
  FETCH_ERROR: "Error fetching data. Please try again later.",
  INTERNAL_SERVER_ERROR: "An unexpected error occurred.",
  MISSING_QUERY_PARAMETERS:
    "Missing required query parameters: 'owner' and 'repo'",
};
