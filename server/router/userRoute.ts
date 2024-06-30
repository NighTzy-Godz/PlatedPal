import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController";

const app = Router();

app.post("/registerUser", registerUser);
app.post("/loginUser", loginUser);
export default app;
