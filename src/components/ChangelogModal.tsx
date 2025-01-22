import React from "react";
import { Modal, Button } from "react-bootstrap";

interface ChangelogModalProps {
  version: string;
  changelog: string[];
  show: boolean;
  onClose: () => void;
}

const ChangelogModal: React.FC<ChangelogModalProps> = ({
  version,
  changelog,
  show,
  onClose,
}) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="changelog-modal"
    >
      <div className="p-4 text-center changelog-content">
        <h2 className="changelog-title">What's New? (v{version})</h2>
        <ul className="changelog-list">
          {changelog.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <Button variant="primary" className="mt-3" onClick={onClose}>
          Got it!
        </Button>
      </div>
    </Modal>
  );
};

export default ChangelogModal;
