import express, { Request, Response } from "express";
import { Controllers } from "./controllers";
import { Middlewares } from "./middlewares";

const app = express();
const PORT = 3000;
app.disable('X-Powered-By');
app.use(express.json());
app.use(Middlewares.logger);
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'Indodevs ;)');
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World" }).status(202);
});

app.post("/users", (req: Request, res: Response) => {
  Controllers.userController.addUser(req.body, res);
});
app.get("/users/stats", (req: Request, res: Response) => {
  Controllers.userController.getUserGenderPercentage(req, res);
});
app.get("/users/:id", (req: Request, res: Response) => {
  Controllers.userController.getUser(req, res);
});
app.get("/users", (req: Request, res: Response) => {
  Controllers.userController.getAllUser(req, res);
});

app.listen(PORT, () => {
  console.info("SERVER STARTED AT:", PORT);
});
