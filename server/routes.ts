import express from "express";

const router: express.Router = express.Router();

import { getList, saveToMondoDB, sendEmail, stripePayment } from "./controller";

router.post("/payment", stripePayment);

router.post("/sendemail", sendEmail);

router.post("/save-to-db", saveToMondoDB);

// Get the MongoDB
router.get("/get-list", getList);

export default router;
