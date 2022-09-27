// import logo from '../logo.svg';
import '../assets/styles.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../redux/asyncAction/contact';
function TabContact() {
  const dataContact = useSelector((state) => state.contact.dataContact);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getData());
    }, []);
    console.log('ini datanya', dataContact);
  return (
    <>
    <Container className='parent d-flex' style={{maxWidth: '100%', height: '630px', justifyContent: 'center', alignItems: 'center'}}>
        <Row style={{justifyContent: 'center', alignItems: 'center'}}>
        <Col md={12} style={{alignItem: 'center'}}>
          <h2>All Data</h2>
          <table>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
            {dataContact.result.map(o=> 
            <tr>
              <td>{o.id}</td>
              <td>{o.name}</td>
              <td>{o.email}</td>
              <td>{o.message}</td>
            </tr>
            )} 
          </table>
        </Col>
        {/* {dataContact.result.map(item=> 
        <Col className='col-4 col-md-3 card-list'>
            <div>
                <h5>id : {item.id}</h5>
                <h5>nama : {item.name}</h5>
                <h5>email : {item.email}</h5>
                <p>message : {item.message}</p>
            </div>
        </Col>
        )} */}
        </Row>
    </Container>
    </>
  );
}

export default TabContact;
