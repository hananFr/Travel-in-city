import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiUrl } from '../config.json';
import ProductValid from "../services/productValid";
import PageHeader from "./common/pageHeader";

const UpdateProduct = (props) => {
    const [product, setProduct] = useState({
        name: '',
        desc: '',
        category: '',
        image: ''
    })
    const [file, setFile] = useState();
    const { id } = useParams();
    console.log(id);
    const setData = () => {
        axios.get(`${apiUrl}/products/${id}`)
            .then((res) => {
                setProduct(res.data);
                setFile(res.data.image);
            }
            ).catch((err) => console.log(err));
    }

    const setDefVal = () => {
        if (document.getElementById('id_category')) {
            document.getElementById('id_name').value = product.name
            document.getElementById('id_desc').value = product.desc
            document.getElementById('id_category').value = product.category
        }
    }
    useEffect(() => {
        setDefVal()
    }, [product])

    useEffect(() => {
        setData()
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        const validate = ProductValid(
            'id_name',
            'id_desc',
            'id_category',
            file
        );
        if (typeof validate == 'string') console.log(validate);
        else {
            const formData = new FormData();
            formData.append('name', validate.name);
            formData.append('desc', validate.description);
            formData.append('category', validate.category);
            formData.append('image', file);
            formData.forEach((key, value) => {
            })
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            try{
            axios.put(`${apiUrl}/products/update/${id}`, formData, config)
            .then(toast('המוצר עודכן בהצלחה!')) 
            
            window.location.replace('/');
            
            
            }
                catch(err){console.log(err)}
        }

    }
    console.log(product);
    return (
        <div className="form-container-create text-center justify-content-center mx-auto col-11 col-sm-10 col-md-9 col-lg-8 ">
            <PageHeader titleText={'עדכן כאן את המוצר!'} />


            <Form className="justify-content-center mx-auto col-12 text-center">
                <Form.Group controlId="id_name" className="mb-3">
                    <Form.Label>
                        שם:
                    </Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group>
                    <Form.Label> תיאור המוצר:</Form.Label>
                    <textarea name="desc" id="id_desc" cols="" rows="5" className="col-12 form-control mb-3" />
                </Form.Group>
                <Form.Group>
                    <Form.Select id="id_category" className="form-select form-select-lg mb-3" defaultValue={product.category} aria-label=".form-select-lg example">
                        <option value="בתי ספר">בתי ספר</option>
                        <option value="זוגות">זוגות</option>
                        <option value="משפחות">משפחות</option>
                        <option value="קבוצות">קבוצות</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mx-auto text-center col-12 justify-content-center mb-3">
                    <img src={`${apiUrl}/products/image/${id}`} id='id_img' style={{
                        display: 'block',
                        borderRadius: 10,
                        width: 200,
                        height: 160,
                    }} className="text-justify mb-3 mx-auto" alt='product_pic' />
                    <Form.Label className="">שנה תמונה:</Form.Label>
                    <input type="file" id="image" name="image" accept="image/*" onChange={(e) => {
                        if (e.target.files[0]) {
                            setFile(e.target.files[0]);
                            let reader = new FileReader();
                            reader.readAsDataURL(e.target.files[0]);
                            reader.onload = () => {
                                document.getElementById('id_img').src = reader.result;
                            }
                        }
                        else {
                            setFile(product.image);
                            document.getElementById('id_img').src = `${apiUrl}/products/image/${id}`;
                        }
                    }} />
                </Form.Group>
                <Button  className="mb-5" onClick={ (e) => {
                    onSubmit(e)
                }}>עדכן מוצר</Button>
            </Form>
        </div>
    )

}

export default UpdateProduct;