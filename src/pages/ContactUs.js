// import logo from '../logo.svg';
import '../assets/styles.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import {Row, Col, Form} from 'react-bootstrap';
import {FiMapPin, FiPhone, FiMail} from "react-icons/fi";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';

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

const ContactForm= ({errors, handleChange, handleSubmit})=>{

    return(
    <Form noValidation style={{width: '300px', height: '400px', background: '#fff'}}>
        <div className='d-flex flex-column gap-3' style={{justifyContent: 'center', alignItems:'center'}}>
            <div style={{color: 'green', fontWeight: 'bold', paddingTop: '40px'}}>
                LEAVE US MESSAGE
            </div>
            <div className='d-flex flex-column gap-3'>
                <Form.Control placeholder='Name' name='name' onChange={handleChange} type='name' isInvalid={!!errors.name}/>
                <Form.Control.Feedback type='invalid'> {errors.name}</Form.Control.Feedback>

                <Form.Control placeholder='Email' name='email' onChange={handleChange} type='email' isInvalid={!!errors.email}/>
                <Form.Control.Feedback type='invalid'> {errors.email}</Form.Control.Feedback>
                
                <Form.Control as="textarea"  placeholder='Message' name='message' onChange={handleChange} type='message' isInvalid={!!errors.message}/>
                <Form.Control.Feedback type='invalid'> {errors.message}</Form.Control.Feedback>
            </div>
            <div style={{marginTop: '30px'}}>
                <Link to='/table-contact' style={{background: 'green', borderRadius: '5px', padding: '10px 70px', border: 'green', color: '#fff', fontWeight: 'bold'}}>Send</Link>
            </div>
        </div>
    </Form>
    )
}

function ContactUs() {
  return (
    <>
    <Container className='parent d-flex' style={{maxWidth: '100%', height: '630px', justifyContent: 'center', alignItems: 'center'}}>
        <Row style={{justifyContent: 'center', alignItems: 'center'}}>
            <Col sm={6} className='d-flex flex-column gap-5'>
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
            </Col>
            <Col sm={6} >
                <div className='d-flex' style={{justifyContent:'center'}}>
                    <Formik
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
