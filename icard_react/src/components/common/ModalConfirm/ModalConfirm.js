import React from "react";
import { Button, Modal } from "semantic-ui-react";
import "./ModalConfirm.scss";

export function ModalConfirm({
  title,
  show,
  onClose,
  onCloseText,
  onConfirm,
  onConfirmText,
}) {
  return (
    <Modal className="modal-confirm" open={show} onClose={onClose} size="mini">
      {title && <Modal.Header>{title}</Modal.Header>}
      <Modal.Actions>
        <Button negative onClick={onClose}>
          {onCloseText || "Cancelar"}
        </Button>
        <Button positive onClick={onConfirm}>
          {onConfirmText || "Aceptar"}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
