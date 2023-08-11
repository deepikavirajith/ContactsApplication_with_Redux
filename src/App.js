import React from 'react';
import './App.css';
import MainComponent from './components/MainComponent';
import ContactsComponents from './components/ContactsComponents';
import {useSelector} from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import NaviComponent from './components/NaviComponent';
import { ToastContainer } from 'react-toastify';
import EditContactComponent from './components/EditContactComponent';


function App() {
  return (
    <div className="App">
      <ToastContainer />
     <Routes>
      <Route exact path='/' element={<NaviComponent/>}></Route>
      <Route path='/main' element={<MainComponent/>}></Route>
      <Route path='/edit/:id' element={<EditContactComponent />}></Route>
     </Routes>
    </div>
  );
}

export default App;
