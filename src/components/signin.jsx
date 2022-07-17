import { Form, Button, Container } from "react-bootstrap";
import validateSignIn from "../services/loginValid";
import { toast } from "react-toastify";
import React from "react";
import { login } from "../services/userService";


const notify = (message) => toast(message);
function Login() {
  return (
  <div className="text-center justify-content-center col-12 col-md-7 col-lg-5 mx-auto">
      <h1>דף התחברות</h1>
      <h3>התחבר על מנת להיות זמין לכל התכנים באתר!</h3>
      <Container className="form-container-login">

        <Form>
          <Form.Group
            className="mb-3 form-fields-login"
            controlId="formIdEmail"
          >
            <Form.Label>אימייל</Form.Label>
            <Form.Control type="email"   />
          </Form.Group>
          <Form.Group
            className="mb-3 form-fields-login"
            controlId="formIdPassword"
          >
            <Form.Label>סיסמא</Form.Label>
            <Form.Control type="password" />
            
          </Form.Group>
          <br></br>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {              
              e.preventDefault();
              console.log(
                document.getElementById('formIdEmail').value,
                document.getElementById('formIdPassword').value);
              var error = validateSignIn(
                document.getElementById('formIdEmail').value,
                document.getElementById('formIdPassword').value
                );
              if (typeof validateSignIn == "string") {
                notify(error);
              } else {
                login(
                  document.getElementById('formIdEmail').value,
                  document.getElementById('formIdPassword').value
                )
              }
            }}
          >
            Login
          </Button>
        </Form>
      </Container>
    
    </div>
  );
}
export default Login;