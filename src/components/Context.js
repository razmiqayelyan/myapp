import React, { useEffect, useState } from 'react'

export const CurrencyContext = React.createContext()

const Context = ({children}) => {

    const [currency, setCurrency] = useState("EUR")
    const [symbol, setSymbol] = useState("€")

    useEffect(() => {
        if(currency === "EUR" && symbol !== "₹")  setSymbol("€")
        else if(currency === "USD" && symbol !== "$") setSymbol("$")
    }, [currency])

  return (
    <CurrencyContext.Provider value={{currency, symbol, setCurrency}}>
     {children} 
    </CurrencyContext.Provider>
  )
}

export default Context