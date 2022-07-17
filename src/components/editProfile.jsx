import { Form, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { apiUrl } from '../config.json'
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import validateSimpleUpdate from "../services/editProfile";
const notify = (message) => toast(message);

function EditProfile(props) {
    const [user, setUser] = useState()
    const [file, setFile] = useState();
    const { id } = useParams()

    const setTheUser = () => {
        axios.get(`http://localhost:3900/api/users/use/${id}`)
            .then((res) => {
                setUser(res.data);
                setFile(res.data.image)
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
         setTheUser();
    },[])
    if (user) {
        return (
            <div className="text-center justify-content-center pt-5">
                <h1>עדכן את פרטיך!</h1>
                <Container className="form-container-simple text-center justify-content-center col-12 col-md-7 col-lg-5">
                    <Form>
                        <h4>ערוך כאן את הפרופיל שלך</h4>
                        <div className="form-fields-simple">
                            <Form.Group>
                                <label htmlFor="file">עדכן תמונה</label>
                                <input className="mb-3" type="file" name="image" id="image" accept="image/*" onChange={(e) => {

                                    if (e.target.files[0]) {
                                        setFile(e.target.files[0]);
                                        let reader = new FileReader();
                                        reader.readAsDataURL(e.target.files[0]);
                                        reader.onload = () => document.getElementById('id_img').src = reader.result;
                                        document.getElementById('id_img').className = ''
                                    } else {
                                        setFile(user.image)
                                        document.getElementById('id_img').src = `http://localhost:3900/api/users/user/${id}`
                                    }
                                }
                                } />
                            </Form.Group>

                            <img src={`http://localhost:3900/api/users/user/${id}`} id="id_img" alt="user_pic" style={{ width: '200px', height: '160px', borderRadius: 20 }} />

                            <Form.Group>
                                <Form.Label>עדכן את התיאור שלך!</Form.Label>
                                <textarea defaultValue={user.about_writer} className="form-control" name="about_writer" id="about_writer" cols="30" rows="5"></textarea>
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-inputs-simple"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>אימייל:</Form.Label>
                                <Form.Control type="email" defaultValue={user.email} />
                            </Form.Group>

                            <Form.Group
                                className="mb-3 form-inputs-simple"
                                controlId="formBasicName"
                            >
                                <Form.Label>שם מלא:</Form.Label>
                                <Form.Control type="text" defaultValue={user.name} />
                            </Form.Group>

                            <Button
                                id="signUpBtn"
                                variant="warning"
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    console.log(document.getElementById('about_writer').value);
                                    debugger
                                    const validationErrorOrData = validateSimpleUpdate(
                                        'about_writer',
                                        "formBasicEmail",
                                        "formBasicName"
                                    )
                                    console.log(validationErrorOrData);
                                    debugger
                                    if (typeof validationErrorOrData == "string") {
                                        notify(validationErrorOrData);
                                    } else {
                                        const config = {
                                            headers: {
                                                'Content-Type': 'multipart/form-data'
                                            }
                                        }
                                        const formData = new FormData();
                                        formData.append('name', validationErrorOrData.name);
                                        formData.append('email', validationErrorOrData.email);
                                        formData.append('image', file);
                                        formData.append('about_writer', validationErrorOrData.about_writer);
                                        axios.put(`${apiUrl}/users/update/${id}`, formData, config)
                                            .then((res) => {
                                                props.history.replace('/')
                                                notify('פרטיך עודכנו בהצלחה!');
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
    else return null
}

export default EditProfile;