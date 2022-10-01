// import logo from '../logo.svg';
import '../assets/styles.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import {Row, Col, Form} from 'react-bootstrap';
import {FiMapPin, FiPhone, FiMail} from "react-icons/fi";
import {Formik} from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { postContact } from "../redux/asyncAction/contact";
import {useNavigate, Link} from 'react-router-dom';

const contactSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address format').required('Required'),
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
            ).required('Required'),
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
    ).required('Required'),
  })

const ContactForm= (props)=>{

    return(
    <Form noValidation onSubmit={props.handleSubmit} style={{width: '300px', height: '400px', background: '#fff'}}>
        <div className='d-flex flex-column gap-3' style={{justifyContent: 'center', alignItems:'center'}}>
            <div style={{color: 'green', fontWeight: 'bold', paddingTop: '40px'}}>
                LEAVE US MESSAGE
            </div>
            <div className='d-flex flex-column gap-3'>
                <Form.Control placeholder='Name' 
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

function ContactUs() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const successMsg = useSelector((state) => state.contact.successMsg);
    const errorMsg = useSelector((state) => state.contact.errorMsg);
    console.log(successMsg);

    const onSubmit = (value) => {
        const data = { name: value.name, email: value.email, message: value.message };
        dispatch(postContact(data));
            alert(successMsg);

      };

      
  return (
    <>
    <Container className='parent d-flex' style={{}}>
        <Row className='mainRow'>
            <Col sm={6} className='d-flex flex-column gap-5 firstCol'>
                <div className='d-flex flex-row gap-2 align-items-center' >
                    <div>
                        <FiMapPin style={{fontSize: '30px'}}/>
                    </div>
                    <div>
                        <div style={{fontWeight: 'bold'}}>
                            ADDRESS
                        </div>
                        <div>
                            Kp-Barukuray RT/RW 004/005 Desa SUkatani
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-column gap-5 firsColPhone'>
                <div className='d-flex flex-row gap-2 align-items-center'>
                    <div>
                        <FiPhone style={{fontSize: '30px'}}/>
                    </div>
                    <div>
                        <div style={{fontWeight: 'bold'}}>
                            PHONE
                        </div>
                        <div>
                            082216115733
                        </div>
                    </div>
                </div>

                <div className='d-flex flex-row gap-2 align-items-center'>
                    <div>
                        <FiMail style={{fontSize: '30px'}}/>
                    </div>
                    <div>
                        <div style={{fontWeight: 'bold'}}>
                            Email
                        </div>
                        <div>
                            zep@bismilah.com
                        </div>
                    </div>
                </div>
                </div>
                <div className='d-flex flex-row gap-2 align-items-center'>
                    <div>
                        <Link to={'/table-contact'} style={{background: 'green', borderRadius: '5px', padding: '10px 70px', border: 'green', color: '#fff', fontWeight: 'bold'}}>
                            List All Data
                        </Link>
                    </div>
                </div>
                
            </Col>
            <Col sm={6} className='secCol'>
                <div className='d-flex' style={{justifyContent:'center'}}>
                    <Formik
                    onSubmit={onSubmit}
                    initialValues={{name: '', email: '', message: ''}}
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

export default ContactUs;
