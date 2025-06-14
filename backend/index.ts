import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db";
import { loadCitiesFromFileWithCheck } from "./utils/citiesLoader";
import routes from "./routes/cityRoutes";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json()); // for POST/PUT
app.use("/api/cities", routes); // <-- add rotes here

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

connectDB().then(async () => {
  await loadCitiesFromFileWithCheck("../database/cities.json");
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});
