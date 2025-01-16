import React from "react";
import { Modal, Button } from "react-bootstrap";
import Info from "../assets/info.svg";

interface AlertModalProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ show, message, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Body className="justify-content-center text-center">
        <img
          src={Info}
          alt="Information icon"
          className="mb-5"
          width={100}
          height={100}
        />
        <h4>{message}</h4>
      </Modal.Body>
      <Modal.Footer className="justify-content-center" onClick={onClose}>
        <h5>Dismiss</h5>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
