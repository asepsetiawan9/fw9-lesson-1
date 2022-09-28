// import logo from '../logo.svg';
import '../assets/styles.css';
import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import {Row, Col, Button, Modal} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getData } from '../redux/asyncAction/contact';
import {selectContact} from '../redux/reducers/contact';

import axios from 'axios';
function TabContact() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [table, setTable] = React.useState([])
  const [pageInfo, setPageInfo] = React.useState(null)
  
  const getData = (limit=5, page=1)=> {
    limit = parseInt(limit)
    page = parseInt(page)
    const query = new URLSearchParams({limit, page}).toString()
    axios.get(`http://localhost:3333/contact//get-data?${query}`).then(({data})=>{
      setTable(data.result)
      setPageInfo(data.infoPage)
    })
  }

  React.useEffect(()=>{
    getData()
  }, [])

  const getNextPage =()=>{
    getData(pageInfo.limit, pageInfo.nextPage)
  }
  const getPrevPage =()=>{
    getData(pageInfo.limit, pageInfo.prevPage)
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
    </Modal>
    <Container className='min-vh-100 d-flex flex-column justify-content-center gap-3 parent' style={{maxWidth: '100%', height: '630px', justifyContent: 'center', alignItems: 'center'}}>
        
          <h2>All Data</h2>
          <div >
            <select style={{alignItem: 'left'}} onChange={(e)=>getData(e.target.value)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5} selected>5</option>
            </select>
          </div>
          <div>
            <input name='search' placeholder='Search'></input>
          </div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {table.map(o=> 
              <tr>
                <td>{o.id}</td>
                <td>{o.name}</td>
                <td>{o.email}</td>
                <td>
                  <button onClick={handleShow} style={{background: 'red', color: 'white', borderRadius: '10px'}}>Delete</button>
                  <button 
                  onClick={() => {
                    dispatch(selectContact(o.id));
                    navigate('/detail-contact');
                    }} style={{background: 'green', color: 'white', borderRadius: '10px'}}>Detail</button>
                </td>
              </tr>
              )} 
            </tbody>
          </table>
          <div className='d-flex flex-row gap-3' style={{paddingTop: '20px'}}>
            <button onClick={getPrevPage} disabled={pageInfo?.currPage<2} style={{background: 'blue', color: 'white', borderRadius: '10px'}}>Prev</button>
            <div> {pageInfo?.currPage} </div>
            <button onClick={getNextPage} disabled={pageInfo?.nextPage<2} style={{background: 'blue', color: 'white', borderRadius: '10px'}}>Next</button>
          </div>
       
    </Container>
    </>
  );
}

export default TabContact;
