import HDate from "hebcal/src/hdate";
import React, { useEffect, useState } from "react";
import Day from "./day";
import { getJewishDate } from "jewish-dates-core";

function Calendar({ defaultDate, date, chooseDate, open, height, fontSizeDate, spanFontSizeDate }) {

    const [monthDays, setMonthDays] = useState()
    const [defaultValue, setDefaultValue] = useState(new Date(defaultDate.getFullYear(), defaultDate.getMonth(), 1));
    const [endMonth, setEndMonth] = useState(new Date(defaultValue.getFullYear(), defaultValue.getMonth() + 1, 0));
    const [days, setDays] = useState([])
    const [months] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])
    const [days_in_month_31] = useState(['January', 'March', 'May', 'July', 'August', 'October', 'December']);
    const [days_in_month_30] = useState(['April', 'June', 'September', 'November'])
    const [days_in_week] = useState(['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'])
    const [hebMonths, setHebMonths] = useState(['', 'ניסן', 'אייר', 'סיוון', 'תמוז', 'אב', 'אלול', 'תשרי', 'חשוון', 'כסלו', 'טבת', 'שבט', 'אדר'])
    const [month, setMonth] = useState(months[defaultDate.getMonth()]);
    const [style, setStyle] = useState({
        position: 'relative',
        top: -8,
        left: -15
    });

    const setTheStyle = () => {
        if (document.getElementById('id_x')) {
            setStyle({
                position: 'relative',
                top: `${-6}px`,
                left: `${-12 * document.getElementById('id_calendar').getBoundingClientRect().width / 586.6666870117188}px`,
                float: 'left'
            })
        }
    }

    const setMonthLeapYear = () => {
        const year = new HDate(defaultValue).getFullYear();
        if (year % 19 === 3 || year % 19 === 6 || year % 19 === 8 || year % 19 === 11 || year % 19 === 14 || year % 19 === 17 || year % 19 === 0) {
            setHebMonths(['', 'ניסן', 'אייר', 'סיוון', 'תמוז', 'אב', 'אלול', 'תשרי', 'חשוון', 'כסלו', 'טבת', 'שבט', "אדר א'", "אדר ב'"])
        }
        else setHebMonths(['', 'ניסן', 'אייר', 'סיוון', 'תמוז', 'אב', 'אלול', 'תשרי', 'חשוון', 'כסלו', 'טבת', 'שבט', 'אדר'])
    }

    const setDaysInMonth = () => {
        if (days_in_month_31.includes(months[defaultValue.getMonth()])) {
            return (31);
        }
        else if (days_in_month_30.includes(months[defaultValue.getMonth()])) {
            return (30);
        }
        else if (date.getFullYear % 4 === 0) {
            return (29)
        }
        else {
            return (28)
        }
    }

    const setTheDays = () => {
        const daysInMonth = setDaysInMonth();
        let myDays = [];
        let day = new Date();
        let count = 0;
        day.setFullYear(defaultValue.getFullYear());
        day.setMonth(defaultValue.getMonth());
        day.setDate(1);
        if (day.getDay() === 5 && daysInMonth === 31 || day.getDay() === 6 && daysInMonth > 29) {
            for (let i = 0; i < 42; i++) {
                let newDate = new Date(day.getFullYear(), day.getMonth(), day.getDate() - day.getDay() + i)
                const hebDate = new HDate(newDate)
                console.log(hebDate);
                let event = ''
                if (hebDate.holidays()[0]) {

                    event = hebDate.holidays()[0].desc[2]
                }
                else if (newDate.getDay() === 6) {
                    event = 'שבת'
                }
                else { event = 'יום חול' }
                myDays.push({
                    date: newDate,
                    class: doDisable(newDate),
                    id: count,
                    hebDate: hebDate,
                    event: event,
                    onClick: doDisabled(newDate)

                });
                count++
            }
        }
        else {
            for (let i = 0; i < 35; i++) {
                let newDate = new Date(day.getFullYear(), day.getMonth(), day.getDate() - day.getDay() + i)
                const hebDate = new HDate(newDate)
                let event = ''
                if (hebDate.holidays()[0]) {
                    event = hebDate.holidays()[0].desc[2]
                }
                else if (newDate.getDay() === 6) {
                    event = 'שבת'
                }
                else { event = 'יום חול' }
                myDays.push({
                    date: newDate,
                    class: doDisable(newDate),
                    id: count,
                    hebDate: hebDate,
                    event: event,
                    onClick: doDisabled(newDate)
                });
                count++
            }
        }
        setDays(myDays)
    }

    const doDisable = (day) => {
        if (day.getMonth() !== defaultValue.getMonth()) {
            return 'm-0 p-0 border border-dark border-5 btn-light opacity-25 text-secondary'
        }
        else if (day.getDate() === date.getDate() && day.getMonth() === date.getMonth()) {
            return 'm-0 p-0 border border-dark border-5 btn-primary opacity-100 text-light'
        }
        else {
            return 'm-0 p-0 border border-dark border-5 btn-light opacity-100'
        }
    }

    const doDisabled = (day) => {
        if (day.getMonth() !== defaultValue.getMonth()) {
            return (day) => null
        }
        else return onClickDate
    }

    const onClickDate = (day) => {
        date.setFullYear(day.getFullYear())
        date.setMonth(day.getMonth())
        date.setDate(day.getDate())
        chooseDate(day)
        setTheDays()
    }

    const handleResize = () => {
        if (document.getElementById('id_h2')) {
            document.getElementById('id_h2').style.fontSize = `${document.getElementById('id_div_h2').getBoundingClientRect().width / 25}px`
            document.getElementById('id_heb_h2').style.fontSize = `${document.getElementById('id_div_h2').getBoundingClientRect().width / 25}px`
            document.getElementById('nav_head').style.alignItems = 'center'
        }
    }

    const setTheHebMonths = () => {
        if (HDate(defaultValue).getMonth() === HDate(endMonth).getMonth()) {
            return [hebMonths[HDate(defaultValue).getMonth()]]
        }
        else return `${hebMonths[HDate(defaultValue).getMonth()]}-${hebMonths[HDate(endMonth).getMonth()]}`
    }

    const closeComponent = () => {
        document.getElementById('id_calendar').className = 'close d-none'
    }

    const nextMonth = () => {
        defaultDate.setMonth(defaultDate.getMonth() + 1)
        defaultDate.setDate(1)
        defaultValue.setMonth(defaultDate.getMonth())
        defaultValue.setDate(1)
        endMonth.setDate(1)
        endMonth.setMonth(defaultValue.getMonth + 1)
        endMonth.setDate(0)
        setDefaultValue(defaultDate)
        setEndMonth(new Date(defaultValue.getFullYear(), defaultValue.getMonth() + 1, 0));
        setTheDays()
        setMonth(months[defaultDate.getMonth()])
    }

    const prevMonth = () => {
        endMonth.setDate(0);
        setEndMonth(new Date(defaultValue.getFullYear(), defaultValue.getMonth(), 0))
        defaultDate.setMonth(defaultDate.getMonth() - 1)
        defaultDate.setDate(1)
        defaultValue.setMonth(defaultDate.getMonth())
        defaultValue.setDate(1)
        setDefaultValue(defaultDate)
        setTheDays()
        setMonth(months[defaultDate.getMonth()])
    }

    useEffect(() => {
        setTheDays()
        window.addEventListener('load', handleResize)
        window.addEventListener('load', setTheStyle)
    }, [monthDays, open])

    useEffect(() => {
        if (!style) {
            setTheStyle()
        }
        window.addEventListener('resize', handleResize)
        window.addEventListener('resize', setTheStyle)
    })

    useEffect(() => {
        handleResize()
        setMonthLeapYear()
        setTheStyle()
    }, [days, date, open])

    if (days) {
        return (
            <div className="container d-none" id="id_calendar">
                <div className="pt-0 d-block col-12  text-center mx-auto row row-cols-7 justify-content-center mx-0">
                    <nav className="bg-primary d-block p-0 border rounded rounded-5 border-3 col-12">
                        <div id="nav_head" className="pt-0 mt-0 d-flex align-items-center col-12">
                            <span className="pt-0 mt-0 float-left d-inline text-left justify-content-center col-1">
                                <button onClick={() => {
                                    prevMonth()
                                }} className="btn pt-0 mt-0 btn-muted carousel-control-next text-dark" type="button">{`<`}</button>
                                <button onClick={() => {
                                    nextMonth()
                                }} className="pt-0 mt-0 carousel-control-prev text-dark" type="button">{`>`}</button>
                            </span>
                            <div className="col-10" id="id_div_h2">
                                <h2 id="id_heb_h2" className="float-right ml-auto mt-2 py-0 pr-4">{setTheHebMonths()}</h2>
                                <h2 id="id_h2" className="float-left mr-auto mt-2 py-0 pl-4">{month}</h2>
                            </div>
                            <button onClick={() => {
                                closeComponent()
                            }} type="button" id="id_x" style={style} className="btn p-0 btn-muted  mr-auto mb-auto ml-0 mt-0 btn-close text-secondary" aria-label="Close"><h4>x</h4></button>
                        </div>
                        <div className="col-12 opacity-25 bg-dark text-light p-0 m-0 rounded rounde-5 border d-flex border-3 border-dark">{days_in_week.map(day => {
                            return (<div key={days_in_week.indexOf(day)} id={`h5_${days_in_week.indexOf(day)}`} style={{ width: `${1 / 7 * 100}%` }} className='border border-secondary border-5'>
                                <h6 className="text-center foo" >{day}</h6>
                            </div>
                            )
                        })}</div>
                    </nav>
                    <div className="d-flex flex-wrap overflow-hidden">
                        {days.map(day =>
                            <Day
                                key={day.id}
                                id={day.id}
                                day={day.date}
                                date={date}
                                hebDate={day.hebDate}
                                event={day.event}
                                onClickDate={day.onClick}
                                _class={day.class}
                                defaultValue={defaultValue}
                                days={days}
                                dis={day.disabled}
                                height={height}
                                fontSize={fontSizeDate}
                                spanSize={spanFontSizeDate}
                            />)}
                    </div>
                </div>

            </div>
        )
    }
    else return null
}

export default Calendar