import React, { useState, useEffect } from "react";
import styled from "styled-components";

function StopWatch(props) {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    console.log(props); // ["00" , "00"]

    // const a = ["00", "00"];
    setMin(props[0]);
    setSec(props[1]);
  }, [props]);

  useEffect(() => {
    let interval1 = null;
    let interval2 = null;

    if (start) {
      interval1 = setInterval(() => {
        setSec((prevTime) => Number(prevTime) + 1);
      }, 1000);

      interval2 = setInterval(() => {
        setMin((prevTime) => Number(prevTime) + 1);
      }, 60000);
    } else {
      clearInterval(interval1);
      clearInterval(interval2);
    }

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [start]);

  return (
    <Body>
      <div className="stop-watch">
        <Timer>
          <div className="timer">
            <span className="digits min">
              {("0" + Math.floor(min % 60)).slice(-2)}:
              {/* {("0" + Math.floor((min / 60000) % 60)).slice(-2)}: */}
            </span>
            <span className="digits sec">
              {("0" + Math.floor(sec % 60)).slice(-2)}
              {/* {("0" + Math.floor((sec / 1000) % 60)).slice(-2)} */}
            </span>
          </div>
        </Timer>

        <Button>
          <div className="btn-wrap">
            <div className="watch-btn">
              <span
                className="material-symbols-outlined"
                onClick={() => setStart(true)}
              >
                play_circle
              </span>
            </div>

            <div className="watch-btn">
              <span
                className="material-symbols-outlined"
                onClick={() => setStart(false)}
              >
                pause_circle
              </span>
            </div>

            <div className="watch-btn">
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  setMin(0);
                  setSec(0);
                  setStart(false);
                }}
              >
                stop_circle
              </span>
            </div>
          </div>
        </Button>
      </div>
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Timer = styled.span`
  font-family: "Poppins", sans-serif;
  font-size: 40px;
  color: #333;
`;

const Button = styled.div`
  .btn-wrap {
    display: flex;
    margin-top: 10px;
    width: 100%;
    justify-content: space-evenly;
  }

  .watch-btn {
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .watch-btn:last-child {
    margin-right: 0;
  }

  span {
    display: inline-block;
    font-size: 30px;
  }
`;

export default StopWatch;
