import React, { Component } from 'react';
import './App.css';
import Home from './components/Common/Home';
import DiseaseSearch from './components/Diagnosis/Content/DiseaseSearch';
import QnABoard from './components/Diagnosis/Content/QnABoard';
import QnAWrite from './components/Diagnosis/Content/QnAWrite';
import BoardMain from './components/Board/BoardMain';
import InfoBoardContent from './components/Board/Content/InfoBoardContent';
import FreeBoardContent from './components/Board/Content/FreeBoardContent';
import BoardWrite from './components/Board/Content/BoardWrite';
import ReadQnA from './components/Diagnosis/Content/ReadQnA';
import ReadBoard from './components/Board/Content/ReadBoard';
import Login from './components/Member/Login';
import EnrollMember from './components/Member/EnrollMember';
import FindId from './components/Member/FindId';
import FindPw from './components/Member/FindPw';
import UpdatePw from './components/Member/UpdatePw';
import MemberInfo from './components/Member/MemberInfo';
import ActiveMemberInfo from './components/Member/ActiveMemberInfo';
import Admin from './components/Member/Admin';
import Header from './components/Common/Header';
import { Redirect, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

export default class App extends Component {
  render() {
    const classes = {
      '@global': {
        'body, html': {
          padding: 0,
          margin: 0,
          minWidth: '100vw',
          minHeight: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
        },
        '*::-webkit-scrollbar': {
          width: '0.5rem',
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '*::-webkit-scrollbar-thumb': {
          outline: '1px solid slategrey',
        },
        '*::-webkit-scrollbar:horizontal': {
          display: 'none',
        },
      },
      root: {
        width: '100%',
        height: '100%',
        margin: 0,
        overflowY: 'hidden',
      },
    };
    return (
      <div style={classes.root}>
        <Header />
        <Route path="/enroll" component={EnrollMember} exact />
        <Route path="/findId" component={FindId} exact />
        <Route path="/findPw" component={FindPw} exact />
        <Route path="/updatePw" render={(props) => <UpdatePw {...props} />} />
        <Route path="/memberInfo" render={() => <MemberInfo />} />
        <Route path="/activeMemberInfo" render={() => <ActiveMemberInfo />} />
        <Route path="/admin" component={Admin} exact />
        <Switch>
          <Redirect exact from="/" to="/diagnosis/" exact />
          <Redirect exact from="/diagnosis" to="/diagnosis/search" exact />
          <Route
            exact
            path="/diagnosis/:page?"
            render={(props) => <Home {...props} />}
          />
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
          <Route path="/qnaWrite" component={QnAWrite} exact />
          <Route path="/detailQnA" component={ReadQnA} exact />
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
          <Route path="/boardWrite" component={BoardWrite} exact />
          <Route path="/detailBoard" component={ReadBoard} exact />
        </Switch>
      </div>
    );
  }
}
