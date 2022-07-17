import { Form, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import CardValid from "../services/validateService";
import React from "react";
import { useState } from "react";
import PageHeader from "./common/pageHeader";
import { getCurrentUser } from "../services/userService";
import { useEffect } from "react";
import BlogValid from "../services/blogValidate";
const axios = require('axios')

const notify = (message) => toast(message);

function CreateBlog(props) {

    const [file, setFile] = useState()
    const [user, setUser] = useState()



const SetTheUser = async () => {
    const user = await getCurrentUser()
    console.log(user);
    setUser(user)
}

useEffect(() => {
    SetTheUser()
}, [])
    

    





    return (
        <div className="container-fluid text-center justify-content-center">
            <PageHeader titleText="צור טיול" />
            <Container className="form-container-create text-center justify-content-center col-md-6 col-lg-4">
                <Form>
                    <h4>
                        הוסף בלוג חדש!
                    </h4>
                    <div className="form-fields-create justify-content-center">
                        <Form.Group
                            className="form-inputs-create"
                            controlId="formBasicName"
                        >
                            <Form.Label>שם הבלוג:</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group
                            className="mb-3 form-inputs-create"
                            controlId="formBasicContent"
                        >
                            <Form.Label>הכנס כאן תוכן לבלוג:</Form.Label>
                            <textarea name="content" className="form-control" id="formBasicContent" cols="30" rows="5"></textarea>
                        </Form.Group>
                        
                        

                        <Form.Group
                            className="mb-3 form-inputs-create"
                            controlId="formBasicImage"
                        >
                            <Form.Label>בחר קובץ: </Form.Label>
                            <img className="d-none text-center mx-auto" src="" alt="your_card_pic" style={{width:'200px',height: '160px', borderRadius:10}} id='id_card_img' />
                            <input  type="file" name="image" id="image" accept="image/*" onChange={(e) => {if (e.target.files[0]){
                                            let reader = new FileReader()
                                            reader.readAsDataURL(e.target.files[0])
                                            setFile(e.target.files[0])
                                            reader.onload = () => {
                                                document.getElementById('id_card_img').className = 'd-none text-center mx-auto mb-2 d-block'
                                                document.getElementById('id_card_img').src = reader.result;
                                                
                                            }
                                            setFile(e.target.files[0])
                                        }
                                        else {
                                            setFile('')
                                            document.getElementById('id_card_img').src = '';
                                            document.getElementById('id_card_img').className = 'd-none'
                                        }}} />
                        </Form.Group>
                    </div>



                <Button
                    variant="warning"
                    type="submit"
                    id="createCardBtn"
                    onClick={(e) => {
                        e.preventDefault();
                        const config = {
                            headers:
                                { 'Content-Type': 'multipart/form-data', }
                        }
                        let blogValid = BlogValid(
                            "formBasicName",
                            "formBasicContent",
                            file

                        );
                        if (typeof blogValid == "string") {
                            notify(blogValid);
                        } else {
                            console.log(file);
                            const formData = new FormData()
                            formData.append('name', blogValid.name)
                            formData.append('content', blogValid.content)
                            formData.append('writer', user._id)
                            formData.append('image', file)
                            
                          
                            axios.post(`http://localhost:3900/api/blogs/uploads`, formData, config)
                                .then((response) => {
                                    toast('בלוג חדש נוסף!')
                                    props.history.replace('/')
                                }).catch((error) => {
                                    console.log(error);
                                });
                        }
                    }}
                >
                    הוסף טיול
                </Button>
                </Form>
            </Container>
        </div>

    );
}
export default CreateBlog;