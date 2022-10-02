import React from "react";
import StripeCheckOut, { Token } from "react-stripe-checkout";
import axios from "axios";

import "./styles/App.scss";
import { useAppDispatch } from "./redux/hooks";
import { AppDispatch } from "./Interfaces";
import { payWithCard } from "./redux/actions";

function App(): JSX.Element {
  const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY as string;
  const product: string = "Present for Michal";

  const dispatch: AppDispatch = useAppDispatch();

  const [present, setPresent] = React.useState<number>(0);
  // console.log({ price });

  const makePayment = async (token: Token) => {
    const body = {
      token,
      product,
      present,
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
        console.log({ response });
        // const { status } = response;
        // console.log({ status });
        const dataToState = response.data.response;

        dispatch(payWithCard(dataToState));
      })
      .then(() => {
        setTimeout(() => {
          setPresent(0);
        }, 1000);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const onClosed = () => {
    console.log(`Your present for Michal is: ${present} PLN`);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPresent(Number((event.target as HTMLInputElement).value));
  };

  return (
    <div className="stripe">
      <h3>Present for Michał</h3>

      <form>
        <label>
          How much do you want to pay? :
          <input type="number" value={present} onChange={onChange} />
        </label>
      </form>

      {/* @ts-ignore */}
      <StripeCheckOut
        panelLabel="Present in: "
        description="Your are giving a present for Michal..."
        allowRememberMe={false}
        token={makePayment}
        stripeKey={stripeKey}
        name={`Present for Michal ${present} PLN`}
        amount={present * 100}
        shippingAddress={false}
        billingAddress={true}
        closed={onClosed}
        currency="PLN"
      >
        <button className="btn-large blue">Present for Michal {present} PLN</button>
      </StripeCheckOut>
    </div>
  );
}

export default App;
