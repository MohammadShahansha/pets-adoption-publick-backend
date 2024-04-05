import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import globalErrorHandler from "./middleware/glovalErrorHandler";
const app: Application = express();

app.use(cors());
app.use(cookieParser());

//purser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "pet adoption project is running.....",
  });
});

app.use("/api", router);
app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API not found",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found",
    },
  });
});
export default app;
