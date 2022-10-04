import React from "react";
import { Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const Header = (): JSX.Element => {
  let location = useLocation();
  // console.log("location.pathname:", location.pathname);

  const [active] = React.useState<string>(location.pathname);

  return (
    <React.Fragment>
      <Nav className="justify-content-center">
        <Nav.Item>
          <Nav.Link href="/" disabled={active === "/" ? true : false} className="navigation">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/list" disabled={active === "/list" ? true : false} className="navigation">
            List
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="https://github.com/Michal-Radomski" target="_blank" className="navigation">
            Repo
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </React.Fragment>
  );
};

export default Header;
