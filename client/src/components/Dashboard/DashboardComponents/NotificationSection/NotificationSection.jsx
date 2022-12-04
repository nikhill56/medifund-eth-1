import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../../../redux/actions/auth'
import { getFundraisers } from '../../../../redux/actions/blockchain'
import '../../../../styles/DashboardStyles/NotificationSection.scss'
import DashboardNavbar from '../DashboardNavbar/DashboardNavbar'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertTitle, Grid } from '@mui/material'
function NotificationSection() {

  const dispatch = useDispatch()

  const userId = sessionStorage.getItem("userId")
  console.log(userId)
  // const myFundraisers = allFundraisers && allFundraisers.filter(x => x.userId === userId)
  const navigate = useNavigate()
  useEffect(() => {

    dispatch(getFundraisers())
    dispatch(getProfile(userId, navigate))

  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const allFundraisers = useSelector(state => state.blockchain.allFundraisers)
  const userData = useSelector(state => state.auth.userProfile)

  return (
    <div>
      <DashboardNavbar />
      <div className='notificationContainer'>
        <Grid container className="notificationGrid">
          {userData ? (
            <>
{
    userData && userData.data.user.notifications.map((no, i) => (
      <Grid item xs={12} key={i}>
        <Alert severity="info" className='notificationAlert'>
          <AlertTitle>Info</AlertTitle>
          This is an info alert — <strong>check it out!</strong>
        </Alert>
      </Grid>
    ))
}
            </>
          ) : (
            <>
        
            </>
          )}
          

        </Grid>

      </div>


    </div>
  )
}

export default NotificationSection