import { Router } from "express";
import { registerUser } from "../controllers/userController";

const app = Router();

app.post("/registerUser", registerUser);

export default app;
