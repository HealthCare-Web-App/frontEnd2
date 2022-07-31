import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import {Routes, Route } from 'react-router-dom';

import MainPage from './component/pages/MainPage';
import Board from './component/pages/Board';
import Write from './component/pages/Write';
import View from './component/pages/View';
import Login from './component/pages/Login';
import Revise from './component/pages/Revise';
import  SignUp from './component/pages/SignUp';
import './index.css';



const GlobalStyles = createGlobalStyle`
    ${reset};
`;

function App() {


  return (
    <>
      <GlobalStyles/>
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/board" element={<Board/>}></Route>
        <Route path="/board/:id" element={<View/>}></Route>
        <Route path="/board/:id/revise" element={<Revise/>}></Route>
        <Route path="/write" element={<Write/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/SignUp" element={<SignUp/>}></Route>
      </Routes>
      
    </>

    
  );
}

export default App;
