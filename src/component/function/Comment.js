import axios from "axios"
import { useState } from "react"
import styled from "styled-components"

const Comment=({id})=>{
    const [contents,setContent]=useState({
        commentId:'',
        comment:''
    })


    const onChange =(e)=>{
        const {name,value}=e.target
        setContent({
            ...contents,
            [name]:value
        })
    }
    const onPost=()=>{
        axios.post(`/board/${id}`,{
            commentId:[{
                userId:contents.commentId,
                content:contents.comment
            }]
        })
    }
    return(
        <>
            <CommentWrap>
                <div className="PostComment">
                    <div className="abc">
                        <input placeholder="작성자" name="userId" onChange={onChange}/>
                        <textarea placeholder="댓글입력" name="comment" onChange={onChange}/>
                    </div>
                    <button onClick={onPost}>등록하기</button>
                </div>

                <div className='commentUl'>
                    <div className="commentLi">
                        <div>작성자</div>
                        <div>댓글내용</div>
                    </div>
                    <div className="commentLi">
                        <div>작성자</div>
                        <div>댓글내용</div>
                    </div>
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