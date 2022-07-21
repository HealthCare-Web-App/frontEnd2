import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Posts({posts,limit,page,setPage,offset}) {
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
        {posts.slice(offset,offset+limit).map(({id,title,userId})=>(
        <tr key={id}>
          <td>{id}</td>
          <td  onClick={()=>goRouteId(id)}>{title}</td>
          <td>{userId}</td>
          <td>아직</td>
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
    background: #42444e;
    color: #fff;
    text-align: left;
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