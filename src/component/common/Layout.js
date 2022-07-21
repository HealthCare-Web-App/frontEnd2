import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const LayoutStyle=styled.div`
    position:relative;
    width: 428px;
    height: 100vh;
    margin:0 auto;
    border: 1px solid #dee4f1;
    
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

.btm-menu > div::before{
    content: '';
    display: inline-block;
    width:42px;
    height: 42px;
    border: 1px solid #000;
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

.btm-menu > div:last-child{
    border-right: none;
}
`

const Layout = ({children})=>{
    return(
        <>
        <LayoutStyle>
        <header>
            헬스기록헤더로고
        </header>
            {children}
            <div className="btm-menu">
                <div className="go-write"><Link to="/board">게시판</Link></div>
                <div className="go-main"><Link to="/">메인</Link></div>
                <div className="go-user"><Link to="/">내 정보</Link></div>
            </div>
        </LayoutStyle>
        </>
    )
}

export default Layout