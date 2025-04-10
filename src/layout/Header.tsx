import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import SettingsIcon from "../assets/settings.svg";

interface HeaderProps {
  showSettings: boolean;
  handleShowSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showSettings,
  handleShowSettings,
}) => {
  const location = useLocation();
  const isSandbox = location.pathname === "/sandbox";

  return (
    <Navbar
      expand="lg"
      style={{
        background: "transparent",
        borderBottom: "none",
        boxShadow: "none",
        zIndex: 10,
      }}
    >
      <Container
        fluid
        className="d-flex justify-content-between align-items-center px-4"
      >
        <Nav>
          <Nav.Link
            as={Link}
            to={isSandbox ? "/" : "/sandbox"}
            style={{
              color: "#00ff99",
              fontWeight: 600,
              fontSize: "1rem",
              textShadow: "0 0 5px #00ff99",
            }}
          >
            {isSandbox ? "Home" : "Sandbox"}
          </Nav.Link>
        </Nav>

        <div className="ms-auto">
          <img
            className="settings-btn"
            src={SettingsIcon}
            width={50}
            onClick={() => handleShowSettings()}
            style={{ cursor: "pointer" }}
            alt="Settings"
          />
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
