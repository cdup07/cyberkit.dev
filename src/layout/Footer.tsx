import { Container, Row, Col, Button } from "react-bootstrap";
import { useMemo } from "react";

interface FooterProps {
  onShowChangelog: () => void;
}

const Footer: React.FC<FooterProps> = ({ onShowChangelog }) => {
  const nameOrder = useMemo(() => {
    return Math.random() < 0.5
      ? "by Luke Albertson and Carson Williams"
      : "by Carson Williams and Luke Albertson";
  }, []);

  return (
    <footer className="text-center py-3">
      <Container>
        {/* First row for the "View Changelog" button */}
        <Row className="mb-2">
          <Col>
            <Button
              variant="link"
              className="text-decoration-none"
              onClick={onShowChangelog}
              style={{ color: "#00ff99", cursor: "pointer" }}
            >
              View Changelog
            </Button>
          </Col>
        </Row>

        {/* Second row for the credits */}
        <Row>
          <Col>{nameOrder}</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
