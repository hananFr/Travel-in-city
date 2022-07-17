import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from '../config.json'




function Product({ product, count, onBtn, setImage, products }) {


    const [description, setDescription] = useState([])


    const handleResize = () => {
        if (document.getElementById(`product${product._id}`) && document.getElementById('span_buttons')) {
            document.getElementById(`product${product._id}`).style.height = `${document.getElementById(`product${product._id}`).getBoundingClientRect().width * 5 / 8}px`;
            document.getElementById(`product${product._id}`).style.backgroundSize = `${document.getElementById(`product${product._id}`).getBoundingClientRect().width}px ${document.getElementById(`product${product._id}`).getBoundingClientRect().width * 5 / 8}px`;
            document.getElementById('id_pre').style.fontSize = `${30 / 486.38543701171875 * document.getElementById(`product${product._id}`).getBoundingClientRect().width}px`
            document.getElementById('id_pre').style.marginBottom = `${30 / 486.38543701171875 * document.getElementById(`product${product._id}`).getBoundingClientRect().width}px`
            document.getElementById('id_desc').style.fontSize = `${15 / 486.38543701171875 * document.getElementById(`product${product._id}`).getBoundingClientRect().width}px`
            document.getElementById('id_desc').style.width = `${459.375 / 486.38543701171875 * document.getElementById(`product${product._id}`).getBoundingClientRect().width}px`
            document.getElementById('id_desc').style.marginBottom = `${20 / 486.38543701171875 * document.getElementById(`product${product._id}`).getBoundingClientRect().width}px`
            document.getElementById('id_link').style.fontSize = `${13.22 / 486.38543701171875 * document.getElementById(`product${product._id}`).getBoundingClientRect().width}px`
            document.getElementById('id_link').style.paddingX = `${131.1875 / 486.38543701171875 * document.getElementById(`product${product._id}`).getBoundingClientRect().width}px`
            document.getElementById('id_link').style.paddingY = `${38 / 486.38543701171875 * document.getElementById(`product${product._id}`).getBoundingClientRect().width}px`
            document.getElementById('span_buttons').style.marginBottom = `${30 / 486.38543701171875 * document.getElementById(`product${product._id}`).getBoundingClientRect().width}px`
            document.getElementById('id_next').style.height = `${50 / 486.38543701171875 * document.getElementById(`product${product._id}`).getBoundingClientRect().width}px`
            document.getElementById('id_next').style.width = `${30 / 486.38543701171875 * document.getElementById(`product${product._id}`).getBoundingClientRect().width}px`
            document.getElementById('id_prev').style.height = `${50 / 486.38543701171875 * document.getElementById(`product${product._id}`).getBoundingClientRect().width}px`
            document.getElementById('id_prev').style.width = `${30 / 486.38543701171875 * document.getElementById(`product${product._id}`).getBoundingClientRect().width}px`
        }
    }


    const setTheDescription = () => {
        if (product.desc) {


            const description = product.desc.split(' ', 30)
            description[29] += '...'
            let words = ''
            description.map(word => {
                words += word + ' '
                words.trimEnd()

            })



            setDescription(words)
        }
    }




    useEffect(() => {
        setTheDescription()
        handleResize()
    }, [count, product])
    console.log(description);
    useEffect(() => {

        if (document.getElementById(`product${product._id}`)) {
            handleResize();
            window.addEventListener('resize', handleResize)
            window.addEventListener('load', handleResize)

        }
    });
    console.log(`${apiUrl}/products/image/${product._id}`);
    console.log(product);
    return (
        <React.Fragment>
            <div id={`img${product._id}`} className='col-9    col-lg-8 mx-auto text-justify'>


                <div id={`product${product._id}`} style={{
                    backgroundImage: `url(${apiUrl}/products/image/${product._id})`,
                    backgroundPosition: 'center',
                    backgroundSize: `contain`,
                    backgroundRepeat: 'no-repeat',
                    borderColor: "GrayText",
                    borderStyle: "outset",
                    borderRadius: '10px',
                    borderWidth: 8,
                    color: 'lightgrey',


                }}

                    className="col-12">

                    <div className="text-center">
                        <pre style={{ color: 'lightslategray' }} id="id_pre">{product.travelName}</pre>


                        <p id='id_desc' className="col-10 mb-sm-5 mx-auto text-justify">{description}</p>
                        <Link className='text-warning mb-5 p-0 text-decoration-none mb-sm-4 bg-muted' to={`/product-page/${product._id}`} >
                            <button id="id_link" className="m-0  text-warning btn btn-info">לפרטים נוספים</button>
                        </Link>
                    </div>
                </div>

                <div className="carousel-indicators mt-2" id="span_buttons">
                    {products.map(elem => {
                        let classes
                        let style

                        if (elem._id === product._id) {
                            classes = 'active mx-1 mt-2 py-1 opacity-100'
                            style = {
                                opacity: 100,
                                backgroundColor: 'grey',
                                borderStyle: 'none',
                                borderRadius: 10,
                                width: 35,
                                height: 7,
                            };
                        }
                        else {
                            classes = '  mx-1 mt-2 muted opacity-25'
                            style = {
                                opacity: 1,
                                backgroundColor: 'lightgrey',
                                borderStyle: 'none',
                                borderRadius: 10,
                                width: 35,
                                height: 7,
                            };
                        }
                        return (
                            <button onClick={() => onBtn(products.indexOf(elem), 0, true)} key={products.indexOf(elem)} style={style} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={products.indexOf(elem)} className={classes} aria-current="true" aria-label={`Slide ${products.indexOf(elem)}`}></button>
                        )

                    })}
                </div>
            </div >

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev"
                onClick={() => {
                    console.log(products);
                    onBtn(count - 1, products.length - 1, count > 0);
                    setImage(products[count]);
                }}
            >
                <span className="carousel-control-prev-icon m-0" id="id_prev" aria-hidden="true"></span>
            </button>


            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next"
                onClick={() => {
                    onBtn(count + 1, 0, count < products.length - 1)
                    setImage(products[count]);
                }}
            >
                <span className="carousel-control-next-icon m-0" id="id_next" aria-hidden="true"></span>
            </button>

        </React.Fragment>
    )
}


export default Product