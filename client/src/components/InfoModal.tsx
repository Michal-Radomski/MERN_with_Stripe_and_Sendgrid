import React from "react";
import { Alert, Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const InfoModal = (): JSX.Element => {
  const { t } = useTranslation();
  const [show, setShow] = React.useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <Button
        variant="outline-primary"
        onClick={handleShow}
        className="navigation"
        style={{ paddingLeft: "21px", paddingRight: "21px", height: "100%" }}
      >
        Info
      </Button>

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton closeLabel="Close Modal">
          <Modal.Title>{t("providers")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {t("stripe")}
            <OverlayTrigger placement="right" overlay={<Tooltip>{t("link")}</Tooltip>}>
              <Alert.Link as="a" href="https://stripe.com" target="_blank" rel="noreferrer">
                Stripe
              </Alert.Link>
            </OverlayTrigger>
          </p>
          <p>
            {t("sendgrid")}
            <OverlayTrigger placement="right" overlay={<Tooltip>{t("link")}</Tooltip>}>
              <Alert.Link as="a" href="https://sendgrid.com" target="_blank" rel="noreferrer">
                SendGrid
              </Alert.Link>
            </OverlayTrigger>
          </p>
          <p>
            {t("mongodb")}
            <OverlayTrigger placement="right" overlay={<Tooltip>{t("link")}</Tooltip>}>
              <Alert.Link as="a" href="https://www.mongodb.com" target="_blank" rel="noreferrer">
                MongoDB Atlas Database
              </Alert.Link>
            </OverlayTrigger>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            {t("close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default InfoModal;
