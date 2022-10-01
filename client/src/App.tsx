import React from "react";
import StripeCheckOut, { Token } from "react-stripe-checkout";
import axios from "axios";

import "./styles/App.scss";

function App(): JSX.Element {
  const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY as string;
  const product: string = "Present for Michal";

  const [price, setPrice] = React.useState<number>(0);
  // console.log({ price });

  const makePayment = async (token: Token) => {
    const body = {
      token,
      product,
      price,
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const bodyToSend = JSON.stringify(body);
    // console.log({ token });
    // console.log({ body });

    return await axios
      .post("/api/payment", bodyToSend, config)
      .then((response) => {
        // console.log({ response });
        const { status } = response;
        console.log({ status });
      })
      .then(() => {
        setTimeout(() => {
          setPrice(0);
        }, 1000);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const onClosed = () => {
    console.log(`Your present for Michal id: ${price} PLN`);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number((event.target as HTMLInputElement).value));
  };

  return (
    <div className="stripe">
      <h3>Present for Michał</h3>

      <form>
        <label>
          How much do you want to pay? :
          <input type="number" value={price} onChange={onChange} />
        </label>
      </form>

      {/* @ts-ignore */}
      <StripeCheckOut
        token={makePayment}
        stripeKey={stripeKey}
        name={`Present form Michal ${price} PLN`}
        amount={price * 100}
        shippingAddress={false}
        billingAddress={true}
        closed={onClosed}
        currency="PLN"
      >
        <button className="btn-large blue">Present for Michal {price} PLN</button>
      </StripeCheckOut>
    </div>
  );
}

export default App;
