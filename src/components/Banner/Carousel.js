import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import { TrendingCoins } from '../../config/api'
import { CurrencyContext } from '../Context'
import './css/Carousel.css'

export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const [trending, setTrending] = useState();
   
    const {currency, symbol, setCurrency} = useContext(CurrencyContext)

    const fetchTreandingCoins =  async (currency) =>  {
        const {data} = await axios.get(TrendingCoins(currency))
        setTrending(data)
    }
    useEffect(() => {
        fetchTreandingCoins(currency)
    }, [currency])
    const responsive = {
        0: {
            items: 2
        },
        512: {
            items: 4
        }
    }
    const items = trending?.map((tr) => {
    const profit = tr.price_change_percentage_24h > 0;
    return <Link className='carousel-item' to={`/coins/${tr.id}`}>
        <img src={`${tr?.image}`} alt={`${tr?.name}`} height={"80"} width={"80"} style={{marginBottom: 10}}/>
        <span>{tr?.symbol.toUpperCase()} &nbsp; <span style={{fontWeight: 500, color: profit > 0 ? "green": "red"}}>{profit && "+"}{tr.price_change_percentage_24h?.toFixed(2)}%</span> </span>
        <span style={{fontSize:"18px", fontWeight: "bold"}}>{symbol} {numberWithCommas(tr.current_price.toFixed(2))}</span>
    </Link>
})
  return (
    <div className='carousel'>
      <AliceCarousel 
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      autoPlay
      items={items}
      />
    </div>
  )
}

export default Carousel
