/* This example requires Tailwind CSS v2.0+ */
import plane from "../images/flight-takeoff-line.svg"
import pencil from "../images/pencil-line.svg"
import { useLocation, useNavigate } from 'react-router-dom'


import Fligth from './Fligth'
import FligthNotFoud from "./FlightsNotFound";
import { useEffect, useState } from "react";
import MyLoader from "./MyLoader";



export default function FligthResults({token}) {


  const navigate = useNavigate();
    function click() {
        navigate("/");
    } 

    const [data, setData] = useState(null)
    const [isLoading, setIsloading] = useState(true)
    
    const location = useLocation();
    const endPoint = location.state.resultados

  
useEffect(() => {
  if(data === null){

    const myHeaders = new Headers();
        const authorization = `Bearer ${token}`;
        console.log(authorization)
        myHeaders.append("Authorization", authorization);

        const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        const uri = "https://test.api.amadeus.com/v2/shopping/flight-offers?"+endPoint
        console.log(uri)
        fetch(uri, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.data)
            const resultados = result.data
            const transformerData = transformData(resultados)
            setData(transformerData)
            setIsloading(false)
        })
        .catch(error => {
            console.log('error', error)
            
        });
  }

}, [endPoint, data, token])
    

  function transformData (results) {
    const newData = results.map((objeto)=> {
        const segment = objeto.itineraries[0].segments[0]
        console.log(segment)
        return {
            id: objeto.id, 
            departureTime: segment.departure.at,
            departureCode: segment.departure.iataCode,
            arrivalTime: segment.arrival.at,
            arrivalCode: segment.arrival.iataCode,
            numberStops: segment.numberOfStops,
            fligthNumber: segment.number,
            price: objeto.price.total,
            currency: objeto.price.currency
        }  
    })

    const filtrado = []

    newData.forEach(element => {
        const repetidos = filtrado.filter((e) => (
            e.fligthNumber === element.fligthNumber
        ) )
        if(repetidos.length <= 0) {
            filtrado.push(element)
        }
    });
    
    return filtrado
}

if(isLoading) return <MyLoader />

if(data.length === 0) return <FligthNotFoud />

  const departureDate =  new Date (data[0].departureTime.split("T")[0]).toDateString().split("2023")
  const arrivalDate = new Date (data[0].arrivalTime.split("T")[0]).toDateString().split("2023")
  const departureCode = data[0].departureCode
  const arrivalCode = data[0].arrivalCode

return (
    <div className="bg-gray-300 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 justify-items-center sm:justify-items-start sm:grid-cols-2 mb-5 overflow-hidden text-white  rounded-md bg-blue-900  px-10 py-6 shadow">
          <div >
            <p className='text-2xl font-bold pb-3'>Vuelo de salida</p>
            <div className='flex gap-5 pb-2'>
              <p key={data.id}>{departureCode}</p>
              <img src={plane} alt='icono de avión' className='w-6'/>
              <p>{arrivalCode}</p>
            </div>
            <p>{departureDate}. - {arrivalDate}.</p> 
          </div>
          <div className='flex items-center sm:justify-self-end  gap-3 pt-3' >
            <button className='flex gap-5 justify-center w-48 h-10 p-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' onClick={click}>Nueva busqueda<img src={pencil} alt='icono de avión' className='w-4'/></button>
            
          </div>
        </div>
        <ul  className="divide-y divide-gray-200">
          {data.map((item)=> (
            <Fligth {...item} />
          ))}
        </ul>
      </div>
    </div>
  )
}
