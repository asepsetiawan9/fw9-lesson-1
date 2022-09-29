import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import {selectContact, toggleModal} from '../redux/reducers/contact';
import { deleteData, getAllContact } from '../redux/asyncAction/contact';

function ModalDelete(id) {
    
    const dispatch = useDispatch()
    const showModal = useSelector(state => state.contact.deleteModal)
     
    const confirmDelete = ({id}) => {
       const idselect = id.id
      console.log(id.id);
      dispatch(toggleModal())
      selectContact(idselect)
    }
    //console.log();
    const onDelete = () => dispatch(
      deleteData({
        id: id.id,
        cb: ()=>{
          dispatch(toggleModal())
          dispatch(getAllContact({}))
        }
      })
    )
  
    return (
      <>
        <button style={{background: 'red', color: 'white', borderRadius: '10px'}} onClick={() => confirmDelete({id})}>
        Delete
        </button>
  
        <Modal show={showModal} style={{color: 'black'}}>
        <Modal.Header>
          <Modal.Title>Delete data</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure about that bruh?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> dispatch(toggleModal())} >
            Close
          </Button>
          <Button variant="danger" onClick={onDelete}>
            Sure Delete it
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
  
  export default ModalDelete