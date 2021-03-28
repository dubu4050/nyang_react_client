import React from 'react';
import './App.css';
import Home from './components/Common/Home';
import DiseaseSearch from './components/Diagnosis/Content/DiseaseSearch';
import QnABoard from './components/Diagnosis/Content/QnABoard';
import BoardMain from './components/Board/BoardMain';
import InfoBoardContent from './components/Board/Content/InfoBoardContent';
import FreeBoardContent from './components/Board/Content/FreeBoardContent';
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/diagnosis" exact />
        <Route
          exact
          path="/diagnosis/:page?"
          render={(props) => <Home {...props} />}
        />
      </Switch>
      <Switch>
        <Redirect exact from="/board" to="/board/info" exact />
        <Route
          exact
          path="/board/:page?"
          render={(props) => <BoardMain {...props} />}
        />
        <Route
          exact
          path="/board/info/:page?"
          render={(props) => <InfoBoardContent {...props} />}
        />
        <Route
          exact
          path="/board/free/:page?"
          render={(props) => <FreeBoardContent {...props} />}
        />
      </Switch>
      <Switch>
        <Redirect exact from="/diagnosis" to="/diagnosis/search" exact />
        <Route
          exact
          path="/diagnosis/search/:page?"
          render={(props) => <DiseaseSearch {...props} />}
        />
        <Route
          exact
          path="/diagnosis/qna/:page?"
          render={(props) => <QnABoard {...props} />}
        />
      </Switch>
    </div>
  );
}

export default App;
