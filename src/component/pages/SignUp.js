import axios from "axios"
import React,{useState} from "react";

const SignUp=()=>{

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
    }

    const patchUser=()=>{
        axios.patch(`/users`,{
            userId:contents.userId,
            nickname:contents.nickname
        })
    }


    return(
        <>
            <input placeholder="닉네임" onChange={onChange} name='nickname'/>
            <input placeholder="id" onChange={onChange} name='loginId'/>
            <input placeholder="password" onChange={onChange} name='pw'/> 
            <button onClick={goSignUp}>로그인하기</button>
            <button onClick={patchUser}>유저정보 수정</button>
        </>
    )
}

export default SignUp