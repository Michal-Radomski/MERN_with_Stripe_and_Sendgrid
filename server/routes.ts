import express from "express";

const router = express.Router();

import { saveToMondoDB, sendEmail, stripePayment } from "./controller";

router.post("/payment", stripePayment);

router.post("/sendemail", sendEmail);

router.post("/save-to-db", saveToMondoDB);

export default router;
