import { Form, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import validateSimpleRegistration from "../services/userValid";
import { apiUrl } from '../config.json'
import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
const notify = (message) => toast(message);

function SimpleRegistrationComp(props) {
  const [file, setFile] = useState()
  return (
    <div className="text-center justify-content-center pt-5">
      <h1>הירשם לאתר!</h1>
      <Container className="form-container-simple text-center justify-content-center col-12 col-md-7 col-lg-5">
        <Form>
          <h4>מלא את השדות כדי להיות רשום באתר!</h4>
          <div className="form-fields-simple">
            <Form.Group>
              <label htmlFor="file">הוסף תמונה שלך:</label>
              <input type="file" name="image" id="image" accept="image/*" onChange={(e) => {
                setFile(e.target.files[0]);
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => document.getElementById('id_img').src = reader.result;
                document.getElementById('id_img').className = ''
              }} />
            </Form.Group>
            
            <img src="" className="d-none" id="id_img" alt="user_pic" style={{width: '200px', height: '160px', borderRadius: 20}}/>

            <Form.Group>
              <Form.Label>כמה מילים על הבלוגר</Form.Label>
              <textarea className="form-control" name="about_writer" id="about_writer" cols="30" rows="5"></textarea>
            </Form.Group>
            <Form.Group
              className="mb-3 form-inputs-simple"
              controlId="formBasicEmail"
            >
              <Form.Label>אימייל:</Form.Label>
              <Form.Control type="email" placeholder="הכנס אימייל" />
            </Form.Group>
            <Form.Group
              className="mb-3 form-inputs-simple"
              controlId="formBasicPassword"
            >
              <Form.Label>סיסמא:</Form.Label>
              <Form.Control type="password" placeholder="בחר סיסמא" />
            </Form.Group>
            <Form.Group
              className="mb-3 form-inputs-simple"
              controlId="formBasicName"
            >
              <Form.Label>שם מלא:</Form.Label>
              <Form.Control type="text" placeholder="הקלד את שמך המלא" />
            </Form.Group>

            <Button
              id="signUpBtn"
              variant="warning"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                const validationErrorOrData = validateSimpleRegistration(
                  file,
                  'about_writer',
                  "formBasicEmail",
                  "formBasicPassword",
                  "formBasicName"
                );
                if (typeof validationErrorOrData == "string") {
                  notify(validationErrorOrData);
                } else {
                  const config = {
                    headers:{
                      'Content-Type': 'multipart/form-data'
                  }}
                  const formData = new FormData();
                  
                  formData.append('name', validationErrorOrData.name);
                  formData.append('email', validationErrorOrData.email);
                  formData.append('password', validationErrorOrData.password);
                  formData.append('image', file);
                  formData.append('about_writer', validationErrorOrData.about_writer);
                  formData.forEach(( value, key) => {
                    console.log(key + ': ' + value);
                    debugger
                  })
                  Axios.post(`${apiUrl}/users/`, formData, config)
                    .then((res) => {
                      props.history.replace('/')
                      notify('נרשמת בהצלחה!');
                    })
                    
                }
              }}
            >
              הירשם
            </Button>

            <div className="ReminderForAccount-simple">
              אתה רשום באתר <Link className="text-decoration-none" to="/signin">התחבר</Link>
            </div>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default SimpleRegistrationComp;