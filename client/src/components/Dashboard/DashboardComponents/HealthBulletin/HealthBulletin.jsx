import React from 'react'
import '../../../../styles/DashboardStyles/HealthBulletin.scss'
import { Card, CardContent, Grid, Typography, Alert, Button } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHealthBulletinData } from '../../../../redux/actions/common'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ScaleLoader from 'react-spinners/ScaleLoader'
import cbute from '../../../../assets/logos/cbutelogo.png'

function HealthAndNews() {
  const dispatch = useDispatch()
  useEffect(() => {
    const currDate = new Date()
    // dispatch(getHealthBulletinData(currDate))
  }, [])// eslint-disable-line react-hooks/exhaustive-deps 
  let healthBulletinData = useSelector(state => state.common.healthBulletinData)


  return (
    <div className='healthBulletinContainer'>
      <Grid>
        

        <Grid item xs={12} className="healthBulletinHeaderBox">

          <Typography variant='h4' className='healthBulletinHeader'>Health Bulletin</Typography>
          <div className='healthBulletinInfoBox'>

            <Typography variant='h6' className='healthBulletinInfo'>Checkout latest news and updates on health</Typography>

          </div>
        </Grid>

        <div className='healthBulletinParentBox'>


          {
            healthBulletinData ? (
              <div className="healthBulletinParentSubBox">
                {
                  healthBulletinData.filter(hb => hb.media !== null && hb.title.length < 120).map((hb, k) => (

                    <div key={k} component={Card} className="healthBulletinCardParent">
                      <div className='healthBulletinCard'>
                        <CardContent>
                          <div className="healthBulletinImgBox">
                            <img src={hb.media ? hb.media : cbute} loading="eager" alt="health" className="healthBulletinCardImg" />
                            <span className="healthBulletinNavigateBtnBox">
                              <a href={hb.link} target="_blank" rel='noopener noreferrer' className='navigatingLink'><ExitToAppIcon className='healthBulletinNavigateBtn' /></a>
                            </span>
                          </div>
                          <div className="healthBulletinCardInfoBox">
                            <Typography variant='body1' className='healthBulletinCardInfo'>
                              {hb.title}
                            </Typography>
                          </div>
                        </CardContent>
                      </div>
                    </div>


                  ))
                }
              </div>
            ) : (
              <>
                <div className='healthBulletinLoaderBox'>
                  <ScaleLoader color="#6C97A9" loading={true} size={120} />
                </div>
              </>
            )
          }

        </div>

      </Grid>

    </div>
  )
}

export default HealthAndNews