// import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

import React, { Component } from 'react'
import News from './components/News';

export default class App extends Component {

  state={
    progress:0
  }

  setProgress=(progress)=>{
    this.setState({
      progress:progress
    })
  }

  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
      />
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} key="/" country="in" category="general"/>}/>    

          <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" country="in" category="technology"/>}/>
            
          <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" country="in" category="business"/>}/>
            
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" country="in" category="entertainment"/>}/>
            
          <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" country="in" category="sports"/>}/>
            
          <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" country="in" category="science"/>}/>
          
        </Routes>
        
        </Router>
      </div>
    )
  }
}
