import React,{ useEffect,useState,useCallback} from "react";
import axios from "axios"
import styled from "styled-components"

const Comment=({id})=>{
    const [contents,setContent]=useState({
        commentId:'',
        content:'',
        userNickname:'',
    })
    

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
    }

    const loadComments= useCallback( async()=>{
        const response = await axios.get(`/board/${id}`)
        const commentDtoList = response.data.commentDtoList
        console.log(commentDtoList)
        setCmList([commentDtoList,...cmList])
    },[cmList,id])

    useEffect(()=>{
        loadComments()
    },[loadComments])

    const aaa = (x)=>{
        axios.delete(`/board/${id}/${x}`)
        loadComments()
    }
    
    const bbb = (x)=>{
        axios.patch(`/board/${id}/${x}`,{
            content:'수정댓글'
        })
    }

    return(
        <>
            <CommentWrap>
                <div className="PostComment">
                    <div className="abc">
                        <input placeholder="작성자" name="userNickname" onChange={onChange}/>
                        <textarea placeholder="댓글입력" name="content" onChange={onChange}/>
                    </div>
                    <button onClick={onPost}>등록하기</button>
                </div>

                <div className='commentUl'>
                    {cmList.map(({id,commentId,content})=>(
                        <div key={id} className="commentLi">
                            <div>{commentId}</div>
                            <div>{content}</div>
                            <button onClick={()=>aaa(id)}>삭제</button>
                            <button onClick={()=>bbb(id)}>수정</button>
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
.commnetLi{
    border:1px solid black;
}
`

export default Comment