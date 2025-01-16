import React, { useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
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

  const Clear = () => {
    setSearch("");
    handleArtifact("");
    setAlertMessage("");
    setShowAlert(false);
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
    <Card style={{ zIndex: "5" }}>
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
        <Col xs={6}>
          <Button
            variant="primary"
            className="search-btn w-100"
            onClick={FetchData}
          >
            Search
          </Button>
        </Col>
        <Col xs={6}>
          <Button variant="secondary" className="w-100" onClick={Clear}>
            Clear
          </Button>
        </Col>
      </Row>
      <AlertModal
        show={showAlert}
        message={alertMessage}
        onClose={handleCloseAlert}
      />
    </Card>
  );
};

export default Search;
