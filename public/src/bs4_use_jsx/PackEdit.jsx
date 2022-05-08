import React from 'react';
import PackItems from './PackItems';
import { Modal } from 'react-bootstrap';

export default function PackEdit(props){
  const close = () => {
    props.onClose();
  };
    return (
      <Modal
        show={props.open}
        onHide={props.onClose}
        dialogClassName="modal-800px"
      >
        <Modal.Header closeButton>
          <Modal.Title>编辑包</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>id:{props.pack_id}</label>
          <div id="id_useusepacks">
            <PackItems pack_id={props.pack_id} />
          </div>
        </Modal.Body>
      </Modal>
    );
  }
