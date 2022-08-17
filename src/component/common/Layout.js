import React from "react";
import styled from "styled-components";
import {Link,useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";

const LayoutStyle = styled.div`
    position:relative;
    width: 428px;
    padding-bottom:80px;
    margin:0 auto;
    border: 1px solid #dee4f1;
    height: calc(100vh - 80px);
    margin-bottom: 50px;
    
    input {
        font-family: "Poppins", sans-serif;
        font-size: 15px;
        font-weight: 400;
        border: none;
        box-shadow: 0px 5px 13px 0px #dee4f1;
        border-radius: 10px;
        margin:0 20px;
        width: 358px;
        padding:15px;
    }

    input:focus , input:hover{
        outline: none;
        box-shadow: 0 0 0 1.5px #dee4f1, 0px 5px 13px 0px #dee4f1;
    }

    .wrapper{
        padding:0 20px;
    }
    
    header{
        font-size:32px;
        padding:20px;
        text-align:center;
    }

    .btm-menu{
        position: fixed;
        bottom:0;
        width:428px;
        height: 80px;
        background-color: #dee4f1;
        display: flex;
        align-items: center;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        justify-content: space-between;
    }

    .btm-menu > div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 33.333%;
        height: 80px;
        border-right: 1px solid #fff;
    }

    .btm-menu a{
        display: flex;
        flex-direction: column;
        text-decoration: none;
        align-items: center;
        color:#333;
        font-weight : 600;
        font-family: 'Noto Sans KR', sans-serif;
    }

    .btm-menu span{
        margin-bottom:10px;
    }

    .btm-menu .material-symbols-outlined {
        font-variation-settings:
        'FILL' 1,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
    }

    .btm-menu > div:last-child{
        border-right: none;
    }
`

const Layout = ({children})=>{

    const [removeCookie]=useCookies(['id'])
    const navigate=useNavigate()
    const logOut=()=>{
        removeCookie('id')
        navigate('/login')
    }

    
    return(
        <>
        <LayoutStyle>
        <header>
            헬스기록헤더로고
        </header>
            {children}
            <div className="btm-menu">
                <div className="go-write">
                    <Link to="/board">
                        <span className="material-symbols-outlined">grid_view</span>
                        게시판
                    </Link>
                </div>
                <div className="go-main">
                    <Link to="/">
                        <span className="material-symbols-outlined">home</span> 
                        메인
                    </Link>
                </div>
                <Link to="/login">
                    <span className="material-symbols-outlined">account_circle</span>
                    내 정보
                    <button onClick={logOut}>logOut</button>
                </Link>
            </div>
        </LayoutStyle>
        </>
    )
}

export default Layout