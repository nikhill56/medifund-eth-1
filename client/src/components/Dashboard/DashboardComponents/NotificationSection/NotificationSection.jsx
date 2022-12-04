import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../../../redux/actions/auth'
import { getFundraisers } from '../../../../redux/actions/blockchain'
import '../../../../styles/DashboardStyles/NotificationSection.scss'
import DashboardNavbar from '../DashboardNavbar/DashboardNavbar'
import {useNavigate} from 'react-router-dom'
function NotificationSection() {

  const dispatch = useDispatch()
  
  const userId = sessionStorage.getItem("userId")
  console.log(userId)
  // const myFundraisers = allFundraisers && allFundraisers.filter(x => x.userId === userId)
const navigate=useNavigate()
  useEffect(() => {

      dispatch(getFundraisers())
      dispatch(getProfile(userId,navigate))

  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const allFundraisers = useSelector(state => state.blockchain.allFundraisers)
  const userData=useSelector(state=>state.auth.getProfile)
  console.log(userData)
  return (
    <div>
      <DashboardNavbar/>
      
    </div>
  )
}

export default NotificationSection