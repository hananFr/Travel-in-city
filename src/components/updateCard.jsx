import { Form, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import CardValid from "../services/validateService";
import React, { useEffect } from "react";
import { useState } from "react";
import PageHeader from "./common/pageHeader";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getCard } from "../services/cardService";
import Calendar from "./common/calendar";

const axios = require('axios')
const notify = (message) => toast(message);

function UpdateCardComp(props) {
    const [card, setCard] = useState({});
    const [date, chooseDate] = useState(new Date());
    const [defaultDate, setDefaultDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [heightDate, setHeightDate] = useState('1px');
    let { id } = useParams(props);
    const [file, setFile] = useState();


    const setTheCard = async () => {

        let { data } = await getCard(id);
        setCard(data)
        setFile(data.travelImage)

    }
    
    const setTheDefaultDate = () => {
        if (card.travelDate) {
            const newDate = new Date(card.travelDate);
            setDefaultDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
            chooseDate(new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()));
        }
    }


    


    const openCalendar = () => {
        document.getElementById('id_calendar').className = 'container mb-2';
        setOpen(true);
    }

    const setTheHeight = () => {
        if (document.getElementById(`1`)) {
            if(heightDate !== `${document.getElementById('1').getBoundingClientRect().width * 4/5}px`)
            setHeightDate(`${document.getElementById('1').getBoundingClientRect().width * 4 / 5}px`)
        }
    }


    const propDate = (date, def) => {

        if (date) {
            return date
        }
        else return def
    }
    if (file && document.getElementById('travelImage')) {
        document.getElementById('travelImage').defaultValue = file;
    }

    useEffect(() => {
        setTheCard();
        
    }, [])

    useEffect(() => {
        setTheDefaultDate();
    }, [card])

    useEffect(()=> {
        window.addEventListener('resize', setTheHeight);
    })



console.log(file);




    if (card && card.travelDate) {
        return (
            <div className="container-fluid text-center justify-content-center">
                <PageHeader titleText={card.travelName} />
                <Container className="form-container-create text-center justify-content-center col-md-6 col-lg-4">
                    <Form>
                        <h4>
                            אתה יכול לעדכן כאן את פרטי הטיול!
                        </h4>
                        <div className="form-fields-create justify-content-center">
                            <Form.Group
                                className="form-inputs-create"
                                controlId="formBasicTravelName"
                            >
                                <Form.Label>שם:</Form.Label>
                                <Form.Control type="text" defaultValue={card.travelName} />
                            </Form.Group>

                            <Form.Group
                                className="mb-3 form-inputs-create"
                                controlId="formBasicTravelDescription"
                            >
                                <Form.Label>תיאור הטיול:</Form.Label>
                                <textarea name="travelDescription" defaultValue={card.travelDescription} className="form-control" id="formBasicTravelDescription" cols="30" rows="5"></textarea>
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-inputs-create"
                                controlId="formBasicTravelAddress"
                            >
                                <Form.Label>כתובת:</Form.Label>
                                <Form.Control type="text" defaultValue={card.travelAddress} />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-inputs-create"
                                controlId="formBasicTravelCategory"
                            >
                                <Form.Label>קטגוריה:</Form.Label>
                                <br />
                                <Form.Select className="form-select form-select-lg mb-3" defaultValue={card.travelCategory} aria-label=".form-select-lg example">
                                    <option value="בתי ספר">בתי ספר</option>
                                    <option value="זוגות">זוגות</option>
                                    <option value="משפחות">משפחות</option>
                                    <option value="קבוצות">קבוצות</option>

                                </Form.Select>
                            </Form.Group>

                            <Form.Group
                                className="mb-3 form-inputs-create text-center"
                                controlId="formBasicTravelImage"
                            >
                                <img className="d-block text-center mx-auto" src={`http://localhost:3900/api/cards/image/${id}`} alt="your_card_pic" style={{width:'200px',height: '160px', borderRadius:10}} id='id_card_img' />
                                <Form.Label>ברצונך להחליף?</Form.Label>
                                
                                <input type="file"
                                    name="travelImage"
                                    className="mx-auto"
                                    id="travelImage"
                                    accept="image/*"
                                    onChange={(e) => {
                                        
                                        if (e.target.files[0]){
                                            setFile(e.target.files[0])
                                            let reader = new FileReader()
                                            reader.readAsDataURL(e.target.files[0])
                                            setFile(e.target.files[0])
                                            reader.onload = () => {
                                                document.getElementById('id_card_img').src = reader.result;
                                                
                                            }
                                            
                                        }
                                        else {
                                            setFile(card.travelImage)
                                            document.getElementById('id_card_img').src = `http://localhost:3900/api/cards/my-cards/${id}`
                                        }
                                        
                                    }} />
                            </Form.Group>
                            <Form.Group className="d-block btn btn-muted mb-3" onClick={() => {
                                openCalendar()
                                setTheHeight()
                            }}>


                                <img className="ml-1" src="calendar.jpg" style={{ width: '16.666667938232422px' }} alt="calendar_icon" id="id_calendar_icon" />
                                <input id="id_date" style={{ width: '93.4375px' }} name='date' type="text" className="btn btn-light form-control " value={`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`} readOnly={true} />
                            </Form.Group>
                        </div>


                        
                            <Calendar
                                className='col-12 col-sm-10 col-md-7 col-lg-6'
                                defaultDate={propDate(defaultDate, new Date(new Date().getFullYear(), new Date().getMonth(), 1))}
                                date={propDate(date, new Date())}
                                chooseDate={(d) => { chooseDate(d) }}
                                open={open}
                                height={heightDate}      

                            />
                        
                        <div>
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
                                    console.log(file);
                                    let cardValidate
                                    cardValidate = CardValid(
                                        "formBasicTravelName",
                                        "formBasicTravelDescription",
                                        "formBasicTravelAddress",
                                        "formBasicTravelCategory",
                                        file
                                    );

                                    if (typeof cardValidate == "string") {
                                        console.log(cardValidate);
                                        // notify(cardValidate);
                                    } else {
                                        const formData = new FormData();
                                        formData.append('travelName', cardValidate.travelName);
                                        formData.append('travelDescription', cardValidate.travelDescription);
                                        formData.append('travelAddress', cardValidate.travelAddress);
                                        formData.append('travelCategory', cardValidate.travelCategory);
                                        formData.append('travelImage', file);
                                        formData.append('travelDate', date);
                                        

                                        formData.forEach((key, value) => {
                                            console.log(key + ':' + value);
                                        })
                                        
                                        axios.put(`http://localhost:3900/api/cards/${card._id}`, formData, config)
                                            .then((response) => {
                                                toast('הכרטיס עודכן בהצלחה!');
                                                props.history.replace('/');
                                            }).catch((error) => {
                                                console.log(error);
                                                // notify(error);
                                            });
                                    }
                                }}
                            >
                                עדכן סיור
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>

        );
    }
    else return null;
}
export default UpdateCardComp;