import axios from "axios"
import React,{useState} from "react";
import {useNavigate } from 'react-router-dom';
import styled from "styled-components";

const SignUp=()=>{
    const navigate=useNavigate()
    const [contents,setContents]=useState({
        loginId:'',
        pw:'',
        nickname:'',
    })

    const onChange = (e)=>{
        const {name,value}=e.target
        setContents({...contents,
            [name]:value
        }
    )}

    const goSignUp=()=>{
        axios.post(`/users`,{
            loginId:contents.loginId,
            pw:contents.pw,
            nickname:contents.nickname,
        })
        .then(()=>{
            navigate('/login')
        })
        .catch((e)=>{
            alert(e.response.data)
            return
        })
        
    }

    


    return(
        <>
            <Sign>
                <p>Join Us</p>
                <input placeholder="닉네임을 입력해주세요." onChange={onChange} name='nickname'/>
                <input placeholder="아이디를 입력해주세요." onChange={onChange} name='loginId'/>
                <input placeholder="비밀번호를 입력해주세요." onChange={onChange} name='pw'/> 

                <div className="btn-area">
                    <button onClick={goSignUp} className="signUp">회원가입</button>
                </div>
            </Sign>
        </>
    )
}

const Sign=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //height: calc(100% - 152px);

    p {
        font-family: "Poppins", sans-serif;
        font-size: 30px;
        font-weight: 700;
        text-align:center;
        margin:40px 0;
        width:100%;
    }

    input{
        margin-bottom:20px;
    }

    .btn-area{
        display:flex;
        justify-content: center;
    }

    button {
        color: #333;
        border: none;
        display: inline-block;
        padding: 10px 30px;
        border-radius: 10px;
        box-shadow: 0 0 0 1.5px #dee4f1, 0px 5px 13px 0px #dee4f1;
        text-decoration: none;
        font-weight: 600;
        transition: 0.25s;
        position: relative;
        margin:30px 0 0 0;
    }

    button.signUp{
        background-color: #dee4f1;
    }

    button.editUser{
        background-color: #FE6229;
        color:#fff;
        margin-left:20px;
    }
`

export default SignUp