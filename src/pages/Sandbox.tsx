import { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner, Card } from "react-bootstrap";

interface SandboxProps {
  isSimpleBackground: boolean;
}

export default function Sandbox({ isSimpleBackground }: SandboxProps) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<null | {
    url: string;
    clipboard: { method: string; value: string }[];
    screenshotBefore: string;
    screenshotAfter: string;
    error: string | null;
  }>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`https://render.cyberkit.dev/?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({
        url,
        clipboard: [],
        screenshotBefore: "",
        screenshotAfter: "",
        error: "Fetch failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="pt-5 pb-5">
      <Row className="my-5">
        <Col className="text-center">
          <h1 className={`header ${isSimpleBackground ? "simple-header" : ""}`}>
            CyberKit.dev
          </h1>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              fontFamily: '"Courier New", Courier, monospace',
              color: "#00ff99",
              marginTop: "-12px",
              marginBottom: "0px",
            }}
          >
            Sandbox
          </h2>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center mt-3">
        <Col xs={12} md={6}>
          <Form.Control
            type="text"
            placeholder="Enter a URL to analyze"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
        </Col>
      </Row>

      <Row className="d-flex justify-content-center mt-3 mb-3">
        <Col xs="auto">
          <Button
            variant="primary"
            className="search-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </Button>
        </Col>
      </Row>

      {loading && (
        <div className="d-flex justify-content-center my-4">
          <Spinner animation="border" role="status" />
        </div>
      )}

      {result && !loading && (
        <div className="mt-4">
          {result.error && (
            <div className="text-danger text-center mb-3">
              ⚠️ {result.error}
            </div>
          )}

          <Card className="mb-4">
            <Card.Header className="fw-bold text-center">
              📋 Clipboard Activity
            </Card.Header>
            <Card.Body>
              {result.clipboard.length > 0 ? (
                <pre className="mb-0">{JSON.stringify(result.clipboard, null, 2)}</pre>
              ) : (
                <div className="text-center">No clipboard activity detected.</div>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header className="fw-bold text-center">
              🖼️ Screenshot Before Interaction
            </Card.Header>
            <Card.Body className="text-center">
              {result.screenshotBefore ? (
                <img
                  src={result.screenshotBefore}
                  alt="Before"
                  className="img-fluid rounded border"
                />
              ) : (
                <div className="text-center">No screenshot available.</div>
              )}
            </Card.Body>
          </Card>

          <Card>
            <Card.Header className="fw-bold text-center">
              🖼️ Screenshot After Interaction
            </Card.Header>
            <Card.Body className="text-center">
              {result.screenshotAfter ? (
                <img
                  src={result.screenshotAfter}
                  alt="After"
                  className="img-fluid rounded border"
                />
              ) : (
                <div className="text-center">No screenshot available.</div>
              )}
            </Card.Body>
          </Card>
        </div>
      )}
    </Container>
  );
}
