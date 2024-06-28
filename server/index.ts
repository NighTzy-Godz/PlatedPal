import express, { urlencoded, json } from "express";

const app = express();
const PORT = 8080;

app.use(urlencoded({ extended: true }));
app.use(json());

app.listen(PORT, () => console.log(`Connected to PORT ${PORT}`));
