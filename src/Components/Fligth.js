
import { useNavigate } from "react-router-dom";
import plane from "../images/flight-takeoff-line-b.svg"
import planeline from "../images/plane-line.svg"
import user from "../images/user-3-fill.svg"


export default function Fligth({id, departureTime, arrivalTime, departureCode, arrivalCode, numberStops, fligthNumber, price, currency }) {

    const data = {id, departureTime, arrivalTime, departureCode, arrivalCode, numberStops, fligthNumber, price, currency } 


    const navigate = useNavigate();
    function redirect(params) {
        navigate("/FligthsDetails", {state: {...params}});
    } 

    function handleClick (e) {
        e.preventDefault();
        redirect({data: data})
    }


    return (
            <div>
                <li key={id} className="overflow-hidden rounded-md bg-white px-6 py-4 mb-5 shadow" >
                    <div className='grid  grid-cols-1 gap-5 divide-y sm:divide-y-0 sm:grid-cols-3 sm:divide-x  items-center '>
                        <div className='grid grid-cols-3 text-center'>
                            <div>
                                <div>{departureTime.split("T")[1]}</div>
                                <div>{departureCode}</div>
                            </div>
                            <div className='flex justify-center '>
                                <img src={plane} alt='icono de avión' className='w-8'/>
                            </div>
                            <div>
                                <div>{arrivalTime.split("T")[1]}</div>
                                <div>{arrivalCode}</div>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 text-center pt-3'>
                            {numberStops === 0 ? <div>Directo</div> : <div>Escala</div>}
                            <div className='items-center'>
                                <p>Vuelo</p>
                                <div className='flex justify-center gap-2'>
                                    <img src={planeline} alt='plane' />
                                    <p>{fligthNumber}</p>
                                </div>
                            </div> 
                        </div>
                        <div className='text-center sm:text-end pr-5 pt-3'>
                            <div>Tarifa</div>
                            <div className='text-2xl font-bold'>{price}$</div>
                            <div className='flex justify-center sm:justify-end'>
                                <div>{currency} / </div>
                                <img src={user} alt='' className='pl-1'/>
                            </div>
                            <div className="flex justify-center sm:justify-end pt-3">
                                <button type="submit" onClick={handleClick}  className="w-32 flex justify-center   py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Seleccionar
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            </div>
            )
}
