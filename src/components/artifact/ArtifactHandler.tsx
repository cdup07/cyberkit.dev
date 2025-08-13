import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Search from "./Search";
import Results from "./Results";
import MoreResults from "./MoreResults";
import {
  determineArtifactType,
  fetchArtifactData,
} from "../../utilities/artifiactUtils";

const ArtifactHandler: React.FC = () => {
  const [artifact, setArtifact] = useState<string>("");
  const [artifactData, setArtifactData] = useState<string>("");
  const [showMore, setShowMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  const searchArtifact = async (artifact: string, type: string) => {
    console.debug(`Searching for ${type}: ${artifact}`);
    setLoading(true);
    try {
      const data = await fetchArtifactData(artifact, type);
      setArtifactData(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Backend error: ${error.message}`);
        setArtifactData(`Error: ${error.message}`);
      } else {
        console.error("An unknown error occurred:", error);
        setArtifactData("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleArtifact = (artifact: string) => {
    setArtifact(artifact);
    setArtifactData(""); // Clear previous data
    setShowMore(false);
    if (artifact.trim() === "") {
      setArtifactData("Invalid artifact"); // Show "Invalid artifact" for empty input
    } else {
      try {
        determineArtifactType(artifact, searchArtifact);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Artifact type determination failed: ${error.message}`);
          setArtifactData("Invalid artifact");
        } else {
          console.error("Artifact type determination failed: Unknown error");
          setArtifactData("Invalid artifact");
        }
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
      <Row className="d-flex justify-content-center">
        <Col xs={6}>
          <Row>
            <Search handleArtifact={handleArtifact} />
          </Row>
          <Row>
            <Results artifactData={artifactData} loading={loading} />
          </Row>
          {/* Temporarily hidden - Show More button
          {artifactData && !loading && (
            <Row className="d-flex justify-content-center mt-3">
              <Button
                variant="secondary"
                onClick={handleShowMore}
                style={{ width: "50%" }}
              >
                {showMore ? "Show Less" : "Show More"}
              </Button>
            </Row>
          )}
          */}
          {/* Temporarily hidden - More Results component
          {artifact && showMore && (
            <Row className="mt-3">
              <MoreResults artifact={artifact} />
            </Row>
          )}
          */}
        </Col>
      </Row>
    </div>
  );
};

export default ArtifactHandler;
