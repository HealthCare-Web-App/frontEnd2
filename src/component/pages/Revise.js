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
        const [contents,setContents]=useState({
            content:'',
            title:''
        })
    
    const chchange=(e)=>{
        const {name,value}=e.target
        setContents({
            ...contents,
            [name]:value
        })
    }

    useEffect(()=>{
        const viewNow=async()=>{
            const response = await axios.get(`/board/${id}`)
            setContents({
                content:response.data.body,
                title:response.data.title,}
            )
        }
        viewNow()
    },[id])

    const reWrite=()=>{
        axios.patch(`/api/posts/${id}`,{
            content:contents.body.replace(/(<([^>]+)>)/ig,""),
            title:contents.title,
            userId:contents.userId
        })
        navigate('/board')
    }
   
    return(
        <>
        <Layout>
            <FormWrapper>
                <Editor getValue={chchange} contents={contents} setContent={setContents} />
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