import React, { useEffect } from 'react'
import {DashboardNavbar,FundraisersPool,HealthBulletin} from '.'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getFundraisers } from '../../redux/actions/blockchain'
import { MyFundraisers, MyFundraisersView, NewFundraiser, NotificationSection, ViewFundraiser } from '../../globals';
function Dashboard() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getFundraisers())
},[])// eslint-disable-line react-hooks/exhaustive-deps 
const location = useLocation()
  return (
    <div>
     
      {/* <HealthBulletin/> */}
      {
        location.pathname==='/dashboard'&&(
          <>
           <DashboardNavbar/>
           <FundraisersPool/>
          </>
        
        )
      }
     
      
        <Routes>
        <Route path='/newFundraiser' element={<NewFundraiser/>}/>
        <Route path="/viewFundraiser/:id/:mid" element={<ViewFundraiser/>}/>
        <Route path='/notifications' element={<NotificationSection/>}/>
        <Route path='/myFundraisers' element={<MyFundraisers/>}/>
        <Route path='/myFundraisers/:id/:mid' element={<MyFundraisersView/>}/>
        </Routes>
      
    </div>
  )
}

export default Dashboard