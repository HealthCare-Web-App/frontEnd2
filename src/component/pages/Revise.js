import React,{ useEffect,useState} from "react";
import { useParams } from "react-router";
import {useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from 'styled-components'
import Editor from "../function/Editor";
import Layout from "../common/Layout";

const Revise=()=>{
    let navigate = useNavigate()
        const {id}=useParams()
        const [content,setContent]=useState({
            body:'',
            title:''
        })
    
    const chchange=(e)=>{
        const {name,value}=e.target
        setContent({
            ...content,
            [name]:value
        })
    }

    useEffect(()=>{
        const viewNow=async()=>{
            const response = await axios.get(`http://localhost:4000/posts/${id}`)
            setContent({
                body:response.data.body,
                title:response.data.title,}
            )
        }
        viewNow()
    },[id])

    const reWrite=()=>{
        axios.patch(`http://localhost:4000/posts/${id}`,{
            body:content.body.replace(/(<([^>]+)>)/ig,""),
            title:content.title,
            userId:content.userId
        })
        navigate('/board')
    }
   
    return(
        <>
        <Layout>
            <FormWrapper>
                <Editor getValue={chchange} content={content} setContent={setContent} />
                <button className = "submit-button" onClick={reWrite}>수정</button>
            </FormWrapper>
        </Layout>
        </>
    )
}

const FormWrapper=styled.div`
    width: 100%;
    margin: 0 auto;
  
  .submit-button {
    width: 100px;
    height: 50px;
    font-size: 20px;
    padding: 20px;
    border: none;
    background: indianred;
    border-radius: 5px;
    margin-top: 40px;
    vertical-align: middle;
  }
  
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 300px;
  }
`


export default Revise