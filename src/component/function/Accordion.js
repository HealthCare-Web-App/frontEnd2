import React from 'react';
import Count from './Count';
import styled from "styled-components";
import axios from "axios";

const Del = (e) => {
    const parent = e.target.closest('.list-btn');

    //삭제
    axios.delete(`/canlendar/${parent.parentElement.id}`)
    .then((res) => {
        alert('삭제되었습니다.');
        parent.parentElement.remove();
    })
}

const Edit = (e) => {
    const parent = e.target.closest('.list-btn');
    e.target.innerText = '완료';

    parent.parentElement.querySelectorAll('input')
        .forEach(function(ele){
            ele.readOnly = false;
            ele.style.border='1px solid red';
        });
    
    parent.classList.remove('slide');
    parent.previousElementSibling.classList.remove('slide');

    e.target.onclick = (e) => EditConfirm(e);
}

const EditConfirm = (e) => {
    const parent = e.target.closest('.list-btn');
    e.target.innerText = '수정';

    parent.parentElement.querySelectorAll('input')
        .forEach(function(ele){
            ele.readOnly = true;
            ele.style.border='1px solid blue';
        });

    //수정
    axios.patch(`/canlendar/${parent.parentElement.id}`)
    .then((res) => {
        alert('수정되었습니다.');
        parent.classList.remove('slide');
        parent.previousElementSibling.classList.remove('slide');

        e.target.onclick = (e) => Edit(e);
    })
}

function List(props) {    
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const handleSearchChange = e => {
        setSearchTerm(e.target.value);
    };

    React.useEffect(() => {
        const results = props.data;
        setSearchResults(results);
    }, [props]);
    
    React.useEffect(() => {
        console.log(props.data)
        const results = props.data.filter(item =>
            item.content.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm]);
    
    return (    
        <div>
            <Searchbar onSearchChange={handleSearchChange}/> 
            <Content>
                <section className='list'>
                    {searchResults.map(item => <Question key={item.exerciseLogIn} id={item.exerciseLogIn} tit={item.content} subTit={item.detailLog} count={item.number} />)}
                </section>   
            </Content>
        </div>
    )
}

const Searchbar = props => {
    const [value, setValue] = React.useState('')
    const handleChange = (e) => {
        setValue(e.target.value)
        props.onSearchChange(e)
    }
    return(
        <input className='searchbar' type='text' placeholder='찾으시는 운동을 입력해주세요.' onChange={handleChange} value={value}/>       
    )
}

const Question = props => {
    return(
        <div className="list-wrapper" id={props.id}>
            <div className='list-div'>
                <input type="text" 
                    className="main-tit"
                    defaultValue={props.tit} readOnly={props.tit !== '' ? true : false}/>
                <input type="text" 
                    className="sub-tit"
                    defaultValue={props.subTit} readOnly={props.tit !== '' ? true : false}/>

                <Count count={props.count}/>
            </div>
            <div className='list-btn'>
                <button className='edit-btn' type="button" onClick={(e) => Edit(e)}>수정</button>
                <button className='del-btn' type="button" onClick={(e) => Del(e)}>삭제</button>
            </div> 
        </div>
    )
}

const Content=styled.div`
    section {
        margin-top:20px;
    }

    .list-wrapper {
        border-bottom: 1px solid #dee4f1;
        margin: 0 auto;
        padding: 20px;
        overflow: hidden;
        position: relative;
    }
    
    .list-div{
        font-size: 1rem;
        font-weight: 500;
        color: #212943;
        display: flex;
        justify-content: space-between;
        width: 100%;
        transition: 0.25s;
    }

    .list-div.slide{
        transform: translateX(-150px);
    }

    input.main-tit{
        width:90px;
        padding:10px;
        margin:0;
    }
    
    input.sub-tit{
        width:50px;
        padding:10px;
        text-align: center;
        margin:0;
    }
    
    .list-btn{
        height: 100%;
        width: 150px;
        position: absolute;
        top:0;
        right: -100%;
        transition: 0.25s;
    }
    
    .list-btn.slide{
        right:0;
    }
    
    .list-btn button{
        height: 100%;
        width: 50%;
        border: none;
        color:#fff
    }
    
    .list-btn .edit-btn{
        background-color: #6F7680;
    }
    
    .list-btn .del-btn{
        background-color: #FE6229;
    }
`

export default List;