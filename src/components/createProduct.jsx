import { Form, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import CardValid from "../services/validateService";
import React from "react";
import { useState } from "react";
import PageHeader from "./common/pageHeader";
import ProductValid from "../services/productValid";
const axios = require('axios')

const notify = (message) => toast(message);

function CreateProduct(props) {

    const [file, setFile] = useState()










    return (
        <div className="container-fluid text-center justify-content-center">
            <PageHeader titleText="צור מוצר" />
            <Container className="form-container-create text-center justify-content-center col-md-6 col-lg-4">
                <Form>
                    <h4>
                        הכנס כאן את פרטי המוצר!
                    </h4>
                    <div className="form-fields-create justify-content-center">
                        <Form.Group
                            className="form-inputs-create"
                            controlId="formBasicName"
                        >
                            <Form.Label>שם:</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group
                            className="mb-3 form-inputs-create"
                            controlId="formBasicDescription"
                        >
                            <Form.Label>תיאור הטיול:</Form.Label>
                            <textarea name="desc" id="formBasicDescription" className="form-control" cols="30" rows="5"></textarea>
                        </Form.Group>

                        <Form.Group
                            className="mb-3 form-inputs-create"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>קטגוריה:</Form.Label>
                            <br />
                            <Form.Select id="formBasicCategory" className="form-select form-select-lg mb-3" defaultValue='בחר קטגוריה' aria-label=".form-select-lg example">
                                <option value=""></option>
                                <option value="בתי ספר">בתי ספר</option>
                                <option value="זוגות">זוגות</option>
                                <option value="משפחות">משפחות</option>
                                <option value="קבוצות">קבוצות</option>

                            </Form.Select>
                        </Form.Group>

                        <Form.Group
                            className="mb-3 form-inputs-create"
                            controlId="formBasicTravelImage"
                        >
                            <Form.Label>בחר קובץ: </Form.Label>
                            <img className="d-none text-center mx-auto" src="" alt="your_card_pic" style={{ width: '200px', height: '160px', borderRadius: 10 }} id='id_card_img' />
                            <input type="file" name="travelImage" id="travelImage" accept="image/*" onChange={(e) => {
                                if (e.target.files[0]) {
                                    let reader = new FileReader()
                                    reader.readAsDataURL(e.target.files[0])
                                    setFile(e.target.files[0])
                                    reader.onload = () => {
                                        document.getElementById('id_card_img').className = 'text-center mx-auto mb-2 d-block'
                                        document.getElementById('id_card_img').src = reader.result;

                                    }
                                    setFile(e.target.files[0])
                                }
                                else {
                                    setFile('')
                                    document.getElementById('id_card_img').src = '';
                                    document.getElementById('id_card_img').className = 'd-none'
                                }
                            }} />
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
                            let productValid = ProductValid(
                                "formBasicName",
                                "formBasicDescription",
                                "formBasicCategory",
                                file

                            );
                            if (typeof productValid == "string") {
                                notify(productValid);
                            } else {
                                const formData = new FormData()
                                formData.append('name', productValid.name)
                                formData.append('desc', productValid.description)
                                formData.append('category', productValid.category)
                                formData.append('image', file)

                                axios.post(`http://localhost:3900/api/products/upload`, formData, config)
                                    .then((response) => {
                                        toast('הוספת מוצר חדש')
                                        props.history.replace('/')
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                            }
                        }}
                    >
                        הוסף מוצר
                    </Button>
                </Form>
            </Container>
        </div>

    );
}
export default CreateProduct;