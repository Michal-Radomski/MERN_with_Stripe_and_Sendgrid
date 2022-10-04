import React from "react";

const Info = (): JSX.Element => {
  return (
    <React.Fragment>
      <div>
        <div className="info">
          <h5>Card Payment - Type to Test:</h5>
          <p>Card Number: 4242424242424242</p>
          <p>CVC: Any 3 digits</p>
          <p>Date: Any future date</p>
          <p>
            Info:{" "}
            <a
              href="https://stripe.com/docs/testing?numbers-or-method-or-token=card-numbers"
              target="_blank"
              rel="noreferrer"
            >
              Stripe Docs
            </a>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Info;
