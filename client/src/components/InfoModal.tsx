import React from "react";
import { Alert, Button, Modal } from "react-bootstrap";

const InfoModal = (): JSX.Element => {
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
          <Modal.Title>External Providers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Card payments are handled by:{" "}
            <Alert.Link as="a" href="https://stripe.com" target="_blank" rel="noreferrer">
              Stripe
            </Alert.Link>
          </p>
          <p>
            Sending emails is handled by:{" "}
            <Alert.Link as="a" href="https://sendgrid.com" target="_blank" rel="noreferrer">
              SendGrid
            </Alert.Link>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default InfoModal;
