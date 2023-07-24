import React from "react";
import "./ModalBasic.scss";
import { Modal } from "semantic-ui-react";

export function ModalBasic({ show, size, title, children, onClose }) {
  return (
    <Modal className="modal-basic" open={show} onClose={onClose} size={size}>
      {title && <Modal.Header>{title}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}
ModalBasic.defaultProps = {
  size: "tiny",
};
