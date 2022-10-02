import express from "express";

const router = express.Router();

import { sendEmail, stripePayment } from "./controller";

router.post("/payment", stripePayment);

router.post("/sendemail", sendEmail);

export default router;
