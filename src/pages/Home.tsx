import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../layout/Footer";
import ArtifactHandler from "../components/artifact/ArtifactHandler";
import Settings from "../layout/Settings";
import Header from '../layout/Header';

const Home: React.FC = () => {
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const handleShowSettings = () => {
    setShowSettings(!showSettings);
  }

  return (
    <div className="home-page">
      <Container className="flex-grow-1 text-center pt-5">
        <Header showSettings={showSettings} handleShowSettings={handleShowSettings}/>
        <Row className="my-5">
          <Col>
            <h1 className="header">CyberKit.dev</h1>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center my-4">
          <Col>
            <ArtifactHandler />
          </Col>
        </Row>
        <Footer />
        <Settings showSettings={showSettings} handleShowSettings={handleShowSettings} />
      </Container>
    </div>
  );
};

export default Home;
