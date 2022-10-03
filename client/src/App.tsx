import React from "react";
import StripeCheckOut, { Token } from "react-stripe-checkout";
import axios from "axios";

import "./styles/App.scss";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { AppDispatch, RootState } from "./Interfaces";
import { payWithCardAction, resetStateAction, saveToDBAction, sendEmailAction } from "./redux/actions";

function App(): JSX.Element {
  const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY as string;
  const product: string = "Present for Michal";

  const dispatch: AppDispatch = useAppDispatch();
  const [email, amount, name, mailWasSent, receipt_url, idempotencyKey, created] = useAppSelector((state: RootState) => [
    state?.appState?.receipt_email,
    state?.appState?.amount_paid,
    state?.appState?.name,
    state?.appState?.mailWasSent,
    state?.appState?.receipt_url,
    state?.appState?.idempotencyKey,
    state?.appState?.created,
  ]);
  // console.log({ email, amount, name, mailWasSent, receipt_url, idempotencyKey, created });

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

  React.useEffect(() => {
    const saveToDB = async () => {
      const bodyToSend = { idempotencyKey, created, amount };
      // console.log({ bodyToSend });
      return await axios
        .post("/api/save-to-db", bodyToSend, config)
        .then((response) => {
          // console.log({ response });
          if (response.data.message === "Transfer saved") {
            console.log("response.data.message:", response.data.message);
            dispatch(saveToDBAction());
          }
        })
        .then(() => {
          setTimeout(() => {
            dispatch(resetStateAction());
          }, 1000);
        })
        .catch((error) => {
          console.log({ error });
        });
    };

    if (mailWasSent === true) {
      setTimeout(() => {
        saveToDB();
        console.log("Data was saved to the MongoDB");
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, created, idempotencyKey, mailWasSent]);

  const payWithCard = async (token: Token) => {
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
        const { status } = response;
        console.log({ status });
        const dataToState = response?.data?.response;
        dispatch(payWithCardAction(dataToState));
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
        token={payWithCard}
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
