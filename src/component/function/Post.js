import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Posts({posts,limit,offset}) {
  const navigate = useNavigate()
  const goRouteId=(id)=>{
    navigate(`/board/${id}`)
  }
  
  return (
    <>
    <Wrap>
      <Link to="/write">
        <button>작성</button>
      </Link>
      <Table>
        <thead>
        <th>번호</th>
        <th>제목</th>
        <th>작성자</th>
        <th>작성일</th>
        </thead>
        <tbody>
        {posts.slice(offset,offset+limit).map((key,value)=>(
            <tr key = {value+1}>
              <td>{value+1}</td>
              <td  onClick={()=>goRouteId(key.id)}>{key.title}</td>
             <td>{key.user.nickname}</td>
             <td>{key.createDate.split('T')[0]}</td>
            </tr>
          ))}
        </tbody>
        </Table>
    </Wrap>    
    </>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  }
`;

const Table = styled.table`
  border-collapse:separate;
  border-spacing:0;
  width:100%;
  
  th,
  td {
    padding: 6px 15px;
  }
  th {
    background: #dee4f1;
    color: #000;
    text-align: center;
    font-weight : 600;
    font-family: 'Noto Sans KR', sans-serif;
  }
  td {
    border-right: 1px solid #c6c9cc;
    border-bottom: 1px solid #c6c9cc;
  }
  td:first-child {
    border-left: 1px solid #c6c9cc;
  }
  td:nth-child(2){
    &:hover{
      cursor:pointer;
    }
  }
  tr:nth-child(even) td {
    background: #eaeaed;
  }
`

export default Posts;