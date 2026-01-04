import { NextFunction, Request, Response, Router } from "express";
import { Ok, parseRequestData } from "../models";
import { helloQuerySchema } from "../models/hello.schema";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = parseRequestData(helloQuerySchema, req.query);
    res.status(200).json(Ok({ text: `hello ${name}` }));
  } catch (error) {
    next(error);
  }
});

export { router as helloRouter };
