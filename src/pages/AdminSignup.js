import React from 'react';
import { Form, Field, Formik, ErrorMessage } from "formik";
import { object, string } from 'yup';
import axios from 'axios';
import { useRef } from 'react';
import Swal from 'sweetalert2';
import NavBar from '../components/AdminNavbar';

export default function AdminSignup() {
  
  const formRef = useRef();
  const messageSchema = object({
    firstname: string().required(" * Firstname is required").min(3).max(30),
    lastname: string().required(" * Lastname is required").min(3).max(30),
    email: string().required(" * Email is required").email(),
    password: string().required(" * Password is required").min(8).max(16)
  })

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role:"admin"
  };

  const handleSubmit = (values) => {

    axios.post("http://localhost:5000/api/user", values, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log('Form submitted successfully', res.data);
      Swal.fire({
        title: 'Created successfully',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        confirmButtonColor: 'Black'
    }).then(() => {
        formRef.current.reset();
    })
    })
      .catch(error => {
        console.error('Form submission error', error);
      });
  };

  return (
    <div>
        <NavBar />
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={messageSchema} >
        <div className='container d-flex align-items-center justify-content-center vh-100'>
          <div className='card p-4 w-50 my-3 mx-auto' style={{ width: '600px' }}>
            <h2 className="mb-8 text-center">Admin Sign up</h2>
            <Form ref={formRef}>
              <div className="mb-3">
                <label htmlFor="firstname" className="form-label">First Name:</label>
                <Field name="firstname" type="text" className="form-control" id="firstname" placeholder='Enter your first name' />
                <div style={{ color: 'red' }}>
                  <ErrorMessage name='firstname' />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="lastname" className="form-label">Second Name:</label>
                <Field name="lastname" type="text" className="form-control" id="lastname" placeholder='Enter your last name' />
                <div style={{ color: 'red' }}>
                  <ErrorMessage name='lastname' />
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address:</label>
                <Field name="email" type="text" className="form-control" id="email" placeholder="name@example.com" />
                <div style={{ color: 'red' }}>
                  <ErrorMessage name='email' />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <Field name="password" type="password" className="form-control" id="password" rows="3" placeholder='Enter password' />
                <div style={{ color: 'red' }}>
                  <ErrorMessage name='password' />
                </div>
              </div>
              <div className="text-center mb-3">
                <button type="submit" className='btn btn-dark'>Sign up</button>
              </div>
            </Form>
          </div>
        </div>
      </Formik>
    </div>
  );
}
