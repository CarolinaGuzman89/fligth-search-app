import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import flights from "../images/fligth-img.jpg";
import plane from "../images/flight-takeoff-line-b.svg";
import planeline from "../images/plane-line.svg";

import add from "../images/add-box-line.svg";
import decrement from  "../images/decrement-line.svg"


export default function FligthsDetails() {

    const data = useLocation();
    const details = data.state.data

    const navigate = useNavigate();
    function click() {
        navigate("/Payment");
    } 

    const unitPrice = details.price;

    const [count, setCount] = useState(1);
    const [total, setTotal] = useState(unitPrice);


    const handleIncrement = () => {
        setCount( count + 1);
        setTotal( total * count)
    }

    const handleDecrement = () => {
        if (count > 2){
            setCount(count - 1)
            setTotal(total - unitPrice)
        } else {
            setCount(1)
        }
    }


    return (
        <div className='flex justify-center items-center bg-gray-300 '>
            <div className='grid grid-cols-1 w-2/3 rounded-md bg-white shadow m-16 gap-5 md:grid-cols-2 mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
                <div>
                    <img src={flights} alt='' />
                </div>
                <div className='grid  grid-cols-1 gap-5 divide-y  items-center '>
                        <h1 className='text-2xl font-bold pb-3 text-center'>Detalles de vuelo</h1>
                        <div className='grid grid-cols-3 text-center pt-3'>
                            <div>
                                <div>{details.departureTime.split("T")[1]}</div>
                                <div>{details.departureCode}</div>
                            </div>
                            <div className='flex justify-center '>
                                <img src={plane} alt='icono de avión' className='w-8'/>
                            </div>
                            <div>
                                <div>{details.arrivalTime.split("T")[1]}</div>
                                <div>{details.arrivalCode}</div>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 text-center pt-3'>
                            <div>Directo</div> 
                            <div className='items-center'>
                                <p>Vuelo</p>
                                <div className='flex justify-center gap-2'>
                                    <img src={planeline} alt='plane' />
                                    <p>{details.fligthNumber}</p>
                                </div>
                            </div> 
                        </div>
                        <div className='text-center  pr-5 pt-3'>
                            <div>Total</div>
                            <div className='text-2xl font-bold'>{Number.parseFloat(total).toFixed(2)} $</div>
                            <div>/ {details.currency}</div>
                            <div className='flex justify-center'>
                                <button onClick={handleDecrement}>
                                        <img src={decrement} alt='' className='pl-1'/>
                                </button> 
                                <span> {count}</span>
                                <button onClick={handleIncrement}>
                                    <img src={add} alt='' className='pl-1'/>
                                </button> 
                            </div>
                            <div className="flex justify-center pt-3">
                                <button type="submit" onClick={click}  className="w-32 flex justify-center   py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Comprar
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}
