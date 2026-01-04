import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { PORT } from "./constants";
import { Err } from "./models";
import healthRoute from "./routes/health.route";
import helloRoute from "./routes/hello.route";
import { ResponseError } from "./util/error";

const app = express();

app.disable("x-powered-by");

app.use(express.json());

app.use("/api/health", healthRoute);
app.use("/api/hello", helloRoute);

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  let statusCode = 500,
    message = "Internal Server Error";

  if (error instanceof ResponseError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }
  return res.status(statusCode).json(Err(statusCode, message));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
