import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from './card'
import {apiUrl} from '../config.json'



function Slider() {

    const [cards, setCards] = useState(['1']);
    const [image, setImage] = useState()
    const [count, setCount] = useState(0);
    const [vcount, setVcount] = useState(0);

    const setData = async () => {
        await axios.get(`${apiUrl}/cards/my-cards`)
        .then((res) => {
        setVcount(res.data.length);
        setCards(res.data);
        setTheCount(res.data.length, res.data.length)
        setImage(res.data[count]);
        console.log(res.data);
        debugger
    }).catch((err) => console.log(err))
    console.log(`${apiUrl}/cards/my-cards`);
    debugger
    }

    useEffect(() => {
        setData();
    },[])

    

    const setCard = () => {
        if (cards) {
            setImage(cards[count])
        }
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
        let interval =  setInterval(() =>  setVcount(vcount => vcount + 1), 5000)
        return () => clearInterval(interval);
        
     
    },[])

    


    useEffect(() => {
        setTheCount(vcount, cards.length);
        
        
    },[vcount])

    useEffect(() => {
        setCard();
    },[count])

    useEffect(() => {
        window.addEventListener('load', setData);
    })


    if (cards && image) {
        

        return (
            <div id="carouselExampleControls" className=" justify-content-center align-center col-12  py-3 text-center carousel-slide mx-0" data-bs-ride="carousel">
                
                <div id="img_box" className="mx-0 carousel-inner justify-content-center text-center col-12 p-0" >
                    <Card
                        card={image}
                        count={count}
                        onBtn={onBtn}
                        setImage={(img) => setImage(img)}
                        cards= {cards}
                         />
                </div>
                
                
            </div>

        )
    }

    else return (
        <div className="my-5 text-center justify-content-center mx-auto">
            <h2>אין כרגע סיורים!</h2>
        </div>


    )
}

export default Slider

