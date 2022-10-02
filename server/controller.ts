import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { CustomError } from "./Interfaces";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

// //* V2 - Stripe payment without customer creation
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

// // //* V1 - Stripe payment with customer creation
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
