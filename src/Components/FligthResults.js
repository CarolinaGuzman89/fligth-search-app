/* This example requires Tailwind CSS v2.0+ */
import { CalendarIcon, UsersIcon } from '@heroicons/react/solid'
import { useContext, useEffect, useState } from "react"
import { UserContext } from '../Context.js/UserContext';

 
import {encodeQueryData} from "./Form"

export default function FligthResults() {

    let url = useContext(UserContext)
    

    const [posts , setPosts] = useState([]);
    let newPosts = Object.values(posts)
    let iterable = newPosts[1]
    const [status, setStatus] = useState("loading");

    var myHeaders = new Headers();
    myHeaders.append();

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    useEffect(()=> {
        async function loadPosts() {
            try {
              const response = await fetch('https://test.api.amadeus.com/v2/shopping/flight-offers?adults=1&children=0&departureDate=2022-12-07&destinationLocationCode=CUN&originLocationCode=ACA&returnDate=2022-12-08', requestOptions)
              const newFligts = await response.json()
              setPosts(newFligts)
              setStatus("success")
            }
            catch (error ){
              console.log(error)
              setStatus("error");
            }
            
        }
        loadPosts()
    }, );

    if (status === "loading") return <span>loading</span>
    if (status === "error") return <span>error</span>

  
  return (
    
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul  className="divide-y divide-gray-200">
        {iterable.map((post)=> (
          <li key={post.id}>
            <a href="/DetailsFligths" className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">{post.numberOfBookableSeats} Asientos disponibles</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {post.price.total}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      {post.type}
                    </p>
                    
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <p>
                    Ultimo día de reserva <time dateTime={post.lastTicketingDate}>{post.lastTicketingDate}</time>
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
