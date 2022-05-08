import React from 'react';
import LoginFormComponent from './LoginFormComponent';
import { Modal } from 'react-bootstrap';
export default function DlgLogin(props){
  return (
      <Modal show={props.open} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginFormComponent
            onLoginSubmit={props.onLoginSubmit}
            onClose={props.onClose}
          />
        </Modal.Body>
      </Modal>
    );
  }
