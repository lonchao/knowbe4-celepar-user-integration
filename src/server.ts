require("dotenv").config();
import express, { Request, NextFunction, Response, json } from "express";
import "express-async-errors";
import { routes } from "./routes";
const app = express();

app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message,
      });
    }

    return response
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on ${process.env.PORT || 8080}`);
});
