import React, { useState , useRef , useEffect} from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from "axios";

import StopWatch from '../function/StopWatch.js';
import List from '../function/Accordion';
import Layout from '../common/Layout';

const MainPage=()=>{
    
    
    const [questions , setQuestions] = useState([
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
    ]);

    const [date, setDate] = useState();
    const nextId = useRef(5);

    const onCreate = () => {
        const question = {
            id: nextId.current,
            tit: '',
            subTit:'',
            count: '0'
        }

        setQuestions([...questions , question]);
        nextId.current += 1;
    }

    const getValue = () => {
        const list = document.querySelectorAll('.list > div');
        var i = 1;
        var listArr = [];
        
        list.forEach((item) => {
            var obj = new Object();

            obj.id = i;
            obj.tit = item.querySelector('.main-tit').value;
            obj.subTit = item.querySelector('.sub-tit').value;
            obj.count = item.querySelector('.ex-count').value;

            listArr.push(obj);

            i++
        });

        return listArr;
    }

    const saveList = () => {
        const param = {
            "date" :  document.getElementById('date').value,
            "time" :  date, 
            "list" :  getValue()
        }

        console.log(param);
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
                        <input type="hidden" id="date" value={moment(date).format("YYYY년 MM월 DD일")} ></input>
                        <StopWatch />
                    </div>
                </div>

                <div id="Accorion">
                    <button type="button" className="add-list" onClick={onCreate}>
                        추가하기
                        <span className="material-symbols-outlined">playlist_add</span>
                    </button>    
                    <List data={questions}/>
                </div>

                <button type="button" className="save-list" onClick={saveList}>저장하기</button>                
            </div>
        </Layout>
        </>
    )
}

export default MainPage;