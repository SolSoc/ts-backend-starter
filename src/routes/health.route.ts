import { Router } from "express";
import { Ok } from "../models";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(Ok({ time: Date.now() }));
});

export { router as healthRouter };
