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
        <Nav.Item>
          <Nav.Link href="/" disabled={location.pathname === "/" ? true : false} className="navigation">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/list" disabled={location.pathname === "/list" ? true : false} className="navigation">
            List
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <OverlayTrigger placement="bottom" overlay={<Tooltip>Opens in new window</Tooltip>}>
            <Nav.Link href="https://github.com/Michal-Radomski" target="_blank" className="navigation">
              Repo
            </Nav.Link>
          </OverlayTrigger>
        </Nav.Item>
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Opens as a Modal</Tooltip>}>
          <Nav.Item>
            <InfoModal />
          </Nav.Item>
        </OverlayTrigger>
      </Nav>
    </React.Fragment>
  );
};

export default Header;
