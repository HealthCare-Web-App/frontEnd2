import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";
import StopWatch from "../function/StopWatch.js";
import List from "../function/Accordion";
import Layout from "../common/Layout";

export const dateFormat = (date) => {
  return moment(date).format("YYYYMMDD");
};

const MainPage = () => {
  const [questions, setQuestions] = useState([]);
  const [date, setDate] = useState();
  const [cookies] = useCookies("id");
  let id = cookies.id;

  useEffect(() => {
    axios.get(`/calendar/${dateFormat(date)}/${id}`).then((res) => {
      setQuestions("");
      setQuestions(res.data);
    });
  }, [date]);

  const nextId = useRef(questions.length + 1);

  const onCreate = () => {
    const question = {
      exerciseLogId: nextId.current,
      content: "",
      detailLog: "",
      number: "0",
    };

    setQuestions([...questions, question]);
    nextId.current += 1;
  };

  const getValue = () => {
    const list = document.querySelectorAll(".list > div");
    var listArr = [];

    list.forEach((item) => {
      var obj = new Object();

      obj.exerciseLogId = item.id;
      obj.content = item.querySelector(".main-tit").value;
      obj.detailLog = item.querySelector(".sub-tit").value;
      obj.number = item.querySelector(".ex-count").value;

      listArr.push(obj);
    });

    return listArr;
  };

  const saveList = () => {
    const time =
      document.querySelectorAll(".digits")[0].innerText +
      document.querySelectorAll(".digits")[1].innerText;

    const param = {
      userId: id,
      date: document.getElementById("date").value,
      time: time,
      list: getValue(),
    };
    axios.post(`/calendar/${dateFormat(date)}`, param).then((res) => {
      alert("저장되었습니다.");
      window.location.reload();
    });
  };

  return (
    <>
      <Layout>
        <Main>
          <div className="container">
            <div className="wrapper">
              <Calendar
                onChange={setDate}
                value={date}
                formatDay={(locale, date) =>
                  date.toLocaleString("en", { day: "numeric" })
                }
              />

              <div className="today-wrap">
                <input
                  type="hidden"
                  id="date"
                  value={moment(date).format("YYYYMMDD")}
                ></input>
                <StopWatch />
              </div>
            </div>

            <div id="Accorion">
              <button type="button" className="add-list" onClick={onCreate}>
                추가하기
                <span className="material-symbols-outlined">playlist_add</span>
              </button>
              <List data={questions} />
            </div>

            <button type="button" className="save-list" onClick={saveList}>
              저장하기
            </button>
          </div>
        </Main>
      </Layout>
    </>
  );
};

const Main = styled.div`
  .today-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0 40px;
  }

  button.add-list {
    background-color: #dee4f1;
    color: #333;
    border: none;
    display: inline-block;
    padding: 10px 20px 10px 45px;
    border-radius: 10px;
    box-shadow: 0 0 0 1.5px #dee4f1, 0px 5px 13px 0px #dee4f1;
    text-decoration: none;
    font-weight: 600;
    transition: 0.25s;
    position: relative;
    float: right;
    margin: 0 20px 10px;
  }

  button.add-list > span {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
  }

  button.save-list {
    background-color: #fe6229;
    color: #fff;
    border: none;
    display: block;
    padding: 10px 20px;
    border-radius: 10px;
    box-shadow: 0 0 0 1.5px #dee4f1, 0px 5px 13px 0px #dee4f1;
    text-decoration: none;
    font-weight: 600;
    transition: 0.25s;
    width: 115px;
    margin: 30px auto 0;
  }
`;
export default MainPage;
