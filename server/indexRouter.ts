import express from "express";

const indexRouter: express.Router = express.Router();

import { getList, saveToMondoDB, sendEmail, stripePayment } from "./controller";

indexRouter.post("/payment", stripePayment);

indexRouter.post("/sendemail", sendEmail);

indexRouter.post("/save-to-db", saveToMondoDB);

// Get the MongoDB
indexRouter.get("/get-list", getList);

export default indexRouter;
