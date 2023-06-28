
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FligthResults from './Components/FligthResults';
import SearchForm from './Components/Form';
import UserProvider from './Context.js/UserContext';






function App() {
  return (
    <UserProvider>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<SearchForm />} />
          <Route path="/FligthResults" element={<FligthResults />} /> 
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
