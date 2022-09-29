// import logo from '../logo.svg';
import '../assets/styles.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import {getContactById} from '../redux/asyncAction/contact';

function DetailContact() {
    const dispatch = useDispatch();
    const id_contact = useSelector(state => state.contact.dataDetail);
    const contact = useSelector(state => state.contact.dataContact);
    console.log(contact);
    React.useEffect(() => {
        dispatch(getContactById(id_contact.id));
        }, []);
  return (
    <>

    <Container className='min-vh-100 d-flex flex-column justify-content-center gap-3 parent' style={{maxWidth: '100%', height: '630px', justifyContent: 'center', alignItems: 'center'}}>
        
          <h2>Detail Contact</h2>
          <div style={{fontWeight: 'bold'}}>Name</div>
          <div>{contact[0]?.name || 'Name sender contact'}</div>
          <div style={{fontWeight: 'bold'}}>Email</div>
          <div>{contact[0]?.email || 'Email sender contact'}</div>
          <div style={{fontWeight: 'bold'}}>Message</div>
          <div>{contact[0]?.message || 'Message sender contact'}</div>
 
    </Container>
    </>
  );
}

export default DetailContact;
