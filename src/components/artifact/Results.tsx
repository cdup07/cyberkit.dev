import { useEffect, useState } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
interface ResultsProps {
  artifactData: string;
  showMore: boolean;
  handleShowMore: (value: boolean) => void;
  loading: boolean;
}

const Results: React.FC<ResultsProps> = ({
  artifactData,
  showMore,
  handleShowMore,
  loading,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (loading || artifactData) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [loading, artifactData]);

  const handleToggle = () => {
    handleShowMore(!showMore);
  };

  return (
    <Card
      className={`results-card ${isVisible ? "visible" : ""} mt-2`}
      style={{ zIndex: "1", position: "relative", height: "100%" }}
    >
      <h5 className="fw-bolder mb-2 mt-0">Results</h5>
      <div className="results-data">
        {loading ? (
          <div className="spinner-container">
            <Spinner animation="border" role="status" className="spinner">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div>
            <strong>Artifact Data: </strong>
            <span>{artifactData}</span>
          </div>
        )}
      </div>

      <Button
        className="mt-4"
        variant="secondary"
        onClick={handleToggle}
      >
        {showMore ? "Show Less" : "Show More"}
      </Button>
    </Card>
  );
};

export default Results;