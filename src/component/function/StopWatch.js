import React, { useState , useEffect } from "react";
import styled from "styled-components";

function StopWatch() {
    const [time, setTime] = useState(0);
    const [start , setStart] = useState(false);

    useEffect(() => {
        let interval = null;

        if (start) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [start]);

    return (
        <Body>
            <div className="stop-watch">
                <Timer>
                    <div className="timer">
                        <span className="digits">
                            {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                        </span>
                        <span className="digits">
                            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                        </span>
                    </div>
                </Timer>

                <Button>
                    <div className="btn-wrap">
                        <div className="watch-btn">
                            <span className="material-symbols-outlined" onClick={() => setStart(true)}>
                                play_circle
                            </span>
                        </div>

                        <div className="watch-btn">
                            <span className="material-symbols-outlined" onClick={() => setStart(false)}>
                                pause_circle
                            </span>
                        </div>

                        <div className="watch-btn">
                            <span className="material-symbols-outlined" onClick={() => {setTime(0); setStart(false);}}>
                                stop_circle
                            </span>
                        </div>
                    </div>
                </Button>
            </div>
        </Body>
    );
}

const Body=styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`

const Timer=styled.span`
    font-family: "Poppins", sans-serif;
    font-size: 40px;
    color: #333;
`

const Button=styled.div`
    .btn-wrap{
        display: flex;
        margin-top: 10px;
        width: 100%;
        justify-content: space-evenly;
    }

    .watch-btn{
        cursor: pointer;
        width:30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .watch-btn:last-child{
        margin-right: 0;
    }

    span{
        display: inline-block;
        font-size: 30px;
    }
`

export default StopWatch;