import express from "express";
import apiV1Routes from "./v1";

const API_ROUTES = express.Router();

API_ROUTES.use("/v1", apiV1Routes);

export default API_ROUTES;
