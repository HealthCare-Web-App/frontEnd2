import styled from 'styled-components'

function Pagination({total,limit,page,setPage}){
    const numPages = Math.ceil(total/limit);
    
    return(
        <>
        <Nav>
            <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
            &lt;
            </Button>
            {Array(numPages)
            .fill()
            .map((_, i) => (
                <Button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                aria-current={page === i + 1 ? "page" : null}
                >
                {i + 1}
                </Button>
            ))}
            <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
            &gt;
            </Button>
        </Nav>
        </>
    )
}

const Nav = styled.nav`
  position:fixed;
  display: flex;
  bottom:80px;
  transform:translateX(-50%);
  left:50%;
  gap: 4px;
  margin: 16px auto;
  
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: #dfbd85;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #dfbd85;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;