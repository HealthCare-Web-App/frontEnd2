import axios from "axios"
import { useState } from "react"
import styled from "styled-components"

const Comment=({id})=>{
    const [content,setContent]=useState({
        commentId:'',
        comment:''
    })


    const onChange =(e)=>{
        const {name,value}=e.target
        setContent({
            ...content,
            [name]:value
        })
    }
    const onPost=()=>{
        console.log(content)
        axios.patch(`http://localhost:4000/posts/${id}`,{
            comments:[{
                id:content.commentId,
                comment:content.comment
            }
            ]
        
        })
    }
    return(
        <>
            <CommentWrap>
                <div className="abc">
                    <input placeholder="작성자" name="commentId" onChange={onChange}/>
                    <textarea placeholder="댓글입력" name="comment" onChange={onChange}/>
                </div>
                <button onClick={onPost}>등록하기</button>
            </CommentWrap>

        </>
    )
}

const CommentWrap=styled.div`
position:absolute;
display:flex;
width:100%;
margin-top: 5px;
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
`

export default Comment