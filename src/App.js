import React from 'react'
import './App.css';
import Home from './components/Common/Home'
import DiagMain from './components/Diagnosis/DiagMain'
import QnABoard from './components/Diagnosis/Content/QnABoard'
import BoardMain from './components/Board/BoardMain'
import InfoBoardContent from './components/Board/Content/InfoBoardContent'
import {Redirect,Route,Switch}from 'react-router-dom'


function App() {
  return (
      <div className="App">
        <Switch>
          <Redirect exact from="/" to="/main"/>
          <Route exact path ="/:page?" render = {props => <Home {...props} />} />
          <Route exact path ="/main/:page?" render = {props => <DiagMain {...props} />} />
        </Switch>
        <Switch>
        <Redirect exact from="/board" to="/info"/>
          <Route exact path ="/board/:page?" render = {props => <BoardMain {...props}/>}/>
          <Route exact path ="/info/:page?" render = {props => <InfoBoardContent {...props}/>}/>
        </Switch> 
 
      
      </div>

  );
}

export default App;
