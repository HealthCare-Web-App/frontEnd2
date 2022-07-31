import React from 'react';
import Count from './Count';

const Del = (e) => {
    const parent = e.target.closest('.list-wrapper');
    // parent.parentElement.remove();

    const id = "";

    console.log(parent)
    // axios.delete(` ${id}`)
    // .then((res) => {
    //     alert('삭제되었습니다.');
    // })
    // .catch(function(error){
    //     console.log('실패');
    // })
}

const Edit = (e) => {
    const parent = e.target.closest('.list-btn');

    parent.parentElement.querySelectorAll('input')
        .forEach((ele) => ele.readOnly = false);
    
    parent.classList.remove('slide');
    parent.previousElementSibling.classList.remove('slide');
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
        const results = props.data.filter(item =>
            item.tit.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm]);
    
    return (    
        <div>
            <Searchbar onSearchChange={handleSearchChange}/> 
            <section className='list'>
                {searchResults.map(item => <Question key={item.exerciseLogId} tit={item.exerciseLogId} subTit={item.detailLog} count={item.number} />)}
            </section>   
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
        <div className="list-wrapper">
            <input type="hidden" value={props.tit}></input>
            <div className='list-div'>
                <input type="text" 
                    className="main-tit"
                    defaultValue={props.tit} readOnly={props.tit != null ? false : true}/>
                <input type="text" 
                    className="sub-tit"
                    defaultValue={props.subTit} readOnly={props.subTit != null ? false : true}/>

                <Count count={props.count}/>
            </div>
            <div className='list-btn'>
                <button className='edit-btn' type="button" onClick={(e) => Edit(e)}>수정</button>
                <button className='del-btn' type="button" onClick={(e) => Del(e)}>삭제</button>
            </div> 
        </div>
    )
}

export default List;