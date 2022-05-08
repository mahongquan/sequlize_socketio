import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
export default function DlgOkCancel(props){
  const ok = () => {
    props.closeModal(true);
  };
  const cancel = () => {
    props.closeModal();
  };
    return (
      <Modal show={props.showModal} onHide={props.closeModal}>
        <Modal.Header closeButton>
          <h2>错误</h2>
        </Modal.Header>
        <Modal.Body>{props.description}</Modal.Body>
        <Modal.Footer>
          <button onClick={ok} className="btn save btn-primary">
            确定
          </button>
          <button onClick={cancel} className="btn save btn-primary">
            取消
          </button>
        </Modal.Footer>
      </Modal>
    );
  };
