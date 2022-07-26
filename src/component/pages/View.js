import React,{ useEffect,useState} from "react";
import { useParams } from "react-router";
import {useNavigate } from 'react-router-dom';
import Layout from '../common/Layout';
import Comment from "../function/Comment";
import axios from "axios";
import styled from "styled-components";

const View = ()=>{
        let navigate = useNavigate()
        const {id}=useParams()
        const [contents,setContents]=useState({
            userId:'',
            body:'',
            title:''
        })
    
        const onRemove=(id)=>{
            axios.delete(`/board/${id}`)
            navigate('/board')
        }
        
    useEffect(()=>{
        const viewNow=async()=>{
            const response = await axios.get(`/board/${id}`)
            setContents({
                userId:response.data.userId,
                content:response.data.body,
                title:response.data.title,}
            )
            
        }
        viewNow()
    },[id])

    const goRevise=()=>{
        navigate(`/board/${id}/revise`)
    }
    const onChange = (e)=>{
        const {name,value}=e.target
        setContents({...contents,
            [name]:value
        }
        )
    }
    const reNew=()=>{
        axios.patch(`/api/${id}`,{
            body:contents.body,
            title:contents.title,
            userId:contents.userId
        })
        navigate('/board')
    }
   


    return(
        <>
        <Layout>
            <Title>
                <input placeholder="이름" value={contents.title} onChange={onChange} name='title'/>
                <input placeholder="작성자" value={contents.userId} onChange={onChange} name='userId'/> 
                <button onClick={goRevise}>수정하러</button>
                <button onClick={()=>{onRemove(id)}}>삭제</button>
                <button onClick={reNew}>여기서수정</button>
            </Title>
            <Body>
                <textarea cols='50' rows='10' placeholder="내용" value={contents.body} onChange={onChange} name='body'></textarea>
            </Body>
            <Comment id={id}/>

        </Layout>
        </>
    )
}
const Title=styled.div`
    display:flex;
    text-align:center;
    input{
        width:20%;
        border:none;
    }
    button{
        width:20%;
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