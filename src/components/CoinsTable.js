import { Container, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material'
import { Box, createTheme } from '@mui/system'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CoinList } from '../config/api'
import { numberWithCommas } from './Banner/Carousel'
import { CurrencyContext } from './Context'
import {theme} from './Navbar'

const CoinsTable = () => {
    const history = useNavigate();
    const [coins, setCoins] = useState()
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)

    const {currency, symbol} = useContext(CurrencyContext)
    const fetchCoin = async () => {
        setLoading(true)
        const {data} = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false)
    }
    useEffect(() => {
        fetchCoin(currency)
    }, [currency])

    const handleSearch = () => {
       let newSearch = search.toLowerCase()
       return coins?.filter((coin) => {
        if(coin.id.includes(newSearch)){
            return coin
        }else if(coin.symbol.includes(newSearch)){
            return coin
        }})}
    
    
    return (
    <ThemeProvider theme={theme}>
        <Container  style={{textAlign: "center"}}> 
            <Typography variant='h4' style={{margin: 18, fontFamily : "Montserrat"}}>
               Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField 
            onChange={(e) => setSearch(e.target.value)}
            
            label="Search for Crypto Currency"
            style={{marginBottom: "20px", width: "100%"}}
            variant='outlined' ></TextField>
        
        {loading?  <LinearProgress /> : (
        
        <TableContainer style={{display:"flex"}} >
            <Table>
                <TableHead style={{backgroundColor: "gold"}}>
                    <TableRow >
                        <TableCell  style={{"color":"black"}} >Coin</TableCell>
                        <TableCell align='right' style={{"color":"black"}}>Price</TableCell>
                        <TableCell align='right' style={{"color":"black"}}>24h Change</TableCell>
                        <TableCell align='right' style={{"color":"black"}}>Market Cap</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {handleSearch()?.slice((page-1)*10, (page-1)*10+10).map((coin) => {
                        const profit = coin.price_change_percentage_24h > 0;
                        return <TableRow  key={coin.id}>
                            <TableCell component="th" scope='row'  onClick={()=> history(`/coins/${coin.id}`)} style={{cursor: "pointer", display:"flex",gap:15}}> 
                            <img style={{marginBottom:10}} height="50" src={coin?.image} alt={coin?.name}  /> 
                            <div style={{display:"flex", flexDirection:"column"}}>
                                <span style={{fontSize:22}}>{coin.symbol.toUpperCase()}</span>
                                <span style={{color:"darkgrey"}}>{coin.name}</span>
                            </div>
                            </TableCell>
                            <TableCell align='right'>{symbol}{numberWithCommas(coin.current_price.toFixed(2))}</TableCell>
                            <TableCell align='right' style={{ color: profit > 0 ? "green": "red"}}>{profit && "+"}{coin.price_change_percentage_24h?.toFixed(2)}%</TableCell>
                            <TableCell align='right'>{symbol}{numberWithCommas(coin.market_cap.toString().slice(0, -6))}M</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>)}
        {coins
        ? 
        <Box style={{
            display:"flex",
            alignItems:"center",
            justifyContent: "center"
        }}>
        <Pagination onChange={(_,value) => setPage(value)} count={parseInt((handleSearch()?.length / 10).toFixed(0))} />
        </Box>
        :<Pagination count={1}/>}
        </Container>
      
    </ThemeProvider>
  )
}

export default CoinsTable
