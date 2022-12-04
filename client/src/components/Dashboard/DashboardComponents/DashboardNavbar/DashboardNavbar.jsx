import React, { useEffect } from 'react'
import '../../../../styles/DashboardStyles/DashboardNavbar.scss'
import { Grid, AppBar, Button, Toolbar, Avatar, Chip, useTheme, useMediaQuery, Badge } from '@mui/material'
import logo from '../../../../assets/logos/medifundsmall.png'
import merlin from '../../../../assets/logos/Merlin.jpeg'
import { useWeb3Modal } from '@web3modal/react'
import {useAccount,useDisconnect} from 'wagmi'
 
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useLocation } from 'react-router-dom'
import {getProfile, userSignOut} from '../../../../redux/actions/auth'
// import profileDefault from '../../../../assets/landing/tipogram-logo-2.png'


import DashboardDrawer from './DashboardDrawer'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getFundraisers } from '../../../../redux/actions/blockchain'

function DashboardNavbar() {
  const location = useLocation()
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const userId = sessionStorage.getItem("userId")
  const handleUserSignOut=()=>{
      dispatch(userSignOut(navigate));
  }
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { open } = useWeb3Modal()
  const { isConnected,address } = useAccount()
  const {disconnect} = useDisconnect()
  const connectHandler = async () => {
    if (isConnected) {
      disconnect()
    }
    else {
      open()
    }
  }
  useEffect(() => {

    dispatch(getFundraisers())
    dispatch(getProfile(userId, navigate))

  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const allFundraisers = useSelector(state => state.blockchain.allFundraisers)
  const userData = useSelector(state => state.auth.userProfile)

  return (
    <div className="">
      <Grid container>

        <Grid item xs={12}>
          <AppBar position="static" className="dashboardNavbar">
            <Toolbar>
              {
                isMobile ? (
                  <DashboardDrawer />
                ) : (
                  <>
                    <div className="dashboardNavbarLogoBox">
                      <img src={logo} alt="logo" className="dashboardNavbarLogo" />
                    </div>
                    <div className="dashboardNavbarLarge">

                      {
                        location.pathname !== '/dashboard' && (
                          <a href='/dashboard' className='navigatingLink'><Button size="large" className="dashboardNavbarItems">
                            Dashboard
                          </Button></a>
                        )
                      }
                      <a href='/dashboard/newFundraiser' className='navigatingLink'><Button size="large" className={`dashboardNavbarItems ${location.pathname === '/newFundraiser' && "dashboardNavbarItemsActive"}`}>
                        New Fundraiser
                      </Button></a>
                      <a href='/dashboard/myFundraisers' className='navigatingLink'><Button size="large" className={`dashboardNavbarItems ${location.pathname === '/myFundraisers' && "dashboardNavbarItemsActive"}`}>
                        My Fundraisers
                      </Button></a>
                      <a className='navigatingLink' href=''><Chip
                        avatar={<Avatar alt="Metamask" src={userData&&userData.data.user.profileImg} />}
                        label={`${address.slice(0,5)}...`}
                        variant="outlined"
                        className="dashboardNavbarChip"
                      /></a>
                      <a className='navigatingLink' href='/dashboard/notifications'>
                        <Badge badgeContent={1} color="error">
                          <NotificationsIcon color="action" className='dashboardNavbarNotification' />
                        </Badge>
                      </a>
                      <Button onClick={connectHandler} size="large" className="dashboardNavbarItemsButton">
                        {isConnected ? "disconnect" : "connect wallet"}
                      </Button>
                      <a href='/signin' className='navigatingLink' onClick={handleUserSignOut}><Button size="large" className="dashboardNavbarItemsButton">
                        Sign out
                      </Button></a>


                    </div>
                  </>
                )
              }

            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    </div>
  )
}

export default DashboardNavbar