/* This example requires Tailwind CSS v2.0+ */
import { CalendarIcon, UsersIcon } from '@heroicons/react/solid'
import plane from "../images/flight-takeoff-line.svg"
import planeline from "../images/plane-line.svg"
import user from "../images/user-3-fill.svg"
import pencil from "../images/pencil-line.svg"
import { useLocation, useNavigate } from 'react-router-dom'

import AirportsCodes from "../Mocks/AirpotsCode";
import Fligth from './Fligth'


export default function FligthResults() {

  const navigate = useNavigate();
    function click() {
        navigate("/");
    } 

  const location = useLocation();
  console.log(location.state.resultados)
  console.log(location.origen)

  const data = location.state.resultados

  if(data.length === 0) return <p>No se encontraron vuelos</p>

  const departureDate =  new Date (data[1].departureTime.split("T")[0]).toDateString().split("2023")
  const arrivalDate = new Date (data[1].arrivalTime.split("T")[0]).toDateString().split("2023")
  const departureCode = data[1].departureCode
  const arrivalCode = data[1].arrivalCode

  return (
    <div className="bg-gray-300 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
    
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 mb-5 overflow-hidden text-white  rounded-md bg-blue-600  px-6 py-4 shadow">
        <div>
          <p className='text-xl'>Vuelo de salida</p>
          <div className='flex gap-5'>
            <p>{departureCode}</p>
            <img src={plane} alt='icono de avión' className='w-6'/>
            <p>{arrivalCode}</p>
          </div>
        </div>
        <div className='grid justify-items-end'>
          <button className='flex gap-10' onClick={click} >Editar Fechas <span><img src={pencil} alt='' className='' /></span></button>
          <p>{departureDate}. - {arrivalDate}.</p>
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
