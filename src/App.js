import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';

import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import AlertContext from './context/notes/AlertContext';
import {useContext} from 'react'


function App() {
  const context = useContext(AlertContext)
  const {alert} = context;
  return (
    <>
      <NoteState>
        
        <BrowserRouter>
          <Navbar />
          <Alert message={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="about" element={<About />} />
              <Route exact path="login" element={<Login />} />
              <Route exact path="signup" element={<Signup />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>


    </>
  );
}

export default App;
