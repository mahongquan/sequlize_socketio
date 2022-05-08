import React from 'react';
import { Modal } from 'react-bootstrap';
import Client from '../Client';
export default function DlgWait(props){
  const [state,setState] =React.useState({
    error: '',
  });

  React.useEffect(()=>{
    Client.get('/rest/allfile/', { id: props.contact.id }, (result) =>{
      console.info(result);
      if (!result.success) {
        setState({ error: result.message });
      } else {
        props.onClose();
      }
    });
  },[props.contact])
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
  }
