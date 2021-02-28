import React from 'react'
import './App.css';
import Header from './components/Common/Header'
import Nav from './components/Common/Nav'
import Home from './components/Common/Home'
import DiagMain from './components/Diagnosis/DiagMain'
import BoardMain from './components/Board/BoardMain'
import {Redirect, BrowserRouter,Route,Switch}from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Redirect exact from="/" to="/main"/>
          <Route exact path ="/:page?" render = {props => <Home {...props} />} />
          <Route exact path ="/main/:page?" render = {props => <DiagMain {...props} />} />
          <Route exact path ="/board/:page?" render = {props => <BoardMain {...props}/>}/>
        </Switch>    
      </div>
    </BrowserRouter>


  );
}

export default App;
