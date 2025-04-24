import React from 'react';
import './App.css';
import MainComponent from './components/MainComponent';
import {Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import EditContactComponent from './components/EditContactComponent';
import SearchComponent from './components/SearchComponent';


function App() {
  return (
    <div className="App">
      <ToastContainer />
     <Routes>
      <Route exact path='/' element={<SearchComponent/>}></Route>
      <Route path='/main' element={<MainComponent/>}></Route>
      <Route path='/edit/:id' element={<EditContactComponent />}></Route>
     </Routes>
    </div>
  );
}

export default App;
