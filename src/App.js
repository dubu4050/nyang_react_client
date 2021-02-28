import React from 'react'
import './App.css';
import Home from './components/Common/Home'
import DiagMain from './components/Diagnosis/DiagMain'
import {Redirect,Route,Switch}from 'react-router-dom'


function App() {
  return (
      <div className="App">
        <Switch>
          <Redirect exact from="/" to="/main"/>
          <Route exact path ="/:page?" render = {props => <Home {...props} />} />
          <Route exact path ="/main/:page?" render = {props => <DiagMain {...props} />} />
        </Switch> 
 
        
      
      </div>

  );
}

export default App;
