import '../assets/styles.css';
import React from 'react';
import {Container, Button, Modal} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllContact, deleteData } from '../redux/asyncAction/contact';
import {selectContact, toggleModal} from '../redux/reducers/contact';
function TabContact() {
  
  const [search, setSearch] = React.useState('');
  const [selectId, setSelectId] = React.useState('');

  const table = useSelector(state => state.contact.tabel);
  const pageInfo = useSelector(state => state.contact.tabelInfo);
  const showModal = useSelector(state => state.contact.deleteModal)

  const dispatch = useDispatch();

  const confirmDelete = (id) => {
   dispatch(toggleModal())
   setSelectId(id)
 }

 const onDelete = () => dispatch(
   deleteData({
     id: selectId,
     cb: ()=>{
       dispatch(toggleModal())
       dispatch(getAllContact({}))
     }
   })
 )

  React.useEffect(()=>{
    dispatch(getAllContact({search}))
  }, [search])

  const onNext = () => dispatch(
    getAllContact({limit: pageInfo.limit, page: pageInfo.nextPage})
  )

  const onPrev = () => dispatch(
    getAllContact({limit: pageInfo.limit, page: pageInfo.prevPage})
  )

  const navigate = useNavigate();
  return (
    <>
    <Container className='min-vh-100 d-flex flex-column justify-content-center gap-3 parent' style={{maxWidth: '100%', height: '630px', justifyContent: 'center', alignItems: 'center'}}>
        
          <h2>All Data</h2>
          <div >
            <select onChange={(e)=>dispatch(getAllContact({limit: e.target.value}))} style={{alignItem: 'left'}}>
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
                  <Button 
                  onClick={() => {
                    dispatch(selectContact(o.id));
                    navigate('/detail-contact');
                    }} style={{background: 'green', color: 'white', borderRadius: '10px'}}>Detail</Button>
                  <Button variant='danger'
                  onClick={() => {
                    confirmDelete(o.id)
                    }} style={{color: 'white', borderRadius: '10px'}}>Delete</Button>
                    <Button variant='warning'
                  onClick={() => {
                    dispatch(selectContact(o.id));
                    navigate('/edit-contact');
                    }} style={{color: 'black', borderRadius: '10px'}}>Edit</Button>
                </td>
              </tr>
              )} 
            </tbody>
          </table>
          <div className='d-flex flex-row gap-3' style={{paddingTop: '20px'}}>
            <button onClick={onPrev} disabled={pageInfo?.currPage<2} style={{background: 'blue', color: 'white', borderRadius: '10px'}}>Prev</button>
            <div> {pageInfo?.currPage} </div>
            <button onClick={onNext} disabled={pageInfo?.nextPage<2} style={{background: 'blue', color: 'white', borderRadius: '10px'}}>Next</button>
          </div>
       
    </Container>
    <Modal show={showModal} style={{color: 'black'}}>
        <Modal.Header>
          <Modal.Title>Delete data</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure about that bruh? {selectId}</Modal.Body>
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

export default TabContact;
