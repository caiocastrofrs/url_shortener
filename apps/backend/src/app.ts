import express from "express";
import urlRouter from "./routes/urlRoutes.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import helmet from "helmet";

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204); // handle preflight
  next();
});
app.use(helmet());

app.use("/api/url", urlRouter);

app.use(errorHandler);

export default app;
