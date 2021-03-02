import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function Sidebar() {

    const [currencies, setCurrencies] = useState([])

    useEffect(() => {
        const getCurrencies = async() => {
            const resServer = await axios.get('https://api.exchangeratesapi.io/latest')
            const data = await resServer.data.rates
            const arrCurr =  Object.keys(data)
            //console.log(data)
            //console.log(arrCurr)

            setCurrencies(arrCurr)
        }
        getCurrencies()
    }, [])



    return (
        <div className='mt-5'>
            <ul className='flex-column list-group ml-5 d-flex flex-nowrap '>
                {
                    currencies.sort((a,b) => {return a.localeCompare(b)}).map((elem,index) => {
                        return(
                            <li className='list-group-item col-xs-2 "' key={index}>
                                <Link className='item-link active' to={`/${elem}`} >
                                    {elem}
                                </Link>
                            </li>    
                        )
                    })
                }
            </ul>
        </div>
    )
}
