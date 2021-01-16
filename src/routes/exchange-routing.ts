import { Router } from "express";
import { query } from "express-validator";
import validate from "./utils/validate";
import exchangeRouting from "../exchange-routing";

const router = Router();

router.get(
  "/",
  [query("amount").isNumeric().toFloat(), validate],
  exchangeRouting.get
);

export default router;
