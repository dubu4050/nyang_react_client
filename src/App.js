import React from 'react'
import { makeStyles } from '@material-ui/core'
import nyangImg from './img/nyangImg.png'
import './App.css';
import Header from './components/Common/Header'
import Content1 from './components/Content_1'
import Nav from './components/Common/Nav'
import {BrowserRouter,Route,Switch}from 'react-router-dom'
import BoardMain from 'components/Board/BoardMain';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Nav/>
        <Switch>
          <Route exact path="/">
            <Content1/>
          </Route>
          <Route path="/board">
            <BoardMain/>
          </Route>
        </Switch>    
      </div>
    </BrowserRouter>


  );
}

export default App;
