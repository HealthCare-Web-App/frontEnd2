import React from 'react';
import Count from './Count';

function List(props) {    
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const handleSearchChange = e => {
        setSearchTerm(e.target.value);
    };
    
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
            <div className='list-div' id={props.id}>
                <input type="text" 
                    className="main-tit"
                    defaultValue={props.tit}/>
                <input type="text" 
                    className="sub-tit"
                    defaultValue={props.subTit}/>

                <Count count={props.count}/>
            </div>
        </div>
    )
}

export default List;