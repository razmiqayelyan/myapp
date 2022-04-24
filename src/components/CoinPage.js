import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api'
import { CurrencyContext } from './Context'
import './css/CoinPage.css'
import CoinInfo from './CoinInfo'
import { Box, display, fontSize } from '@mui/system'
import { Container, LinearProgress, Typography } from '@mui/material'
import parse from 'html-react-parser';
import { numberWithCommas } from './Banner/Carousel'


const CoinPage = () => {
  const {id} = useParams()
  const [coin, setCoin] = useState()
  const {currency, symbol} = useContext(CurrencyContext)

  const fetchCoin = async () => {
  const {data} = await axios.get(SingleCoin(id))
  setCoin(data)
}

  useEffect(() => {
    fetchCoin()
  }, [currency])
  console.log(coin)
  if(!coin) return <LinearProgress/>
  return (
    <div className='main-coin' style={{marginTop: "2rem"}}>
      <Box className="container" style={{display:"flex"}} sx={{
        flexDirection : {xs:"column", md:"row"},
      }}>
        <Box sx={{
          borderRight: {xs: "none", md: "1px solid"},
          width: {xs: "100%", md: "40%"},
          fontSize: {xs: "15px", md: "10px"}
        }}>
          <Container style={{display:"flex", alignItems:"center", justifyContent:"center" , flexDirection:"column"}}>
              <img src={coin.image.large} alt={coin.id} />
              <Typography className='coin-title' variant='h3'>{coin.name}</Typography>
              <Typography variant='p'>{parse(coin.description.en.split('. ')[0])}</Typography>
              <Box sx={{
                display: "flex",
                alignItems:"center",
                flexDirection:{xs:"column", sm:"row", md:"column"},
                
              }}>
              <Typography sx={{fontSize: {sm: "17px"}}} className='aaa' variant='h5' > <span className='sp'>Rank:</span> {coin.market_cap_rank}</Typography>
              <Typography sx={{fontSize: {sm: "17px"}}} className='aaa' variant='h5' > <span className='sp'>Current Price:</span> {symbol} {numberWithCommas( coin.market_data.current_price[currency.toLowerCase()] )}</Typography>
              <Typography sx={{fontSize: {sm: "17px"}}} className='aaa' variant='h5' > <span className='sp'>Market Cap:</span> {symbol} {numberWithCommas(coin.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M</Typography>
              </Box>
          </Container>
        </Box>
              
        <CoinInfo coin={coin}/>
        </Box>
    </div>
  )
}

export default CoinPage
