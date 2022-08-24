import React,{ useEffect,useState} from "react";
import { useParams } from "react-router";
import {useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from "axios";
import styled from "styled-components";
import Comment from "../function/Comment";

const View = ()=>{
    const navigate = useNavigate()
    const [cookies]=useCookies(['id'])
    const {id}=useParams()
    const [onPatch,setonPatch]=useState(true)
    const [contents,setContents]=useState({
        title:'',
        patchTitle:'',
        content:'',
        patchContent:'',
        nickname:'',
    })
    
    const onRemove=async(id)=>{
        await axios.delete(`/board/${id}`)
        navigate('/board')
    }
        
    useEffect(()=>{
        const viewNow=async()=>{
            const response = await axios.get(`/board/${id}`)
            setContents({
                title:response.data.title,
                userId:response.data.userId,
                content:response.data.content,
                nickname:response.data.nickname,
            })
        }
        viewNow()
    },[id])

    
    const onChange = (e)=>{
        const {name,value}=e.target
        setContents({...contents,
            [name]:value
        }
        )
    }
    const reNew=async()=>{
        await axios.patch(`/board/${id}`,{
            content:contents.patchContent,
            title:contents.patchTitle
        })
        navigate('/board')
    }
   
    const toggle=(boolean)=>{
        setonPatch(!onPatch)
        if(boolean===true)
        {}
        else{
            setContents({...contents,
                patchContent:contents.content,
                patchTitle:contents.title
            })
        }
    }
    return(
        <>
            {contents.userId===Number(cookies.id)?
            (onPatch)?
            <>
            <Styless>
                <header>
                    <div className="headers">
                        <div className="title">{contents.title}</div>
                        <div className="writer">작성자:{contents.nickname}</div>
                    </div>
                    <div className="buttons">
                        <button onClick={()=>{onRemove(id)}}>삭제</button>
                        <button onClick={()=>toggle(true)}>수정</button>
                    </div>
                </header>
                <div className="body">{contents.content}</div>
            </Styless>
            </>
            :
            <>
                <Styless>
                    <header>
                        <div className="headers">
                            <input className="title" placeholder={contents.title} value={contents.patchTitle} onChange={onChange} name='patchTitle'/>
                            <span className="writer">작성자:{contents.nickname}</span>
                        </div>
                        <div className="buttons">
                            <button onClick={()=>toggle(false)}>취소</button>
                            <button onClick={reNew}>완료</button>
                        </div>
                    </header>
                    <Body>
                    <textarea cols='50' rows='10' placeholder={contents.content} value={contents.patchContent} onChange={onChange} name='patchContent'></textarea>
                    </Body>
                </Styless>
            </>:
            <>
            <Styless>
                <header>
                    <div className="title">{contents.title}</div>
                    <div className="writer">작성자:{contents.nickname}</div>
                </header>
                <div className="body">{contents.content}</div>
            </Styless>
            </>
            }    
        
        <Comment y={id}/>
        </>
    )
}


const Styless=styled.div`
    header{
        display:flex;
        justify-content:space-between;
        .headers{
            display:flex;
        }
    }
    .title{
        font-size:20px;
        width:200px;
    }
    .writer{
        font-size:14px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .buttons{
        button{
            border:none;
            border-radius: 8px;
            cursor: pointer;
            background-color:#fe6229;
            color: white;
            width: 50px;
            height: 30px;
            margin:0 1px;
        }
    }
    .body{
        height:40vh;
        width:100%;
        border:1px solid black;
    }

`

const Body=styled.div`
    border:1px solid black;
    padding:10px;
    height:40vh;
    word-break:break-all;
    word-wrap:break-word;
    textarea{
        border:none;
        width:100%;
        height:100%;
    }
`

export default View