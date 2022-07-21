import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import StopWatch from '../function/StopWatch.js';
import List from '../function/Accordion';
import Layout from '../common/Layout'
const questions = [
    {
        id: 1,
        tit: '운동1',
        subTit:'100kg',
        count: '15'
    },
    {
        id: 2,
        tit: '운동2',
        subTit:'15m',
        count: '200'
    },
    {
        id: 3,
        tit: '운동3',
        subTit:'1kg',
        count: '100'
    },
    {
        id: 4,
        tit: '운동4',
        subTit:'50kg',
        count: '5'
    }
]

const MainPage=()=>{
    const [date, setDate] = useState();

    const onAddDetailDiv = (item) => {
        console.log(item )
    }

    return(
        <>
        <Layout>
            <div className="container">
                <div className="wrapper">
                    <Calendar 
                        onChange={setDate} 
                        value={date} 
                        formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}/>

                    <div className="today-wrap">
                        {/* <p>{moment(date).format("YYYY년 MM월 DD일")}</p> */}
                        <StopWatch />
                    </div>
                </div>

                <div id="Accorion">
                    <button type="button" className="add-list" onClick={onAddDetailDiv}>
                        추가하기
                        <span className="material-symbols-outlined">
                            playlist_add
                        </span>
                    </button>    
                    <List data={questions}/>
                </div>

                <button type="button">저장하기</button>
                
                
            </div>
        </Layout>
        </>
    )
}

export default MainPage;