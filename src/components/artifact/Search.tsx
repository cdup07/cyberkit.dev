import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import AlertModal from "../AlertModal";

interface SearchProps {
  handleArtifact: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ handleArtifact }) => {
  const [search, setSearch] = useState<string>("");

  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleCloseAlert = () => {
    setAlertMessage("");
    setShowAlert(false);
  };

  const FetchData = () => {
    if (search.trim() === "") {
      setAlertMessage("Please enter an artifact to search.");
      setShowAlert(true);
      return;
    }
    handleArtifact(search);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (showAlert) {
        handleCloseAlert();
      } else {
        FetchData();
      }
    }
  };

  return (
    <div style={{ zIndex: "5" }} className="search-container">
      <Row className="d-flex justify-content-center mt-3">
        <Col xs={12}>
          <Form.Control
            type="text"
            placeholder="Enter an Artifact"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            onKeyDown={handleKeyDown}
          />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mt-3 mb-3">
        <Col xs="auto">
          <Button
            variant="primary"
            className="search-btn"
            onClick={FetchData}
          >
            Search
          </Button>
        </Col>
      </Row>
      <AlertModal
        show={showAlert}
        message={alertMessage}
        onClose={handleCloseAlert}
      />
    </div>
  );
};

export default Search;
