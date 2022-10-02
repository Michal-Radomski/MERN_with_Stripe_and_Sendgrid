import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
const sgMail = require("@sendgrid/mail");

import { CustomError } from "./Interfaces";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

export const sendEmail = async (req: Request, res: Response) => {
  try {
    const { email, amount, name, receipt_url } = req.body;
    // console.log({ email, amount, name, receipt_url });

    const from = process.env.FROM as string;
    const to = email as string;

    const subject = "Thanks For Your Present";

    const output = `
    <h3>Thanks for your present</h3>
    <p>Dear ${name}</p>
    <p>You have just made a transfer from the card in the amount of ${amount} PLN as a gift for me,</p>
    <p>Confirmation is <a href=${receipt_url} target="_blank" >here</a>.</p>
    <p>Thank you very much - Michal.</p>
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
  }
};

//* V2 - Stripe payment without customer creation
export const stripePayment = async (req: Request, res: Response) => {
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

    res.status(200).json({ response: response, message: "Charge posted successfully" });
  } catch (error) {
    res.status(500).json({
      message: (error as CustomError).message,
    });
  }
};

// interface ExtendedObject extends Object {
//   id: string;
// }

//* V1 - Stripe payment with customer creation
// export const stripePayment = async (req: Request, res: Response) => {
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
