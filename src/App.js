
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FligthResults from './Components/FligthResults';
import SearchForm from './Components/Form';
import { useEffect, useState } from 'react';
import FligthsDetails from './Components/FligthsDetails';
import {UseContext, useToken} from "./Context/useContext"
import Payment from './Components/Payment';


function App() {


  const [token, setToken] = useState(useToken)

  function getTocken() {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", "e1tevFhotiXRNCGcGLOaxYQ0Huyvd1jY");
    urlencoded.append("client_secret", "82CGLNU61vI2VbFH");

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("https://test.api.amadeus.com/v1/security/oauth2/token", requestOptions)
      .then(response => response.json())
      .then(result => {
        setToken(result.access_token)
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    if(!token) {
      getTocken()
    } 
  }, [])  


  return (
    <UseContext.Provider value={{token, setToken}}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<SearchForm />} />
          <Route path="/FligthResults" element={<FligthResults  token={token} />} /> 
          <Route path="/FligthsDetails" element={<FligthsDetails />} /> 
          <Route path="/Payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </UseContext.Provider>
  );
}

export default App;
