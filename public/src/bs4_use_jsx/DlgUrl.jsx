import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Client from '../Client';
export default function DlgUrl(props){
  const [state,setState]=React.useState({error: ''});
  const close = () => {
    props.onClose();
  };
  React.useEffect(()=>{
    Client.get(props.url, props.data, (result)=>{
      console.info(result);
      if (!result.success) {
        setState({ error: result.message });
      } else {
        props.callback(result.data);
        close();
      }
    });
  },[props.data]);
  return (
    <Modal
      show={props.open}
      onHide={props.onClose}
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>请等待。。。</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{state.error}</div>
      </Modal.Body>
    </Modal>
  );
};

