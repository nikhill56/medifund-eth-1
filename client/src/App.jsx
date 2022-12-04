
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard,Signin,Signup,PageNotFound,Landing,Faq} from './globals';
import './App.scss';
import BlockchainProvider from './blockchain';
function App() {

  return (
    <>
    
    <BlockchainProvider/>
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/dashboard/*' element={<Dashboard/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/> 
        <Route path='*' element={<PageNotFound/>}/> 
        {/* <Route path='/faq' element={<Faq/>}/> */}
      </Routes> 
    </Router>
    </>
  ) 
}

export default App
