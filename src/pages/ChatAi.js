import { Field, Form, Formik, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ChatAi() {

  const [output, setOutput] = useState('');
  const [displayedOutput, setDisplayedOutput] = useState('');

  const messageSchema = object({
    prompt: string().required("Input is required").min(3).max(10000),
  })

  const initValue = {
    prompt: '',
  }

  const handleSubmit = async (values) => {

    await axios.post("http://localhost:5000/api/chat", values, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log('Data fetched successfully', res.data.kwargs.content);
      animateText(res.data.kwargs.content)
    })
      .catch(error => {
        console.error('Form submission error', error);
      });
  };

  const animateText = (text) => {
    const words = text.split(' ');
    let currentWordIndex = 0;

    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        setDisplayedOutput(prevOutput => prevOutput + ' ' + words[currentWordIndex]);
        currentWordIndex++;
      } else {
        clearInterval(interval); // Stop the animation when all words are displayed
      }
    }, 100);
  };

  useEffect(() => {
    setOutput(displayedOutput);
    }, [displayedOutput, output]);

  // useEffect(() => {
  //     const textarea = document.getElementById('output');

  //     function adjustTextareaHeight() {
  //         textarea.style.height = 'auto';
  //         textarea.style.height = textarea.scrollHeight + 'px';
  //     }

  //     textarea.addEventListener('input', adjustTextareaHeight);

  //     return () => {
  //         textarea.removeEventListener('input', adjustTextareaHeight);
  //     };
  // }, []);

  return (
    <>
      <Formik initialValues={initValue} validationSchema={messageSchema} onSubmit={handleSubmit}>
        <div className='container d-flex align-items-center justify-content-center'>
          <div className='card p-4 w-50 my-3 mx-auto' style={{ width: '600px' }}>
            <h2 className="mb-8 text-center">Chat AI</h2>
            <Form>
              <div className="mb-3">
                <label htmlFor="prompt" className="form-label">Input Message</label>
                <Field name="prompt" type="text" className="form-control" id="prompt" placeholder='Enter input data' />
                <div style={{ color: 'red' }}>
                  <ErrorMessage name='prompt' />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="output" className="form-label">Output Data</label>
                <p id='output'>{displayedOutput}</p>
                {/* <Field name="output" as="textarea" className="form-control" id="output" value={output} readOnly placeholder='Output here' /> */}
                {/* <div style={{ color: 'red' }}>
                                    <ErrorMessage name='output' />
                                </div> */}
              </div>
              <div className="text-center mb-3">
                <button type="submit" className='btn btn-dark'>Send Message</button>
              </div>
            </Form>
          </div>
        </div>
      </Formik>
    </>
  );
}
