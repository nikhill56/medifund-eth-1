import React from 'react'
import '../../../../styles/DashboardStyles/DashboardNavbar.scss'
import { Grid, AppBar, Button, Toolbar, Avatar, Chip, useTheme, useMediaQuery, Badge } from '@mui/material'
import logo from '../../../../assets/logos/cbutelogo.png'
import merlin from '../../../../assets/logos/Merlin.jpeg'
import { useWeb3Modal } from '@web3modal/react'
import {useAccount,useDisconnect} from 'wagmi'

// import {useNavigate} from 'react-router-dom'
// import {useDispatch} from 'react-redux'
import { useLocation } from 'react-router-dom'
// import {userSignOut} from '../../../../redux/action/auth'
// import profileDefault from '../../../../assets/landing/tipogram-logo-2.png'


import DashboardDrawer from './DashboardDrawer'
import NotificationsIcon from '@mui/icons-material/Notifications';
function DashboardNavbar() {
  const location = useLocation()
  // const dispatch = useDispatch();
  // const navigate=useNavigate()

  // const handleUserSignOut=()=>{
  //     dispatch(userSignOut(navigate));
  // }
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { open } = useWeb3Modal()
  const { isConnected } = useAccount()
  const {disconnect} = useDisconnect()
  const connectHandler = async () => {
    if (isConnected) {
      disconnect()
    }
    else {
      open()
    }
  }
 

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
                        location.pathname !== '/' && (
                          <a href='/' className='navigatingLink'><Button size="large" className="dashboardNavbarItems">
                            Dashboard
                          </Button></a>
                        )
                      }
                      <a href='/newFundraiser' className='navigatingLink'><Button size="large" className={`dashboardNavbarItems ${location.pathname === '/newFundraiser' && "dashboardNavbarItemsActive"}`}>
                        New Fundraiser
                      </Button></a>
                      <a href='/myFundraisers' className='navigatingLink'><Button size="large" className={`dashboardNavbarItems ${location.pathname === '/myFundraisers' && "dashboardNavbarItemsActive"}`}>
                        My Fundraisers
                      </Button></a>
                      <a className='navigatingLink' href='/'><Chip
                        avatar={<Avatar alt="Metamask" src={merlin} />}
                        label="Merlin"
                        variant="outlined"
                        className="dashboardNavbarChip"
                      /></a>
                      <a className='navigatingLink' href='/notifications'>
                        <Badge badgeContent={1} color="error">
                          <NotificationsIcon color="action" className='dashboardNavbarNotification' />
                        </Badge>
                      </a>
                      <Button onClick={connectHandler} size="large" className="dashboardNavbarItemsButton">
                        {isConnected ? "disconnect" : "connect wallet"}
                      </Button>
                      <a href='/signIn' className='navigatingLink'><Button size="large" className="dashboardNavbarItemsButton">
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