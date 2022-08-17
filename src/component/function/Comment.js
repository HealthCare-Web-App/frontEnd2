import React,{ useState} from "react";
import axios from "axios"
import styled from "styled-components"
import { useCookies } from 'react-cookie';

const Comment=({y})=>{
    const [contents,setContent]=useState({
        content:'',
    })

    const [cookies]=useCookies('id')

    const [cmList,setCmList]=useState([])


    const onChange =(e)=>{
        const {name,value}=e.target
        setContent({
            ...contents,
            [name]:value
        })
    }
    const onPost=()=>{
     //   console.log(`/board/${id}`);
        axios.post(`/board/${y}`,{
            userId:cookies.id,
            content:contents.content
        })
    }

    const loadComments= async()=>{
        const response = await axios.get(`/board/${y}`)
        const commentDtoList = response.data.commentDtosList
        setCmList(commentDtoList)
        console.log(cmList)
    }


    const aaa = (x)=>{
        axios.delete(`/board/${y}/${x}`)
        loadComments()
    }
    
    const bbb = (x)=>{
        axios.patch(`/board/${y}/${x}`,{
            content:'수정댓글'
        })
    }


    return(
        <>
            <CommentWrap>
                <div className="PostComment">
                    <div className="abc">
                        <textarea placeholder="댓글입력" name="content" onChange={onChange}/>
                    </div>
                    <button onClick={onPost}>등록하기</button>
                </div>
                <button onClick={loadComments}>댓글보기</button>
                <div className='commentUl'>
                    {cmList.map(({id,userId,content})=>(
                        <div key={id} className="commentLi">
                            <div className="commentContents">
                                <div>작성자:{userId}</div>
                                <div>내용:{content}</div>
                            </div>
                        {userId===Number(cookies.id)?
                            <div>
                                <button onClick={()=>aaa(id)}><span>삭제</span></button>
                                <button onClick={()=>bbb(id)}><span>수정</span></button>
                            </div>:<></>}
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
    display:flex;
    justify-content: space-between;
    button{
        color: black;
        background:none;
        width:30px;
        border:none;
    }
}
`

export default Comment