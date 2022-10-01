import express from "express";

const router = express.Router();

import { stripePayment } from "./controller";

router.post("/payment", stripePayment);

export default router;
