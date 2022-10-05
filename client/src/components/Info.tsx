import React from "react";
import { Alert, OverlayTrigger, Tooltip } from "react-bootstrap";

const Info = (): JSX.Element => {
  return (
    <React.Fragment>
      <div>
        <div className="info">
          <h5>Card Payment - Type to Test:</h5>
          <p>
            Card Number: <span style={{ fontWeight: "bold" }}>2424242424242424</span>
          </p>
          <p>CVC: Any 3 digits</p>
          <p>Date: Any future date</p>
          <p>
            Info:{" "}
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Link opens in a new window</Tooltip>}>
              <Alert.Link
                as="a"
                href="https://stripe.com/docs/testing?numbers-or-method-or-token=card-numbers"
                target="_blank"
                rel="noreferrer"
              >
                Stripe Docs
              </Alert.Link>
            </OverlayTrigger>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Info;
