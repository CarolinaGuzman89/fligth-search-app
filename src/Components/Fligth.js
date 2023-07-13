
import plane from "../images/flight-takeoff-line.svg"
import planeline from "../images/plane-line.svg"
import user from "../images/user-3-fill.svg"


export default function Fligth({id, departureTime, arrivalTime, departureCode, arrivalCode, numberStops, fligthNumber, price, currency }) {

    return (
        <div>
            <li key={id} className="overflow-hidden rounded-md bg-white px-6 py-4 mb-5 shadow" >
                <div className='grid grid-cols-3 divide-x  items-center '>
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
                <div className='grid grid-cols-3 text-center'>
                    <div>
                    
                    </div>
                    <div className='items-center'>
                    <p>Vuelo</p>
                    <div className='flex justify-center gap-2'>
                        <img src={planeline} alt='plane' />
                        <p>{fligthNumber}</p>
                    </div>
                    </div>
                    {numberStops === 0 ? <div>Directo</div> : <div>Escala</div>}
                </div>
                <div className='text-end pr-5'>
                    <div>Tarifa</div>
                    <div className='text-2xl font-bold'>{price}$</div>
                    <div className='flex justify-end'>
                    <div>{currency} / </div>
                    <img src={user} alt='' className='pl-1'/>
                    </div>
                </div>
                </div>
            </li>

        </div>
            )
}
