import React, { useContext } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Container, IconButton, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import './css/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { CurrencyContext } from './Context';



export  const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const Navbar = () => {

  const {currency, symbol, setCurrency} = useContext(CurrencyContext)
  
  
  const history = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>

            <Typography  className='title' onClick={()=>history('/')} variant="h6">
                Crypto Hunter 
            </Typography>
            <Select className='Select' 
                    variant='outlined'
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)}
            
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>
          </Toolbar>
        </Container>

      </AppBar>
    </ThemeProvider>
  )
}

export default Navbar
