
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FligthResults from './Components/FlightResults';
import SearchForm from './Components/SearchForm';
import { useEffect, useState } from 'react';
import FligthsDetails from './Components/FlightsDetails';
import {UseContext, useToken} from "./Context/useContext"



function App() {


  const [token, setToken] = useState(useToken);

  function getTocken() {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", process.env.REACT_APP_GRANT_TYPE);
    urlencoded.append("client_id", process.env.REACT_APP_CLIENT_ID);
    urlencoded.append("client_secret", process.env.REACT_APP_REACT_CLIENT_SECRET);



    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("https://test.api.amadeus.com/v1/security/oauth2/token", requestOptions)
      .then(response => response.json())
      .then(result => {
        setToken(result.access_token);
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    if(!token) {
      getTocken();
    } 
  }, [token])  


  return (
    <UseContext.Provider value={{token, setToken}}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<SearchForm />} />
          <Route path="/FligthResults" element={<FligthResults  token={token} />} /> 
          <Route path="/FligthsDetails" element={<FligthsDetails />} /> 
          <Route path="/FligthResults" element={<FligthResults  token={token} />} /> 
        </Routes>
      </BrowserRouter>
    </UseContext.Provider>
  );
}

export default App;
