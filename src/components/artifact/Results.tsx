import { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";

interface ResultsProps {
  artifactData: string;
  loading: boolean;
}

const Results: React.FC<ResultsProps> = ({ artifactData, loading }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (loading || artifactData) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [loading, artifactData]);

  const handleCopy = () => {
    if (!artifactData) return;

    navigator.clipboard.writeText(artifactData).then(
        () => {
            console.log("Copy successful!"); // Debugging log
            setCopied(true);
            setTimeout(() => {
                console.log("Hiding notification"); // Debugging log
                setCopied(false);
            }, 2000); // Show notification for 2 seconds
        },
        (err) => console.error("Failed to copy text:", err)
    );
};


  return (
    <div style={{ position: "relative" }}>
      <Card
        className={`results-card ${isVisible ? "visible" : ""} mt-2`}
        style={{
          zIndex: "1",
          position: "relative",
          height: "100%",
          cursor: artifactData ? "pointer" : "default", // Pointer cursor if content is copyable
        }}
        onClick={artifactData ? handleCopy : undefined} // Handle click to copy only if data exists
      >
        <div className="results-data text-center">
          {loading ? (
            <div className="spinner-container">
              <Spinner animation="border" role="status" className="spinner">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div>
              {artifactData.split("\n").map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          )}
        </div>
      </Card>
      {copied && (
    <div
        id="copy-notification"
        className="copy-notification visible"
        style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
        }}
    >
        Copied to clipboard!
    </div>
    )}

    </div>
  );
};

export default Results;
