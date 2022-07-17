import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link, useParams, } from "react-router-dom";
import { apiUrl } from '../config.json'
import { toast } from "react-toastify";
import { getCard } from "../services/cardService";
import { getCurrentUser } from "../services/userService";
import axios from "axios";


function CardPage(props) {
    const [card, setCard] = useState();
    const [date, setDate] = useState();
    let { id } = useParams(props)
    const setData = async () => {
        const  {data}  = await getCard(id)
        setCard(data);
    }

    const [admin, setAdmin] = useState(false)
    const getAdmin = () => {
        const setUser = getCurrentUser();
        (setUser) ? setAdmin(setUser.admin) : setAdmin(false);
    }
    const setTheDate = () => {
        if (card) {
            const date = new Date(card.travelDate);

            setDate(date);
        }
    }

    if (card) {
        console.log(card.travelDate);
    }

    const deleteCard = () => {
        axios.delete(`${apiUrl}/cards/${card._id}`).then((res) => {
            toast('המחיקה הושלמה');
            window.location.assign('/');
        })
    }



    const submit = () => {
        const path = window.location.pathname;

        confirmAlert({
            customUI: ({ onClose }) => {
                document.getElementById('id_container').addEventListener('click', () => {
                    onClose();
                    setInterval(() => { if (window.location.pathname !== path) props.history.replace(path) }, 0);
                });
                return (
                    <div style={{
                        zIndex: 2,
                        position: 'fixed',
                        top: '25%',
                        left: '25%',
                        display: 'block',
                        borderStyle: 'solid',
                        borderColor: 'ActiveBorder',
                        borderRadius: 10,
                        backgroundColor: 'white'
                    }} className="mt-3 mx-auto mb-0 p-0 col-10 col-sm-9 col-md-8 col-lg-6 text-center text-light custom-ui alert" dir="rtl">
                        <h5 className="mt-2 mb-4 col-12 mx-0" style={{
                            // borderTopRightRadius: 7,
                            // borderTopLeftRadius: 7,
                            backgroundColor: 'black',
                            paddingTop: '13px',
                            paddingBottom: '13px'
                            
                        }}>האם אתה בטוח?</h5>
                        <p className="mb-5 text-primary">אתה רוצה למחוק את הטיול הזה?</p>
                        <div className="mb-4">
                            <button className="btn text-center btn-info col-2 col-sm-1 mx-1 py-1" onClick={() => {
                                document.getElementById('id_container').hidden = false
                                onClose()
                            }}>לא</button>
                            <button className="btn text-center btn-info col-2 col-sm-1 mx-1 py-1"
                                onClick={() => {
                                    deleteCard()
                                    onClose();
                                }}
                            >
                                כן
                            </button>
                        </div>
                    </div>
                );
            }
        });
    };


    const printDate = () => {
        console.log(date);
        if (date) {
            return `${date.getDate()}.${date.getMonth() + 1}`
        }
        else return null
    }

    useEffect(() => {
        setData();
        getAdmin();


    }, [])

    useEffect(() => {
        setTheDate()
    }, [card])



    if (card) {

        return (
            <React.Fragment>

                <div className=" mx-auto text-right"
                    style={{
                        zIndex: 1,
                    }}
                >
                    <div className="card">

                        <img
                            className="p-2"
                            src={`http://localhost:3900/api/cards/image/${id}`}
                            alt={card.travelName}
                            style={{ width: '100%', maxHeight: '500px' }}
                        />

                        <div className="card-body text-center mx-auto">
                            <h5 className="card-title">{card.travelName}</h5>
                            <p className="card-text mx-auto text-justify col-md-10 col-lg-7 border-top pt-2">
                                <b>למי הטיול? </b>
                                {card.travelCategory}
                                <br />
                                <b>מתי? </b>
                                {printDate()}
                                <br />
                                <b>מקום מפגש:</b>
                                {card.travelAddress}
                                <br />
                                <br />
                                <b>קצת על הטיול:</b>
                                <br />
                                {card.travelDescription}
                            </p>
                            <br></br>
                            <br></br>
                            {admin && (
                                <Link to={`/my-cards/update/${id}`} ><button id="id_link" className="link-btn btn btn-muted text-info">ערוך כרטיס</button></Link>
                            )}
                            {admin && (
                                <button className="link-btn btn btn-muted text-info" onClick={submit}>
                                    מחק כרטיס
                                </button>
                            )}

                        </div>
                    </div>
                </div >

            </React.Fragment>
        )
    }
    else { return null }

}

export default CardPage