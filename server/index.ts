require("dotenv").config();

import express, { urlencoded, json } from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const PORT = 8080;

import userRoute from "./router/userRoute";
import recipeRoute from "./router/recipeRoute";

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/recipe", recipeRoute);

const server = app.listen(PORT, () => console.log(`Connected to PORT ${PORT}`));
export default server;
