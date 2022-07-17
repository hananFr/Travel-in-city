
import React, { useEffect, useState } from "react";



function Day({id, day, defaultValue, onClickDate, _class, height, hebDate, event, spanSize, fontSize}) {
    
    const [widthToBtn] = useState(`${1 / 7 * 100}%`)
    const [days_array] =useState(['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'י"א', 'י"ב', 'י"ג', 'י"ד', 'ט"ו', 'ט"ז', 'י"ז', 'י"ח', 'י"ט', 'כ', 'כ"א', 'כ"ב', 'כ"ג', 'כ"ד', 'כ"ה', 'כ"ו', 'כ"ז', 'כ"ח', 'כ"ט', "ל"])
   
    
    return (

        <div style={{height:height, width:widthToBtn, fontSize:fontSize, display:'inline-grid'}} id={id} onClick={() => {
            onClickDate(day)
        }} className={_class}>
            <div className="align-self-start">
                <b className="foo float-left py-0" id={`b${id}`}>{day.getDate()}</b>

                <p id={`p${id}`} className="foo float-right py-0">{days_array[hebDate.day - 1]}</p>
            </div>
            <span style={{fontSize:spanSize, display:'block'}} id={`span${id}`} className='justify-content-end align-item-start'>{event}</span>
        </div>

    )
}
export default Day