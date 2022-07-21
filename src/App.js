import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import {Routes, Route } from 'react-router-dom';

import MainPage from './component/pages/MainPage';
import Board from './component/pages/Board';
import Write from './component/pages/Write';
import View from './component/pages/View';
import Revise from './component/pages/Revise';
import './index.css';
/**
 * */
import React, {useEffect, useState} from 'react';
import axios from 'axios';


const GlobalStyles = createGlobalStyle`
    ${reset};
`;

function App() {

    const [hello, setHello] = useState([])

    useEffect(() => {
        axios.get('/board')
            .then(response => {console.log(response.data)})
            .catch(error => console.log(error))
    }, []);

  return (
    <>
      <GlobalStyles/>
        <div>
            백엔드에서 가져온 데이터입니다 : {hello}
        </div>
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/board" element={<Board/>}></Route>
        <Route path="/board/:id" element={<View/>}></Route>
        <Route path="/board/:id/revise" element={<Revise/>}></Route>
        <Route path="/write" element={<Write/>}></Route>
      </Routes>
      
    </>

    
  );
}

export default App;
