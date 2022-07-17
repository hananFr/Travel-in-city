import React, { useState } from 'react';
import { useEffect } from 'react';
import { getCurrentUser } from '../services/userService';
import About from './about';
import Calendar from './common/calendar';

import Products from './products';
import Slider from './slider';
import WebsiteBlogs from './websiteBlogs';
import Week from './week';

function Home(props) {
    const [user, setUser] = useState(props.user);

    const [defaultDate, setDefaultDate] = useState(new Date())
    defaultDate.setDate(1)

    return (
        <div className="container col-12 justify-content-center text-center m-0 p-0">
            <div className="row col-12 justify-content-center text-center m-0 p-0">
                <Products />
            </div>
            <div className="row col-12 justify-content-center text-center m-0 p-0">
                <Week></Week>
            </div>

            <div className='m-0 p-0 col-12' id='about'>
                <About />
                <WebsiteBlogs />
            </div>
            <div className="row col-12 justify-content-center text-center m-0 p-0">
                <Slider></Slider>
            </div>

        </div>
    )
}


export default Home;