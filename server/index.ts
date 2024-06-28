require("dotenv").config();

import express, { urlencoded, json } from "express";

const app = express();
const PORT = 8080;

import userRoute from "./router/userRoute";

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/api/user", userRoute);

const server = app.listen(PORT, () => console.log(`Connected to PORT ${PORT}`));
export default server;
