import React, { useState , useRef , useEffect} from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from "axios";

import StopWatch from '../function/StopWatch.js';
import List from '../function/Accordion';
import Layout from '../common/Layout';

export const todayDate = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1 > 9 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
    let todayDate = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();

    return todayYear + todayMonth + todayDate;
}

const MainPage=()=>{
    const [questions , setQuestions] = useState([]);

    useEffect(()=>{
        const url = "https://jsonplaceholder.typicode.com/photos";

        axios.get(url , {date : todayDate()})
        .then((res) => {
            //setQuestions(res.data);
        })
        .catch(function(error){
            console.log('실패');
        })
    }, []);

    const [date, setDate] = useState();
    const nextId = useRef(questions.length);

    const onCreate = () => {
        const question = {
            exerciseLogIn : nextId.current,
            content: '',
            detailLog:'',
            number: '0'
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

            obj.exerciseLogIn = i;
            obj.content   = item.querySelector('.main-tit').value;
            obj.detailLog = item.querySelector('.sub-tit').value;
            obj.number    = item.querySelector('.ex-count').value;

            listArr.push(obj);

            i++
        });

        return listArr;
    }

    const saveList = () => {
        const time = document.querySelectorAll('.digits')[0].innerText
                    + document.querySelectorAll('.digits')[1].innerText;
        
        const param = {
            "date" :  document.getElementById('date').value,
            "time" :  time, 
            "list" :  getValue()
        }

        console.log(param)
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
                        <input type="hidden" id="date" value={moment(date).format("YYYYMMDD")} ></input>
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