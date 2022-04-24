import { Container, Typography } from '@mui/material'
import React from 'react'
import Carousel from './Carousel'
import './css/Banner.css'

const Banner = () => {
  return (
    <div className='banner'>
        <Container className='bannerContent'>
                <div className='tageLine'>
                    <Typography className='header' variant='h2'>Crypto Hunter</Typography>
                    <Typography className='subtitle' variant='subtitle2'>The Most Popular Cryptocurrencies, and What You Should Know About Each Before You Invest</Typography>
                </div>
                <Carousel/>
        </Container>
    </div>
  )
}

export default Banner
