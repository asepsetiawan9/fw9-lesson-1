// import logo from '../logo.svg';
import '../assets/styles.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import {Row, Col, Form} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { editContact } from "../redux/asyncAction/contact";
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getContactById} from '../redux/asyncAction/contact';
// import {detailContact} from '../redux/reducers/contact';

const contactSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address format'),
    name: Yup.string()
            .test(
                'len',
                'characters not more than 20',
                (val) => {
                    if (val === undefined) {
                        return true;
                    }
                    return  ((val.length === 0 || (val.length <= 20)))
                }
            ),
    message: Yup.string()
    .test(
        'len',
        'characters not more than 250',
        (val) => {
            if (val === undefined) {
                return true;
            }
            return  ((val.length === 0 || (val.length <= 250)))
        }
    ),
  })

const ContactForm= (props)=>{
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getContactById(id_contact.id));
        }, []);

    const id_contact = useSelector(state => state.contact.dataDetail);
    const contact = useSelector(state => state.contact.dataContact);
    const nameContact = contact.name;
    const emailContact = contact.email;
    const messageContact = contact.message;

    return(
    <Form noValidation onSubmit={props.handleSubmit} style={{}}>
        <div className='d-flex flex-column gap-3' style={{width: '300px', height: '400px', background: '#fff', justifyContent: 'center', alignItems:'center'}}>
            <div style={{color: 'green', fontWeight: 'bold', paddingTop: '40px'}}>
                EDIT YOUR MESSAGE
            </div>
            <div className='d-flex flex-column gap-3'>

                <Form.Control 
                defaultValue = {props.nameContact}
                name='name' 
                onChange={props.handleChange} type='text' 
                isInvalid={!!props.errors.name}

                value={props.values.name}/>
                <Form.Control.Feedback type='invalid'> {props.errors.name}</Form.Control.Feedback>

                <Form.Control placeholder='Email' 
                name='email' 
                onChange={props.handleChange} type='email' 
                isInvalid={!!props.errors.email}
                value={props.values.email}/>
                <Form.Control.Feedback type='invalid'> {props.errors.email}</Form.Control.Feedback>
                
                <Form.Control as="textarea"  placeholder='Message' name='message' 
                onChange={props.handleChange} type='text' 
                isInvalid={!!props.errors.message}
                value={props.values.message}/>
                <Form.Control.Feedback type='invalid'> {props.errors.message}</Form.Control.Feedback>
            </div>
            <div style={{marginTop: '30px'}}>
                <button type='submit' style={{background: 'green', borderRadius: '5px', padding: '10px 70px', border: 'green', color: '#fff', fontWeight: 'bold'}}>Send</button>
            </div>
        </div>
    </Form>
    )
}

function EditContact() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const id_contact = useSelector(state => state.contact.dataDetail);
    const contact = useSelector(state => state.contact.dataContact);
    const nameContact = contact.name;
    const emailContact = contact.email;
    const messageContact = contact.message;

    React.useEffect(() => {
        dispatch(getContactById(id_contact.id));
        }, []);
    
    const successMsg = useSelector((state) => state.contact.successMsg);


    const onEdit = (value) => dispatch(
        editContact({
            id: id_contact.id,
            dataEdit: { name: value.name, email: value.email, message: value.message }
        }),
        alert(successMsg),
        navigate('/table-contact')
    )
  return (
    <>
    <Container className='parent d-flex' style={{maxWidth: '100%', height: '630px', justifyContent: 'center', alignItems: 'center'}}>
        <Row style={{justifyContent: 'center', alignItems: 'center'}}>
            <Col sm={6} className='d-flex flex-column gap-5 firstCol'>
                

            <div className='d-flex flex-row gap-2 align-items-center'>
                <div>
                    <div style={{fontWeight: 'bold'}}>
                        Edit Message
                    </div>
                </div>
            </div>

            </Col>
            <Col sm={6} >
                <div className='d-flex' style={{justifyContent:'center'}}>
                    <Formik
                    onSubmit={onEdit}
                    initialValues={{name: nameContact, email: emailContact, message: messageContact}}
                    validationSchema={contactSchema}>
                        {(props)=><ContactForm {...props}/>}
                    </Formik>
                </div>
            </Col>
        </Row>
    </Container>
    </>
  );
}

export default EditContact;
