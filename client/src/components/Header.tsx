import React from "react";
import { Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import InfoModal from "./InfoModal";

const Header = (): JSX.Element => {
  let location = useLocation();
  // console.log("location.pathname:", location.pathname);

  return (
    <React.Fragment>
      <Nav className="justify-content-center">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>{location.pathname === "/" ? "You Are Here" : "Home"}</Tooltip>}
        >
          <Nav.Item>
            <Nav.Link href="/" disabled={location.pathname === "/" ? true : false} className="navigation">
              Home
            </Nav.Link>
          </Nav.Item>
        </OverlayTrigger>

        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>{location.pathname === "/list" ? "You Are Here" : "List"}</Tooltip>}
        >
          <Nav.Item>
            <Nav.Link href="/list" disabled={location.pathname === "/list" ? true : false} className="navigation">
              List
            </Nav.Link>
          </Nav.Item>
        </OverlayTrigger>

        <Nav.Item>
          <OverlayTrigger placement="bottom" overlay={<Tooltip>Link opens in a new window</Tooltip>}>
            <Nav.Link
              href="https://github.com/Michal-Radomski/MERN_with_Stripe_and_Sendgrid"
              target="_blank"
              className="navigation"
            >
              Repo
            </Nav.Link>
          </OverlayTrigger>
        </Nav.Item>

        <OverlayTrigger placement="bottom" overlay={<Tooltip>Link opens as a modal</Tooltip>}>
          <Nav.Item>
            <InfoModal />
          </Nav.Item>
        </OverlayTrigger>
      </Nav>
    </React.Fragment>
  );
};

export default Header;
