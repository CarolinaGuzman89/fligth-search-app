import { useEffect, useState } from "react";
import MyLoader from "../Components/MyLoader"

export default function Fetch({endPoint}) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer 8AAuNkCKJX8hvOCXeTqvI8Xij0oa");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        const uri = "https://test.api.amadeus.com/v2/shopping/flight-offers?"+endPoint
        console.log(uri)


        fetch(uri, requestOptions)
        .then(response => {
            if(!response){
                throw new Error("Somenthig went wrong")
            }
            return response.json()
        })
        .then(result => {
            console.log(result);
            setLoading(false)
            setData(result.data)

        })
        .catch(error => {
            console.log('error', error)
            setError(error.message)
        });  

    }, [endPoint]);
    
    if(error) return <p>{error}</p>

    if(loading) return <MyLoader />


    
}

function transformData (data) {
    /*id, departureTime, arrivalTime, departureCode, arrivalCode, numberStops, fligthNumber, price, currency */
    const newData = data.map((objeto)=> {
        const segment = objeto.itineraries[0].segments[1]
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