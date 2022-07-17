import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import PageHeader from "./common/pageHeader";
import { apiUrl } from '../config.json'
import { getCurrentUser } from "../services/userService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

function ProductPage(props) {
    const [product, setProduct] = useState({
        name: '',
        desc: '',
        category: ''
    });
    const [user, setUser] = useState({
        _id: '',
        admin: false
    });

    let { id } = useParams();


    const loadProduct = async () => {
        await axios.get(`${apiUrl}/products/${id}`)
            .then((res) => {
                console.log(res);
                setProduct(res.data);
            }).catch((err) => console.log(err))
    }

    const setTheUser = async () => {
        const data = await getCurrentUser();
        console.log(data);

        (data) ? setUser(data) : setUser({
            user: 'Guest'
        })
    }

    const deleteProduct = async () => {
        await axios.delete(`${apiUrl}/products/${id}`).then((res) => {
            toast('המחיקה הושלמה');
            window.location.assign('/');
        }).catch((err) => console.log(err))
    }




    const submit = () => {
        const path = window.location.pathname
        console.log(path);
        confirmAlert({
            customUI: ({ onClose }) => {
                document.getElementById('id_container').addEventListener('click', () => {
                    onClose();
                    setInterval(() => { if (window.location.pathname !== path) props.history.replace(path) }, 0);
                });
                return (
                    <div id="id_alert" style={{
                        zIndex: 2,
                        position: 'fixed',
                        top: '25%',
                        left: '25%',
                        display: 'block',
                        borderStyle: 'solid',
                        borderColor: 'ActiveBorder',
                        borderRadius: 10,
                        backgroundColor: 'white'
                    }} className="mt-3 mx-auto mb-0 p-0 col-10 col-sm-9 col-md-8 col-lg-6 text-center text-light custom-ui" dir="rtl">
                        <h5 className="mt-2 mb-4 text-danger col-12 mx-0" style={{
                            backgroundColor: 'black',
                            paddingTop: '13px',
                            paddingBottom: '13px'
                        }}>האם אתה בטוח?</h5>
                        <p className="mb-5 text-primary">אתה רוצה למחוק את המוצר הזה?</p>
                        <div className="mb-4">
                            <button className="btn text-center btn-secondary text-light col-2 col-sm-1 mx-1 py-1" onClick={() => {
                                document.getElementById('id_container').hidden = false
                                onClose()
                            }}>לא</button>
                            <button className="btn text-center btn-secondary text-light col-2 col-sm-1 mx-1 py-1"
                                onClick={() => {
                                    deleteProduct()
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

    useEffect(() => {
        setTheUser()
        loadProduct();
    }, []);



    return (
        <React.Fragment>











            <div className="mx-3 my-0 text-justify align-self-start"><PageHeader titleText={product.name}></PageHeader>
                <h4 className="mx-3">תיאור המסלול</h4><img src={`${apiUrl}/products/image/${id}`} className="col-12 col-sm-7 col-md-5 col-lg-4 float-left  card  my-2 mx-auto mx-sm-5 p-0" id="id_cover" style={{
                    borderStyle: 'double',
                    borderWidth: 8,
                    borderColor: 'ButtonShadow',
                    maxHeight: 300
                }} />
                <p className="mx-3 mb-3">{product.desc}</p></div>

            <div className="d-flex justift-content-center text-center col-7 mx-auto mt-3">
                {user.admin && (
                    <Link className=" text-decoration-none mr-auto ml-3" to={`/update-product/${id}`}><button className='text-decoration-none btn mx-auto justify-content-center text-center btn-success'>ערוך מוצר</button>
                    </Link>
                )}

                {user.admin && (
                    <input type="button" dir="rtl" className='btn ml-auto btn-success delete-button' onClick={submit} value='מחק מוצר' />

                )}
            </div>





        </React.Fragment>
    )
}

export default ProductPage