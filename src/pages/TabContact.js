// import logo from '../logo.svg';
import '../assets/styles.css';
import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import {Row, Col, Button, Modal} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getData } from '../redux/asyncAction/contact';
import {selectContact} from '../redux/reducers/contact';
import ModalDelete from './ModalDelete'

import axios from 'axios';
function TabContact() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [table, setTable] = React.useState([])
  const [pageInfo, setPageInfo] = React.useState(null)
  const [search, setSearch] = React.useState('')
  const [limit, setLimit] = React.useState(5)
  const [page, setPage] = React.useState(1)
  
  const getData = (limit=5, page=1, search='')=> {
    limit = parseInt(limit)
    page = parseInt(page)
    const query = new URLSearchParams({limit, page, search}).toString()
    axios.get(`http://localhost:3333/contact//get-data?${query}`).then(({data})=>{
      setTable(data.result)
      setPageInfo(data.infoPage)
    })
  }

  React.useEffect(()=>{
    getData(limit, page, search)
  }, [limit, page, search])

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
            <input name="search" onChange={(e)=>{setSearch(e.target.value);}} placeholder='Search'></input>
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
              {table.map((o, index)=> 
              <tr key={index}>
                <td>{o.id}</td>
                <td>{o.name}</td>
                <td>{o.email}</td>
                <td>
                <ModalDelete
                            id={o.id}
                            />
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
