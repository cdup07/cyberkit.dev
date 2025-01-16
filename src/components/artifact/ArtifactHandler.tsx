import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Search from "./Search";
import Results from "./Results";
import MoreResults from "./MoreResults";
import AlertModal from "../AlertModal";
import {
  determineArtifactType,
  fetchArtifactData,
} from "../../utilities/artifiactUtils";

const ArtifactHandler: React.FC = () => {
  const [artifact, setArtifact] = useState<string>("");
  const [artifactData, setArtifactData] = useState<string>("");
  const [showMore, setShowMore] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const searchArtifact = async (artifact: string, type: string) => {
    console.debug(`Searching for ${type}: ${artifact}`);
    setLoading(true);
    try {
      const data = await fetchArtifactData(artifact, type);
      setArtifactData(data);
    } catch (error: any) {
      setAlertMessage(`An error occurred: ${error.message}`);
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleArtifact = (artifact: string) => {
    setArtifactData("");
    setArtifact(artifact);
    setShowMore(false);
    if (artifact.trim() === "") {
      setAlertMessage("");
      setShowAlert(false);
    } else {
      try {
        determineArtifactType(artifact, searchArtifact);
      } catch (error) {
        setAlertMessage("Invalid artifact");
        setShowAlert(true);
      }
    }
  };

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  useEffect(() => {
    setShowMore(false);
  }, [artifact]);

  return (
    <div>
      <Row
        className={`d-flex justify-content-center transition-container ${
          showMore ? "show-more" : ""
        }`}
      >
        <Col xs={6} className="col-main">
          <Row>
            <Search handleArtifact={handleArtifact} />
          </Row>
          <Row>
            <Results
              artifactData={artifactData}
              showMore={showMore}
              handleShowMore={handleShowMore}
              loading={loading}
            />
          </Row>
        </Col>
        {artifact && showMore && (
          <Col xs={6} className="col-more-results">
            <MoreResults artifact={artifact} />
          </Col>
        )}
      </Row>
      <AlertModal
        show={showAlert}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
};

export default ArtifactHandler;