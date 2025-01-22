import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ArtifactHandler from "../components/artifact/ArtifactHandler";
import Settings from "../layout/Settings";
import Header from "../layout/Header";

interface HomeProps {
  showSettings: boolean;
  handleShowSettings: () => void;
  isSimpleBackground: boolean;
  onToggleBackground: () => void;
}

const Home: React.FC<HomeProps> = ({
  showSettings,
  handleShowSettings,
  isSimpleBackground,
  onToggleBackground,
}) => {
  return (
    <div className="home-page">
      <Container className="flex-grow-1 text-center pt-5">
        <Header
          showSettings={showSettings}
          handleShowSettings={handleShowSettings}
        />
        <Row className="my-5">
          <Col>
            <h1
              className={`header ${
                isSimpleBackground ? "simple-header" : ""
              }`}
            >
              CyberKit.dev
            </h1>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center my-4">
          <Col>
            <ArtifactHandler />
          </Col>
        </Row>
        <Settings
          showSettings={showSettings}
          handleShowSettings={handleShowSettings}
          isSimpleBackground={isSimpleBackground}
          onToggleBackground={onToggleBackground}
        />
      </Container>
    </div>
  );
};

export default Home;
