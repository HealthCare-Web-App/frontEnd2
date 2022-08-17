import axios from "axios"
import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Layout from '../common/Layout';
import styled from "styled-components";

const Login = ()=>{

    const navigate = useNavigate()
    const [contents,setContents]=useState({
        userId:'',
        userPassword:'',
    })

    const [cookies,setCookie]=useCookies(['id'])

    const onChange = (e)=>{
        const {name,value}=e.target
        setContents({...contents,
            [name]:value
        }
    )}

    const goLogin=()=>{
        if(contents.userId===''||contents.userPassword===''){
            window.alert('아이디와 비밀번호를 입력해주세요')
        }
        axios.post('/login',{
            loginId:contents.userId,
            pw:contents.userPassword,
        }).then((res)=>{
            console.log(res.data)
            setCookie('id',res.data.userId)
            console.log(cookies.isLogin)
            navigate('/')
        })
        .catch((e)=>{
            console.error(e)
            alert('아이디와 비밀번호가일치하지않습니다.')
        })
    }

    if (!cookies.id){
        return(
            <>
            <Layout>
            <Log>
                로그인완료상태
            </Log>
            </Layout>
            </>
        )
    }
    else{
        return(
            <>
            <Layout>
                <Log>
                <p>LogIn</p>
                    <input placeholder="아이디를 입력해주세요." onChange={onChange} name='userId'/>
                    <input placeholder="비밀번호를 입력해주세요." onChange={onChange} name='userPassword'/> 
                    <Link to='/SignUp'>회원가입</Link>   
                    <button onClick={goLogin}>로그인</button>                    
                </Log>
            </Layout>
            </>

        )
    }
    
}

const Log=styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    height: calc(100% - 152px);


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

    a{
        display: block;
        float: right;
        text-decoration : none;
        text-align: right;
        padding: 0 20px 0 0;
        width:100%;
        font-weight:600;
        font-family: 'Noto Sans KR', sans-serif;
        color:#333;
    }

    button {
        background-color: #dee4f1;
        color: #333;
        border: none;
        display: inline-block;
        padding: 10px 50px;
        border-radius: 10px;
        box-shadow: 0 0 0 1.5px #dee4f1, 0px 5px 13px 0px #dee4f1;
        text-decoration: none;
        font-weight: 600;
        transition: 0.25s;
        position: relative;
        margin: 30px auto 0;
    }
`

export default Login