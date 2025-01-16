import { Button, Col, Form } from "react-bootstrap";
import Close from "../assets/close.svg";

interface settingsProps {
  showSettings: boolean;
  handleShowSettings: () => void;
}

const Settings: React.FC<settingsProps> = ({
  showSettings,
  handleShowSettings,
}) => {
  return (
    <div className={`settings-pane ${showSettings ? "open" : ""}`}>
      <header className="d-flex justify-content-between align-items-center px-4 py-3">
        <h1 className="fw-bold mb-0">Settings</h1>
        <Button onClick={() => handleShowSettings()}>
          <img src={Close} width={25}></img>
        </Button>
      </header>
      <div className="p-5">
        <Form.Group className="mb-3 d-flex flex-row justify-content-between align-items-center">
          <Form.Label className='fs-5 mb-0'>Simple Background</Form.Label>
          <Form.Check className='fs-5' type="switch" />
        </Form.Group>
      </div>
    </div>
  );
};

export default Settings;
