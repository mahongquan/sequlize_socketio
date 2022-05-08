import React, { Component } from 'react';
import PackItems from './PackItems';
import { Form,Modal } from 'react-bootstrap';
export default function UsePackEditNew(props){
  // const [state,setState]=React.useState({
  //   usepack: {},
  // });

  const close = () => {
    props.onClose();
  };
  if (!props.usepack){
    return (<div></div>);
  };
    return (
      <Modal
        show={props.open}
        onHide={props.onClose}
        dialogClassName="modal-900px"
      >
        <Modal.Header closeButton>
          <Modal.Title>编辑包</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>名称:</Form.Label>
    <Form.Label>{props.usepack.name}</Form.Label>
    <Form.Label>(ID:</Form.Label>
    <Form.Label>{props.usepack.pack})</Form.Label>
  </Form.Group>
  </Form>
          <div  id="id_useusepacks">
            <PackItems pack_id={props.usepack.pack} />
          </div>
        </Modal.Body>
      </Modal>
    );
  };
