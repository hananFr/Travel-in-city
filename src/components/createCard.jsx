import { Form, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import CardValid from "../services/validateService";
import React, { useEffect } from "react";
import { useState } from "react";
import PageHeader from "./common/pageHeader";
import Calendar from "./common/calendar";
const axios = require('axios')

const notify = (message) => toast(message);

function CreateCard(props) {

    const [file, setFile] = useState()
    const [date, chooseDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [heightDate, setHeightDate] = useState('1px');
    const [fontSizeDate, setFontSize] = useState()
    const [spanFontSizeDate, setSpanFontSize] = useState()

    const openCalendar = () => {

        document.getElementById('id_calendar').className = 'container mb-2'

        setOpen(true)

    }

    const setTheFont = () => {
        if (document.getElementById('1')){
            setFontSize(`${document.getElementById('1').getBoundingClientRect().width / 6}px`)
            setSpanFontSize(`${document.getElementById('1').getBoundingClientRect().width / 12}px`)
        }
    }

    const setTheHeight = () => {
        if (document.getElementById(`1`)) {
            if(heightDate !== `${document.getElementById('1').getBoundingClientRect().width * 4/5}px`)
            setHeightDate(`${document.getElementById('1').getBoundingClientRect().width * 4 / 5}px`)
        }
    }

    

    

    useEffect(()=> {
        window.addEventListener('resize', setTheHeight);
        window.addEventListener('resize', setTheFont);
    })




    return (
        <div className="container-fluid text-center justify-content-center">
            <PageHeader titleText="צור טיול" />
            <Container className="form-container-create text-center justify-content-center col-md-6">
                <Form>
                    <h4>
                        הכנס כאן את פרטי הטיול!
                    </h4>
                    <div className="form-fields-create justify-content-center">
                        <Form.Group
                            className="form-inputs-create"
                            controlId="formBasicTravelName"
                        >
                            <Form.Label>שם:</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group
                            className="mb-3 form-inputs-create"
                            controlId="formBasicTravelDescription"
                        >
                            <Form.Label>תיאור הטיול:</Form.Label>
                            <textarea name="travelDescription" className="form-control" id="formBasicTravelDescription" cols="30" rows="5"></textarea>
                        </Form.Group>
                        <Form.Group
                            className="mb-3 form-inputs-create"
                            controlId="formBasicTravelAddress"
                        >
                            <Form.Label>כתובת:</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group
                            className="mb-3 form-inputs-create"
                            controlId="formBasicTravelCategory"
                        >
                            <Form.Label>קטגוריה:</Form.Label>
                            <br />
                            <Form.Select className="form-select form-select-lg mb-3" defaultValue='בחר קטגוריה' aria-label=".form-select-lg example">
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
                            <img className="d-none text-center mx-auto" src="" alt="your_card_pic" style={{width:'200px',height: '160px', borderRadius:10}} id='id_card_img' />
                            <input type="file" name="travelImage" id="travelImage" accept="image/*" onChange={(e) => {if (e.target.files[0]){
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
                        <Form.Group className="d-block btn btn-muted mb-3" onClick={() => {
                            openCalendar();
                            setTheHeight();
                            setTheFont();
                        }}>

                            <img className="ml-1" src="calendar.jpg" style={{width: '16.666667938232422px'} }alt="calendar_icon" id="id_calendar_icon" />
                            <input id="id_date" style={{width:'93.4375px'}} name='date' type="text" className="btn  btn-light form-control " value={`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`} readOnly={true} />
                        </Form.Group>
                    </div>


                <div>
                    <Calendar
                        defaultDate={new Date()}
                        date={date}
                        chooseDate={(d) => { chooseDate(d) }}
                        open={open}
                        height={heightDate}
                        fontSizeDate={fontSizeDate}
                        spanFontSizeDate={spanFontSizeDate}
                    />
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
                        let cardValidate = CardValid(
                            "formBasicTravelName",
                            "formBasicTravelDescription",
                            "formBasicTravelAddress",
                            "formBasicTravelCategory",
                            file

                        );
                        if (typeof cardValidate == "string") {
                            notify(cardValidate);
                        } else {
                            const formData = new FormData()
                            formData.append('travelName', cardValidate.travelName)
                            formData.append('travelDescription', cardValidate.travelDescription)
                            formData.append('travelAddress', cardValidate.travelAddress)
                            formData.append('travelCategory', cardValidate.travelCategory)
                            formData.append('travelImage', file)
                            formData.append('travelDate', date)
                            
                            axios.post(`http://localhost:3900/api/cards/uploads`, formData, config)
                                .then((response) => {
                                    toast('הוספת טיול חדש')
                                    props.history.replace('/my-cards')
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
export default CreateCard;