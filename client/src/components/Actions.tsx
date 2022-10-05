import React from "react";
import StripeCheckOut, { Token } from "react-stripe-checkout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import "../styles/styles.scss";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { AppDispatch, RootState } from "../Interfaces";
import {
  payWithCardAction,
  resetStateAction,
  saveToDBAction,
  sendEmailAction,
  writeGreetingsAction,
} from "../redux/actions";
import Info from "./Info";

const Actions = (): JSX.Element => {
  const navigate = useNavigate();
  const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY as string;
  const product: string = "Present for Michal";

  const dispatch: AppDispatch = useAppDispatch();
  const [email, amount, name, mailWasSent, receipt_url, idempotencyKey, created, greetingsFromRedux] = useAppSelector(
    (state: RootState) => [
      state?.appState?.receipt_email,
      state?.appState?.amount_paid,
      state?.appState?.name,
      state?.appState?.mailWasSent,
      state?.appState?.receipt_url,
      state?.appState?.idempotencyKey,
      state?.appState?.created,
      state?.appState?.greetings,
    ]
  );
  // console.log({ email, amount, name, mailWasSent, receipt_url, idempotencyKey, created, greetingsFromRedux });

  const [present, setPresent] = React.useState<number>(0);
  const [greetings, setGreetings] = React.useState<string>("");
  // console.log({ present, greetings });

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  //* Send Email
  React.useEffect(() => {
    const sendEmail = async () => {
      const bodyToSend = { email, amount, name, receipt_url };
      // console.log({ bodyToSend });
      return await axios
        .post("/api/sendemail", bodyToSend, config)
        .then((response) => {
          // console.log({ response });
          const statusCode = response?.data?.info[0]?.statusCode;
          // console.log({ statusCode });
          if (statusCode === 202) {
            // console.log("Mail was send to:", email);
            toast.success("Mail was send to:", email);
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

  //* Save to the Mongo DB
  React.useEffect(() => {
    const saveToDB = async () => {
      const bodyToSend = { idempotencyKey, created, amount, greetingsFromRedux };
      // console.log({ bodyToSend });
      return await axios
        .post("/api/save-to-db", bodyToSend, config)
        .then((response) => {
          // console.log({ response });
          if (response.data.message === "Transfer saved") {
            // console.log("response.data.message:", response.data.message);
            dispatch(saveToDBAction());
          }
        })
        .then(() => {
          setTimeout(() => {
            dispatch(resetStateAction());
            toast.info("You are redirect to the list");
            navigate("/list");
          }, 1000);
        })
        .catch((error) => {
          console.log({ error });
        });
    };

    if (mailWasSent === true) {
      setTimeout(() => {
        saveToDB();
        toast.success("Data was saved to the MongoDB");
        // console.log("Data was saved to the MongoDB");
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, created, idempotencyKey, mailWasSent]);

  //* Pay with Card
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
        // const { status } = response;
        // console.log({ status });
        toast.success("Money has been sent");
        const dataToState = response?.data?.response;
        dispatch(payWithCardAction(dataToState));
      })
      .then(() => {
        setTimeout(() => {
          setPresent(0);
          setGreetings("");
        }, 300);
      })
      .catch((error) => {
        console.log({ error });
        // console.log( error?.response?.data?.message );
        // alert(error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
        setPresent(0);
      });
  };

  const onClosed = () => {
    // console.log(`Your present for Michal is: ${present} PLN`);
    if (present >= 2) {
      toast.info(`Your present for Michal is: ${present} PLN`);
    }
  };

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // console.log({ present, greetings });
    dispatch(writeGreetingsAction(greetings));
  };

  return (
    <React.Fragment>
      <Info />
      <div className="stripe">
        <h3>Present and Greetings for Michał</h3>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label> How much do you want to pay? :</Form.Label>
            <Form.Control
              type="number"
              min="2"
              value={present}
              onChange={(event) => setPresent(Number((event.target as HTMLInputElement).valueAsNumber))}
              placeholder="Min 2 PLN"
            />
            <Form.Text className="text-muted">You'll see it on the list...</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label> Write greetings for Michał :</Form.Label>
            <Form.Control
              type="text"
              value={greetings}
              onChange={(event) => setGreetings((event.target as HTMLInputElement).value)}
              placeholder="Greetings.."
            />
            <Form.Text className="text-muted">You'll see it on the list...</Form.Text>
          </Form.Group>
          <br />
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
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Click here to submit</Tooltip>}>
              <Button variant="outline-primary" style={{ width: "100%" }} type="submit">
                Present for Michal <span className="button-submit">{present}</span> PLN
              </Button>
            </OverlayTrigger>
          </StripeCheckOut>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default Actions;
