import React,{ useState,useEffect} from "react";
import axios from "axios"
import styled from "styled-components"
import { useCookies } from 'react-cookie';

const Comment=({y})=>{
    const [contents,setContent]=useState({
        content:'',
        patchContent:''
    })
    const [cookies]=useCookies('id')
    const [cmList,setCmList]=useState([])
    const [toggle,setToggle]=useState(0)

    const onChange =(e)=>{
        const {name,value}=e.target
        setContent({
            ...contents,
            [name]:value
        })
    }
    const onPost=async ()=>{
     //   console.log(`/board/${id}`);
        await axios.post(`/board/${y}`,{
            userId:cookies.id,
            content:contents.content
        })
        setContent({...contents,
            content:''})
        loadComments()
    }


    const loadComments= async()=>{
        try{
            const response = await axios.get(`/board/${y}`)
            const commentDtoList = response.data.commentDtosList
            setCmList(commentDtoList)
        }
        catch(error){
            console.error(error)
        }
    }

    const aaa = async(x)=>{
        await axios.delete(`/board/${y}/${x}`)
        loadComments()
    }
    
    const bbb = (x)=>{
        setToggle(x)
    }
    
    const ccc = async(x)=>{
        await axios.patch(`/board/${y}/${x}`,{
            content:contents.patchContent
        })
        setToggle(0)
        loadComments()
    }

    useEffect(()=>{
        loadComments()
      },)
    
    return(
        <>
            <CommentWrap>
                <div className="PostComment">
                    <div className="abc">
                        <textarea placeholder="댓글입력" value={contents.content} name="content" onChange={onChange}/>
                    </div>
                    <button onClick={onPost}>등록하기</button>
                </div>
                <div className='commentUl'>
                    {cmList.map(({id,nickname,userId,content})=>(
                        <div key={id} className="commentLi">
                            <div className="commentContents">
                                <div>작성자:{nickname}</div>
                                {toggle!==id?
                                <div>내용:{content}</div>:<input className="kim" placeholder={content} onChange={onChange} name="patchContent"></input>}    
                                
                            </div>
                            {userId===Number(cookies.id)?
                            <div>
                                {toggle!==id?
                                <>
                                    <button onClick={()=>bbb(id)}><span>수정</span></button>
                                    <button onClick={()=>aaa(id)}><span>삭제</span></button>
                                </>
                                :<>
                                    <button onClick={()=>bbb(0)}><span>x</span></button>
                                    <button onClick={()=>ccc(id)}><span>완료</span></button>
                                </>
                                }
                            </div>
                            :<></>}
                        </div>
                    ))}
                </div>
            </CommentWrap>

        </>
    )
}

const CommentWrap=styled.div`
position:absolute;
width:100%;
margin-top: 5px;
.PostComment{
    display:flex;
}
.abc{
    display:flex;
    width:80%;
    flex-direction:column;
    textarea{
        height:60px;
    }
}
button{
    width:20%;
}
.commentLi{
    border:1px solid black;
    display:flex;
    justify-content: space-between;
    button{
        color: black;
        background:none;
        width:30px;
        border:none;
    }
}
.kim{
    width:50px;
}
`

export default Comment