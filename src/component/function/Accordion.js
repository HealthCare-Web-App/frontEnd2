import React from 'react';
import Count from './Count';

const Del = (e) => {
    const parent = e.target.closest('.list-btn');
    parent.parentElement.remove();


    //삭제
    // async function postData() {
    //     try {
    //     const response = await axios.post('url주소',{
    //         username: "devstone",
    //         password: "12345"
    //     });
    //         console.log(response);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
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
                {searchResults.map(item => <Question key={item.id} tit={item.tit} subTit={item.subTit} count={item.count} />)}
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
            <div className='list-div'>
                <input type="text" 
                    className="main-tit"
                    defaultValue={props.tit} readOnly/>
                <input type="text" 
                    className="sub-tit"
                    defaultValue={props.subTit} readOnly/>

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