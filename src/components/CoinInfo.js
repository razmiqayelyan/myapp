import { Button, LinearProgress } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api'
import { CurrencyContext } from './Context'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
import { Box, display } from '@mui/system';



export const  chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];


ChartJS.register(...registerables);

const CoinInfo = ({coin}) => {

  const [historicData, setHistoricData] = useState()
  const [days, setDays] = useState(1)
  const {currency} = useContext(CurrencyContext)
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  };
  useEffect(() => {
    fetchHistoricData()
  }, [currency, days])
  
  if(!historicData) return <LinearProgress/>

  const labels = historicData?.map((coin) => {
    let date = new Date(coin[0]);
    let time =
      date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`;
    return days === 1 ? time : date.toLocaleDateString();
  }).filter(label => {
    if(label) return label
  })
  const data = historicData?.map((coin) => coin[1]).filter((d) => {
    if(d) return d
  })
  
  return (
    <>
      <Box  sx={{
        width: {xs: "100%" , md: "60%"},
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column"
        }} >
    <Line
      data={{
        labels: labels,
        

        datasets: [
          {
            data: historicData.map((coin) => coin[1]),
            label: `Price ( Past ${days} Days ) in ${currency}`,
            borderColor: "#EEBC1D",
          },
        ],
      }}
      options={{
        elements: {
          point: {
            radius: 1,
          },
        },
      }}
    />
    <Box  style={{
      display:"inline-block",
      justifyContent:"space-evenly",
      alignItems:"center"
    }}>
      {chartDays.map((day) => {
        return <Button onClick={() => setDays(day.value)} style={{color:"gold"}}>{day.label}</Button>
      })}
    </Box>
    </Box>
      </>
  )
}

export default CoinInfo
