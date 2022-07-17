import axios from "axios";
import HDate from "hebcal/src/hdate";
import React, { useEffect } from "react";
import { useState } from "react";
import { apiUrl } from '../config.json';
import Day from "./common/date";




function Week() {
    const [days, setDays] = useState([{ date: new Date() }]);
    const [defaultDate] = useState(new Date());
    const [date, chooseDate] = useState(new Date());
    const [days_in_week] = useState(['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']);

    const setTheDays = async () => {

        const newDate = new Date()
        let dates = []
        for (let i = 0; i < 28; i++) {
            let dayInWeek = new Date();
            dayInWeek.setDate(defaultDate.getDate() - defaultDate.getDay() + i)
            let style = {
                backgroundColor: 'white',
                color: 'black',
                border: 'solid',
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: '0',
                zIndex: 0,
                position: 'relative'

            }
            let dStyle = {
                backgroundColor: 'blue',
                color: 'white',
                border: 'solid',
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: '0',
                zIndex: 1,
                position: 'relative'

            }


            if (dayInWeek.getDate() === date.getDate()) {
                dates.push({
                    date: new Date(dayInWeek.getFullYear(), dayInWeek.getMonth(), dayInWeek.getDate()),
                    style: dStyle,
                    id: i,
                    d: ''
                });
                if (i === 21) {

                    dates[i].style.borderBottomRightRadius = 10
                }
                if (i === 27) {

                    dates[i].style.borderBottomLeftRadius = 10
                }
            }
            else {
                dates.push({
                    date: new Date(dayInWeek.getFullYear(), dayInWeek.getMonth(), dayInWeek.getDate()),
                    style: style,
                    id: i,
                    d: 'none'
                });
                if (i === 21) {

                    dates[i].style.borderBottomRightRadius = 10
                }
                if (i === 27) {

                    dates[i].style.borderBottomLeftRadius = 10
                }
            }
        }
        console.log(dates);
        setDays(dates);
    }


    const handleResize = () => {
        days.map(day => {
            if (document.getElementById(`d${days.indexOf(day)}`) && document.getElementById(`b1-${days.indexOf(day)}`)) {
                document.getElementById(`d${days.indexOf(day)}`).style.height = `${document.getElementById(`d${days.indexOf(day)}`).getBoundingClientRect().width}px`;

                document.getElementById(`b1-${days.indexOf(day)}`).style.fontSize = `${1 / 7 * document.getElementById(`d${days.indexOf(day)}`).getBoundingClientRect().width}px`

                document.getElementById(`b-${days.indexOf(day)}`).style.fontSize = `${1 / 7 * document.getElementById(`d${days.indexOf(day)}`).getBoundingClientRect().width}px`
            }
            // 552.7083740234375

        })
        days_in_week.map(day => {

            if (document.getElementById(`id_b_header${days_in_week.indexOf(day)}`))
        
            {
                document.getElementById(`id_b_header${days_in_week.indexOf(day)}`).style.fontSize = `${document.getElementById('id_calendar').getBoundingClientRect().width/552.7083740234375*16}px`
            }
        });

    }

    useEffect(() => {
        setTheDays();
    }, [])

    useEffect(() => {
        window.addEventListener('load', handleResize);
        window.addEventListener('resize', handleResize);
    })


    useEffect(() => {
        handleResize()

    }, [days])

    return (
        <React.Fragment>
            <div id="id_calendar" className="container col-10 col-sm-9 col-md-8 col-lg-7 px-0 py-5 my-5" style={{}}>
                <div className="row bg-primary p-2"></div>
                <div className="row bg-dark text-light">
                    {days_in_week.map(day =>

                        <div style={{ width: `${1 / 7 * 100}%` }} key={days_in_week.indexOf(day)}>
                            <b id={`id_b_header${days_in_week.indexOf(day)}`}>{day}</b>
                        </div>
                    )}
                </div>
                <div className="row">
                    {days.map(day =>

                        <Day
                            days={days}
                            key={days.indexOf(day)}
                            day={day.date}
                            date={date}
                            style={day.style}
                            id={day.id}
                            d={day.d}
                            chooseDate={(date) => chooseDate(date)}
                            setTheDays={setTheDays}
                        />)}

                </div>
            </div>
        </React.Fragment>
    )





}

export default Week