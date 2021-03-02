import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Line } from 'react-chartjs-2'



export default function CurrenciesRate() {

    const { currency } = useParams()

    //Datos API
    const [data, setData ] = useState({})

    ///datos si esta cargando
    const [loading, setLoading] = useState(true)

    //DAtos de las fechas de los inputs
    const [date, setDate] = useState({
        startDate: '2020-01-01',
        endDate: '2020-02-28'
    })

    useEffect(() => {
        const getRates = async(cur) => {
            const res = await axios.get(`https://api.exchangerate.host/timeseries?start_date=${date.startDate}&end_date=${date.endDate}&base=USD&symbols=${cur}`)
            const {rates} = await res.data        
            console.log(rates)
            const labels = Object.keys(rates)
            console.log(labels)
            const dataValues = Object.keys(rates).map((e) => {
                return rates[e][cur]

                // rates."2020-01-01".ILS
            })
            console.log(dataValues)
            setData({
                labels: labels, // 39 fechas
                datasets: [
                    {
                        label: "Tipo de cambio USD",
                        data: dataValues, // 39 datos
                        borderColor:'blue',
                        pointBackgroundColor:'red',
                        pointRadius: 3
                    }
                ]
            })
            setLoading(false)
            console.log(data)
        }
        getRates(currency) //<-- invocacion

    },[currency, date]) ///si hay un cambio aqui va hacer un use effect

    const handleDate = (e) =>{
        console.log(e.target.value)
        setDate({
            ...date,
            [e.target.name]: e.target.value
        })

    }

    

    return (
        <div className='mr-5 mh-50 sticky-top '  >
        <h2 className='text-center mb-3 mt-3'><b>Conversión seleccionada USD a {currency}</b></h2>
        <div className=' col d-flex flex'>

                    {
                loading ?  
                    <h1>Cargando...</h1> 
                    : <div className='col-lg ' style={{width:'80%'}}> <Line 
                        data={data}
                     /></div>
            }

            <div className='d-flex flex-column mb-2 mt-2 ml-5 col-sm-3 p-1 '  >
                <h3 >Selecciona las fechas</h3>
                <h4 >Inicio: </h4>
                <input 
                    className='form-control row-sm'
                    type='date'
                    onChange={(e) => {handleDate(e)}}
                    value={date.startDate}
                    name='startDate' />

                <h3> Hasta: </h3>
                
                <input 
                 className='form-control row-sm'
                    type='date'
                    onChange={(e) => {handleDate(e)}}
                    value={date.endDate}
                    name='endDate' />
            </div>

            



            </div>   
        </div>
    )
}
