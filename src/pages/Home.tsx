import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ArtifactHandler from "../components/artifact/ArtifactHandler";

interface HomeProps {
  isSimpleBackground: boolean;
}

const Home: React.FC<HomeProps> = ({ isSimpleBackground }) => {
  return (
    <div className="home-page">
      <Container className="flex-grow-1 text-center pt-5">
        <Row className="my-5">
          <Col>
            <h1 className={`header ${isSimpleBackground ? "simple-header" : ""}`}>
              CyberKit.dev
            </h1>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center my-4">
          <Col>
            <ArtifactHandler />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
