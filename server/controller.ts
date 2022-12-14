import { Request, RequestHandler, Response } from "express";
import { v4 as uuidv4 } from "uuid";
const sgMail = require("@sendgrid/mail");

import { CustomError } from "./Interfaces";

// import Model, {IModel} from "./Model"; //* V1-> Mongoose Model
import { IModel, Model } from "./Model"; //* v2 -> Typegoose Model

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

export const getList: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  console.log("req.ip:", req.ip);
  try {
    const list: IModel[] = await Model.find().sort({ createdAt: -1 });
    res.status(200).json(list);
  } catch (error) {
    console.log({ error });
    res.status(404).json(error);
  }
};

export const saveToMondoDB: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { idempotencyKey, created, amount, greetingsFromRedux } = req.body;
  // console.log({ idempotencyKey, created, amount });

  try {
    const transfer: IModel = new Model({
      idempotencyKey: idempotencyKey,
      amount: amount,
      createdAt: created * 1000,
      greetings: greetingsFromRedux,
    });

    await transfer.save();
    await console.log("Transfer saved");
    res.json({ message: "Transfer saved", transfer });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

export const sendEmail: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, amount, name, receipt_url, language } = req.body;
    // console.log({ email, amount, name, receipt_url, language });

    const from = process.env.FROM as string;
    const to = email as string;

    const subject = language === "en" ? "Thanks For Your Present" : "Dziękuję za Twój Prezent";

    const output =
      language === "en"
        ? `
    <h3>Thanks for your present</h3>
    <p>Dear ${name}</p>
    <p>You have just made a transfer from the card in the amount of ${amount} PLN as a gift for me,</p>
    <p>Confirmation is <a href=${receipt_url} target="_blank" >here</a>.</p>
    <p>Thank you very much - Michal.</p>
  `
        : `
  <h3>Dziękuję za Twój prezent</h3>
  <p>Drogi ${name}</p>
  <p>Właśnie zrobiłeś przelew z karty w wysokości ${amount} PLN jako prezent dla mnie,</p>
  <p>Potwierdzenie jest <a href=${receipt_url} target="_blank" >tutaj</a>.</p>
  <p>Dziękuję bardzo - Michal.</p>
`;

    const msg = {
      to,
      from,
      subject,
      html: output,
    };

    await sgMail.send(msg, function (error: Error, info: string) {
      if (error) {
        console.log("Email Not Sent Error Occurred" + { error });
      }
      console.log("Email was Sent", { info });
      res.status(202).json({ message: "Email was sent", info });
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

//* V2 - Stripe payment without customer creation
export const stripePayment: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  console.log("req.ip:", req.ip);
  const { product, token, present } = req.body;
  // console.log({ product, token, present });
  // console.log("present:", present, typeof present);
  const idempotencyKey = uuidv4();
  // console.log({ idempotencyKey });

  try {
    const charge = await stripe.charges.create(
      {
        amount: present * 100,
        currency: "pln",
        source: token.id,
        receipt_email: token.email,
        description: `Purchase of: ${product}`,
        shipping: {
          name: token.card.name,
          address: {
            country: token.card.address_country,
          },
        },
      },
      { idempotencyKey }
    );
    if (!charge) {
      console.log("Charge unsuccessful");
      throw new Error("Charge unsuccessful");
    }
    // console.log("charge:", charge);

    const response = {
      idempotencyKey: idempotencyKey,
      id: charge?.id,
      amount_paid: charge?.amount_captured / 100,
      currency: charge?.currency,
      created: charge?.created,
      paid: charge?.paid,
      receipt_email: charge?.receipt_email,
      receipt_url: charge?.receipt_url,
      name: charge?.source?.name,
    };

    await console.log("Charge posted successfully");
    res.status(200).json({ response: response, message: "Charge posted successfully" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({
      message: (error as CustomError).message,
    });
  }
};

// interface ExtendedObject extends Object {
//   id: string;
// }

// * V1 - Stripe payment with customer creation
// export const stripePayment: RequestHandler = async (req: Request, res: Response): Promise<void> => {
//   console.log("req.ip:", req.ip);
//   const { product, token, present } = req.body;
//   // console.log({ product, token, present });
//   // console.log("present:", present, typeof present);
//   const idempotencyKey = uuidv4();
//   // console.log({ idempotencyKey });

//   return await stripe.customers
//     .create(
//       {
//         email: token.email,
//         source: token.id,
//       },
//       {
//         timeout: 5000, // 5 seconds
//         maxNetworkRetries: 2,
//       }
//     )
//     .then((customer: ExtendedObject) => {
//       // console.log({ customer });
//       const charge = stripe.charges
//         .create(
//           {
//             amount: present * 100,
//             currency: "pln",
//             customer: customer.id,
//             receipt_email: token.email,
//             description: `purchase of ${product}`,
//             shipping: {
//               name: token.card.name,
//               address: {
//                 country: token.card.address_country,
//               },
//             },
//           },
//           { idempotencyKey }
//         )
//         .then((charge: Object) => {
//           console.log({ charge });
//         });
//       if (!charge) {
//         throw new Error("charge unsuccessful");
//       }
//     })
//     .then((result: Object) => {
//       // console.log({ result });
//       res.status(200).json(result);
//     })
//     .catch((error: string) => {
//       console.log({ error });
//       res.status(500).json({
//         error,
//       });
//     });
// };
