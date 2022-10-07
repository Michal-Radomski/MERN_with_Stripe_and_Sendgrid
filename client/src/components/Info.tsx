import React from "react";
import { Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Info = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div>
        <div className="info">
          <h5>{t("header-info")}</h5>
          <p>
            {t("card-number")} <span>4242 4242 4242 4242</span>
          </p>
          <p>
            CVC: <span>{t("card-digits")}</span>
          </p>
          <p>
            {t("date")}: <span>{t("card-date")}</span>
          </p>
          <p>
            Info:{" "}
            <OverlayTrigger placement="bottom" overlay={<Tooltip>{t("link")}</Tooltip>}>
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
