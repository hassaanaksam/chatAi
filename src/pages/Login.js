
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { string, object } from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {

  const navigate = useNavigate();
  const messageSchema = object({
    email: string().required(" Email is required").email(),
    password: string().required(" Password is required").min(8).max(16)
  })

  const initialValues = {
    email: "",
    password: ""
  };

  const handleSubmit = (values) => {
    axios.post("http://localhost:5000/api/user/login", values)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        if (res.data.user.role === "admin") {

          console.log('Login successful', res.data);
          Swal.fire({
            title: 'Logged in Admin successfully',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            confirmButtonColor: 'Black'
          }).then(() => {
            navigate('/');
            window.location.reload();
          })
        } else if (res.data.user.role === "user") {
          console.log('Login successful', res.data);
          Swal.fire({
            title: 'Logged in User successfully',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            confirmButtonColor: 'Black'
          }).then(() => {
            navigate('/userinterface');
            window.location.reload();
          })
        }
      })
      .catch(error => {
        console.error('Login error', error)
        Swal.fire({
          title: 'Login failed',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          confirmButtonColor: 'Black'
        }).then(() => {
          window.location.reload();
        });
      })
  }
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={messageSchema} >
      <div className='container d-flex align-items-center justify-content-center vh-100'>
        <div className='card p-4 w-50 my-3 mx-auto' style={{ width: '600px' }}>
          <h2 className="mb-8 text-center">Welcome to ChatAI</h2><br />
          <Form>
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
              <button type="submit" className='btn btn-dark me-3'>Log in</button>
              <Link to={`/signup`}><button className='btn btn-dark'>Sign up</button></Link>
            </div>
          </Form>
        </div>
      </div>
    </Formik>
  );
}
