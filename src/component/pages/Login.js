import axios from "axios"
import React,{useState} from "react";
import { Link } from "react-router-dom";
const Login = ()=>{

    const [contents,setContents]=useState({
        userId:'',
        userPassword:'',
    })

    const onChange = (e)=>{
        const {name,value}=e.target
        setContents({...contents,
            [name]:value
        }
    )}

    const goLogin=()=>{
        axios.post(`/`)
    }

    

    return(
        <>
            <input placeholder="id" onChange={onChange} name='userId'/>
            <input placeholder="password" onChange={onChange} name='userPassword'/> 
            <button onClick={goLogin}>로그인</button>
            <Link to='/SignUp'>회원가입</Link>   
        </>
    )
}


export default Login