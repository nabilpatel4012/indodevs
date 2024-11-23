import express from "express";
import compression from "compression";
import zlib from "node:zlib";
import apiRoutes from "./routes/v1"; // Import the index file from the routes folder
import { Middlewares } from "./middlewares";
import { db } from "./db/db"; // Example: Database initialization function
import API_ROUTES from "./routes";

const app = express();
const PORT = 3000;

// Global middleware
app.disable("X-Powered-By");
app.use((req, res, next) => {
  res.setHeader("X-Powered-By", "Indodevs ;)");
  next();
});
app.use(
  compression({
    level: 9,
    threshold: 0,
    filter: (req, res) => {
      console.log(`Compressing: ${req.url}`);
      return compression.filter(req, res);
    },
  })
);
app.use(express.json());
app.use(Middlewares.logger);

// Mount API routes
app.use("/api", API_ROUTES); // Prefix all routes with /api

// Catch-all route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handling middleware
app.use(Middlewares.error);

// Server initialization
const startServer = async () => {
  try {
    console.log("Connecting to db...");
    db.connection();
    console.log("DB connected successfully...");
    app.listen(PORT, () => {
      console.info(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server", error);
    process.exit(1);
  }
};

startServer();
