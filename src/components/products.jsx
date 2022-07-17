import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "./product";
import {apiUrl} from '../config.json'




function Products() {

    const [products, setProducts] = useState([]);
    const [image, setImage] = useState()
    const [count, setCount] = useState(0);
    const [vcount, setVcount] = useState(0);

    const setData = async () => {
        await axios.get(`${apiUrl}/products`).then((res) => {
        setVcount(res.data.length);
        console.log(res.data);
        setProducts(res.data);
        setTheCount(res.data.length, res.data.length)
        setImage(res.data[count]);
    })
    }
    useEffect(() => {
        setData();
    }, [])



    const setCard = () => {

        setImage(products[count]);

    }

    const onBtn = (req, def, res) => {
        console.log(req, def, res);
        (res) ? setCount(req) : setCount(def)
    }

    const setTheCount = (count, length) => {
        console.log(0 % length);
        setCount(count % length);
    }


    useEffect(() => {
        let interval = setInterval(() => setVcount(vcount => vcount + 1), 5000)
        return () => clearInterval(interval);


    }, [])




    useEffect(() => {
        setTheCount(vcount, products.length);


    }, [vcount])

    useEffect(() => {
        setCard();
    }, [count])

    useEffect(() => {
        window.addEventListener('load', setData);
    })




    if(products && image){
    return (
        <div id="carouselExampleControls" className=" justify-content-center align-center col-12  py-3 text-center carousel-slide mx-0" data-bs-ride="carousel">

            <div id="img_box" className="mx-0 carousel-inner justify-content-center text-center col-12 p-0" >
                <Product
                    product={image}
                    count={count}
                    onBtn={onBtn}
                    setImage={(img) => setImage(img)}
                    products={products}
                />
            </div>


        </div>

    )
    } else return null
}



export default Products

