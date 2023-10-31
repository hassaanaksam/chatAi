
// import { Field, Form, Formik, ErrorMessage } from 'formik';

import NavBar from '../components/NavBar';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';

export default function SubmitForm() {

  const [file, setFile] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    const form = new FormData();
    form.set("file", file);

    axios.post("http://192.168.100.25:5000/api/document/create", form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {
      console.log('Form submitted successfully', res.data);
      Swal.fire({
        title: 'Send successfully',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        confirmButtonColor: 'Black'
      }).then(() => {

      })
    })
      .catch(error => {
        console.error('Form submission error', error);
      });
  };

  return (
    <>
      <NavBar />

      <div className='container d-flex align-items-center justify-content-center'>
        <div className='card p-4 w-50 my-3 mx-auto' style={{ width: '600px' }}>
          <h2 className="mb-8 text-center">Upload File</h2>


          <div className="mb-3">
            <label htmlFor="file" className="form-label">Picture</label>
            <input type="file" className="form-control" onChange={(e) => { setFile(e.target.files[0]) }} id="file" />
          </div>

          <div className="text-center mb-3">
            <button onClick={handleSubmit} className='btn btn-dark'>Submit</button>
          </div>

        </div>
      </div>
    </>
  );
}
