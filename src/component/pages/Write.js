import React,{useState,useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import Layout from '../common/Layout';
import axios from 'axios';
import styled from 'styled-components'
import Editor from '../function/Editor';


const Write = ()=>{
    let navigate = useNavigate()
    const [content,setContent]=useState({
      userId:null,
      id:null,
      title:'',
      body:''
    })
    const [len, setLen] = useState(0);

    const getValue=(e)=>{
      const {name,value}=e.target
      setContent({
        ...content,
        [name]:value
      })
    }

    const countLen=async()=>{
      try{
          const response = await axios.get("http://localhost:4000/posts")
          setLen(response.data.length)
      }
      catch(error){
          console.error(error)
      }
    }

    const uploadPost=()=>{
      axios.post("http://localhost:4000/posts",{
        userId :content.userId,
        id:len+1,
        body:content.body.replace(/(<([^>]+)>)/ig,""),
        title:content.title
      }
      )
      setLen(len=>len+=1)
      navigate('/board')
    }

    useEffect(()=>{
      countLen()
    }, []);

    return(<>
        <Layout>
        <FormWrapper>
            <Editor getValue={getValue} content={content} setContent={setContent} />
            <button className = "submit-button" onClick={uploadPost}>글쓰기</button>
        </FormWrapper>
        </Layout>
</>)
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

export default Write