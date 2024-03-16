// import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import React, { Component } from 'react'
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <Routes>
          <Route exact path="/" element={<News key="/" country="in" category="general"/>}/>    

          <Route exact path="/technology" element={<News key="technology" country="in" category="technology"/>}/>
            
          <Route exact path="/business" element={<News key="business" country="in" category="business"/>}/>
            
          <Route exact path="/entertainment" element={<News key="entertainment" country="in" category="entertainment"/>}/>
            
          <Route exact path="/sports" element={<News key="sports" country="in" category="sports"/>}/>
            
          <Route exact path="/science" element={<News key="science" country="in" category="science"/>}/>
          
        </Routes>
        
        </Router>
      </div>
    )
  }
}
