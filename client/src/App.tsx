import React from "react";
import StripeCheckOut, { Token } from "react-stripe-checkout";
import axios from "axios";

import "./styles/App.scss";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { AppDispatch, RootState } from "./Interfaces";
import { payWithCard, sendEmailAction } from "./redux/actions";

function App(): JSX.Element {
  const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY as string;
  const product: string = "Present for Michal";

  const dispatch: AppDispatch = useAppDispatch();
  const [email, amount, name, mailWasSent, receipt_url] = useAppSelector((state: RootState) => [
    state?.reducer?.receipt_email,
    state?.reducer?.amount_paid,
    state?.reducer?.name,
    state?.reducer?.mailWasSent,
    state?.reducer?.receipt_url,
  ]);
  // console.log({ email, amount, name, mailWasSent, receipt_url });

  const [present, setPresent] = React.useState<number>(0);
  // console.log({ price });

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  React.useEffect(() => {
    const sendEmail = async () => {
      const bodyToSend = { email, amount, name, receipt_url };
      // console.log({ bodyToSend });
      return await axios
        .post("/api/sendemail", bodyToSend, config)
        .then((response) => {
          // console.log({ response });
          const statusCode = response?.data?.info[0]?.statusCode;
          console.log({ statusCode });
          if (statusCode === 202) {
            console.log("Mail was send");
            dispatch(sendEmailAction());
          }
        })
        .catch((error) => {
          console.log({ error });
        });
    };

    if (email !== "" && amount !== "" && name !== "" && mailWasSent === false) {
      sendEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, dispatch, email, mailWasSent, name, receipt_url]);

  const makePayment = async (token: Token) => {
    const body = {
      token,
      product,
      present,
    };

    const bodyToSend = JSON.stringify(body);
    // console.log({ token });
    // console.log({ body });

    return await axios
      .post("/api/payment", bodyToSend, config)
      .then((response) => {
        // console.log({ response });
        // const { status } = response;
        // console.log({ status });
        const dataToState = response?.data?.response;

        dispatch(payWithCard(dataToState));
      })
      .then(() => {
        setTimeout(() => {
          setPresent(0);
        }, 300);
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
