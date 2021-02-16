import React from 'react'
import { makeStyles } from '@material-ui/core'
import nyangImg from './img/nyangImg.png'
import './App.css';
import Header from './components/Header'
import Content1 from './components/Content_1'
import Nav from './components/Nav'
import {BrowserRouter,Route,Switch}from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Nav/>
        <Switch>
          <Route path="/">
            <Content1/>
          </Route>
        </Switch>    
      </div>
    </BrowserRouter>


  );
}

export default App;
