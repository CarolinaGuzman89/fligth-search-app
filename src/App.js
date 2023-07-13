
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FligthResults from './Components/FligthResults';
import SearchForm from './Components/Form';

import { useState } from 'react';

function App() {
  const [data, setData] = useState("")

  return (

      <BrowserRouter >
        <Routes>
          <Route path="/" element={<SearchForm value={data} onSubmit={setData} />} />
          <Route path="/FligthResults" element={<FligthResults data={data} />} /> 
        </Routes>
      </BrowserRouter>
  );
}

export default App;
