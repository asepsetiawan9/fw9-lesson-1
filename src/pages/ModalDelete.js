import React from "react";
import { Button, Modal } from "react-bootstrap";

function ModalCard(props) {
    return (
   
    <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: 'black'}}>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{color: 'black'}}>
           Delete id: {props.id}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary">
            Confirm
          </Button>
        </Modal.Footer>
    </Modal>
    );
  }
  
  function ModalDelete({id}) {
    const [show, setShow] = React.useState(false);
  
    return (
      <>
        <button style={{background: 'red', color: 'white', borderRadius: '10px'}} onClick={() => setShow(true)}>
        Delete
        </button>
  
        <ModalCard
          show={show}
          id={id}
          onHide={() => setShow(false)}
        />
      </>
    );
  }
  
  export default ModalDelete