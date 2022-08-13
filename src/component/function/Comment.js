import React,{ useState} from "react";
import axios from "axios"
import styled from "styled-components"

const Comment=({y})=>{
    const [contents,setContent]=useState({
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
                        <input placeholder="작성자" name="userNickname" onChange={onChange}/>
                        <textarea placeholder="댓글입력" name="content" onChange={onChange}/>
                    </div>
                    <button onClick={onPost}>등록하기</button>
                </div>
                <button onClick={loadComments}>댓글보기</button>
                <div className='commentUl'>
                    {cmList.map(({id,userNickname,content})=>(
                        <div key={id} className="commentLi">
                            <div className="commentContents">
                                <div>{userNickname}</div>
                                <div>{content}</div>
                            </div>
                            <button onClick={()=>aaa(id)}>삭제</button>
                            <button onClick={()=>bbb(id)}>수정</button>
                        </div>
                    ))}
                    <div className="commentLi">
                        <div>ss</div>
                        <div>rsaf</div>
                        <button onClick={()=>aaa()}>삭제</button>
                        <button onClick={()=>bbb()}>수정</button>
                    </div>
                    <div className="commentLi">
                        <div className="commentContents">
                            <div>ss</div>
                            <div>r</div>
                        </div>
                        <button onClick={()=>aaa()}>삭제</button>
                        <button onClick={()=>bbb()}>수정</button>
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
.commentLi{
    display:flex;
    button{

        background-color:black;
        color: #fff;
        border:none;
    }
}
`

export default Comment