import axios from "axios";
import HDate from "hebcal/src/hdate";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from '../../config.json';

function Day({ d, day, date, style, chooseDate, id, setTheDays }) {
    const [events, setEvents] = useState({
        event: '',
        events: []
    });
    const [dis, setDis] = useState(d)
    const [collapse, setCollapse] = useState('אין סיורים');
    const [days_array] = useState(['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'י"א', 'י"ב', 'י"ג', 'י"ד', 'ט"ו', 'ט"ז', 'י"ז', 'י"ח', 'י"ט', 'כ', 'כ"א', 'כ"ב', 'כ"ג', 'כ"ד', 'כ"ה', 'כ"ו', 'כ"ז', 'כ"ח', 'כ"ט', "ל"]);

    const findEvents = async () => {
        if (day) {
            await axios.get(`${apiUrl}/cards/date/${day.getFullYear()}, ${day.getMonth() + 1}, ${day.getDate()}`)
                .then((res) => {
                    if (res.data) {
                        setEvents({
                            event: 'טיול',
                            events: res.data
                        });
                    }
                    else {
                        setEvents({
                            event: '',
                            events: res.data
                        });
                    }
                }).catch(err => {
                    console.log(err);
                })
        }
    }

    const setTheCollapse = () => {
        if (events.events[0]) {
            setCollapse(<Link to={`/my-cards/card-page/${events.events[0]._id}`} className='text-decoration-none' >{events.events[0].travelName}</Link>)
        }
        else setCollapse(<p className="pb-0 mb-0">אין סיורים</p>)

    }

    const close = () => {
        if (day.getDate() !== date.getDate()) {
            setDis('none')
        }
    }
    useEffect(() => {
        close()
    }, [day])


    useEffect(() => {
        findEvents();
    }, []);

    useEffect(() => {
        setTheCollapse();
    }, [events])
    console.log(collapse);

    return (

        <React.Fragment>

            <div className="panel-group" id="accordion" style={{ width: `${1 / 7 * 100}%`, }}>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <a style={style} href={`#col${id}`} id={`d${id}`} key={id} className="btn col-12 btn-light" data-toggle='collapse' data-parent='#accordion' onClick={async () => {
                            date.setFullYear(day.getFullYear());
                            date.setMonth(day.getMonth());
                            date.setDate(day.getDate());
                            await chooseDate(day);
                            setTheDays();
                            console.log(date);
                            setDis('')

                        }} >
                            <b id={`b-${id}`} className="float-left">{day.getDate()}</b>
                            <b id={`b1-${id}`} className="float-right">{days_array[HDate(day).day - 1]}</b>
                        </a>
                    </div>

                    <div style={{zIndex: 2, position:'absolute' }} className={`d-${dis}  collapse pannel-collapse card col-4 col-sm-3  py-0`} id={`col${id}`}>
                        {collapse}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Day;