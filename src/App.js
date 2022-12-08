
import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './components/context/notes/NoteState';
import Alert from './components/Alert';
import SignUp from './components/SignUp';
import Login from './components/Login';



function App(props) {

  const [alert, setalert] = useState(null)

  const showAlert = (massage, type) => {
    setalert({
      msg: massage,
      type: type
    })
    setTimeout(() => {
      setalert()
    }, 1500);

  };


  return (


    <NoteState showAlert={showAlert}>
      <Router>
        <NavBar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home showAlert={showAlert} />} />
            <Route path='/About' element={<About />} />
            <Route path='/SignUp' element={<SignUp showAlert={showAlert} />} />
            <Route path='/Login' element={<Login showAlert={showAlert} />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  )
}
export default App;

