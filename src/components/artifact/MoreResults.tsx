import React from "react";
import { Card } from "react-bootstrap";

interface MoreResultsProps {
  artifact: string;
}

const MoreResults: React.FC<MoreResultsProps> = ({ artifact }) => {
  return (
    <Card className="more-results-card visible" style={{ zIndex: 10 }}>
      <h5 className="fw-bolder mb-2 mt-0">More Results</h5>
      <div className="results-data">
        <div>
          <strong>Artifact: </strong>
          <span>{artifact}</span>
        </div>
        <div>
          <strong>Type: </strong>
          <span>IP Address</span>
        </div>
        <div>
          <strong>Geolocation: </strong>
          <span>USA, Illinois</span>
        </div>
        <div>
          <strong>Threat Level: </strong>
          <span>High</span>
        </div>
      </div>
    </Card>
  );
};

export default MoreResults;
