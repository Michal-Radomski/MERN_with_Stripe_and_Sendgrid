import React from "react";
import { Dropdown, Nav, OverlayTrigger, Tooltip, DropdownButton } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import InfoModal from "./InfoModal";

const Header = (): JSX.Element => {
  let location = useLocation();
  // console.log("location.pathname:", location.pathname);
  const { i18n, t } = useTranslation();

  const [active, setActive] = React.useState<string>("en");

  React.useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length! > 2) {
      i18next.changeLanguage("en");
    }
  }, []);

  const handleLanguageChange = (event: string | null): void => {
    // console.log({ event });
    // console.log("localStorage.getItem('i18nextLng'):", localStorage.getItem("i18nextLng"));
    i18n.changeLanguage(event as string);
    setActive(event as string);
  };

  const SelectLanguage: React.FC = () => {
    return (
      <DropdownButton
        title={active === "en" ? "Zmień na PL" : "Change to En"}
        onSelect={handleLanguageChange}
        variant="outline-success"
        menuVariant="dark"
        className="dropdownBtn"
      >
        <Dropdown.Item eventKey="en" active={active === "en" ? true : false}>
          English
        </Dropdown.Item>
        <Dropdown.Item eventKey="pl" active={active === "pl" ? true : false}>
          Polski
        </Dropdown.Item>
      </DropdownButton>
    );
  };

  return (
    <React.Fragment>
      <Nav className="justify-content-center">
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip>
              {active === "en" && location.pathname === "/"
                ? "You Are Here"
                : active === "en" && location.pathname !== "/"
                ? "Home"
                : active === "pl" && location.pathname === "/"
                ? "Jesteś tutaj"
                : "Start"}
            </Tooltip>
          }
        >
          <Nav.Item>
            <Nav.Link href="/" disabled={location.pathname === "/" ? true : false} className="navigation">
              {t("nav-home")}
            </Nav.Link>
          </Nav.Item>
        </OverlayTrigger>

        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip>
              {active === "en" && location.pathname === "/list"
                ? "You Are Here"
                : active === "en" && location.pathname !== "/list"
                ? "List"
                : active === "pl" && location.pathname === "/list"
                ? "Jesteś tutaj"
                : "Lista"}
            </Tooltip>
          }
        >
          <Nav.Item>
            <Nav.Link href="/list" disabled={location.pathname === "/list" ? true : false} className="navigation">
              {t("nav-list")}
            </Nav.Link>
          </Nav.Item>
        </OverlayTrigger>

        <Nav.Item>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>{active === "en" ? "Link opens in a new window" : "Link otwiera się w nowym okie"}</Tooltip>}
          >
            <Nav.Link
              href="https://github.com/Michal-Radomski/MERN_with_Stripe_and_Sendgrid"
              target="_blank"
              className="navigation"
            >
              Repo
            </Nav.Link>
          </OverlayTrigger>
        </Nav.Item>

        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>{active === "en" ? "Link opens as a modal" : "Link otwiera się jako modal"}</Tooltip>}
        >
          <Nav.Item>
            <InfoModal />
          </Nav.Item>
        </OverlayTrigger>

        <OverlayTrigger
          placement="right"
          overlay={<Tooltip>{active === "en" ? "Selected: English" : "Wybrano: Polski"}</Tooltip>}
        >
          <Nav.Item>
            <SelectLanguage />
          </Nav.Item>
        </OverlayTrigger>
      </Nav>
    </React.Fragment>
  );
};

export default Header;
