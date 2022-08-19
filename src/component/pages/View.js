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
        content:'',
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
            content:contents.content,
            title:contents.title
        })
        navigate('/board')
    }
   
    const toggle=()=>{
        setonPatch(!onPatch)
        console.log(onPatch)
    }
    return(
        <>
            {contents.userId===Number(cookies.id)?
            (onPatch)?
            <>
            <Styless>
                <header>
                <div className="title">{contents.title}</div>
                <div className="writer">작성자:{contents.nickname}</div>
                <button onClick={()=>{onRemove(id)}}>삭제</button>
                <button onClick={toggle}>수정</button>
                </header>
                <div className="body">{contents.content}</div>
            </Styless>
            </>
            :
            <>
                <input placeholder="제목" value={contents.title} onChange={onChange} name='title'/>
                <span>작성자:{contents.nickname}</span>
                <button onClick={toggle}>수정취소</button>
                <button onClick={reNew}>수정완료</button>
                <Body>
                <textarea cols='50' rows='10' placeholder="내용" value={contents.content} onChange={onChange} name='content'></textarea>
                </Body>
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
    
            {/* <>
                <Title>
            <input placeholder="제목" value={contents.title} onChange={onChange} name='title'/>
            <span>작성자:{contents.nickname}</span>
            {contents.userId===Number(cookies.id)?
                <>
                    <button onClick={()=>{onRemove(id)}}>삭제</button>
                    <button onClick={reNew}>수정</button>
                    <button onClick={toggle}></button>
                </>:''}
            </Title>
            <Body>
                <textarea cols='50' rows='10' placeholder="내용" value={contents.content} onChange={onChange} name='content'></textarea>
            </Body>           
            </> */}
        
        <Comment y={id}/>
        </>
    )
}
// const Title=styled.div`
//     display:flex;
//     text-align:center;
//     input{
//         width:20%;
//         border:none;
//     }
//     button{
//         width:20%;
//     }
// `

const Styless=styled.div`
    header{
        display:flex;
    }
    .title{
        font-size:20px;
    }
    .writer{
        font-size:14px;
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
    height:50vh;
    word-break:break-all;
    word-wrap:break-word;
    textarea{
        border:none;
        width:100%;
        height:100%;
    }
`

export default View