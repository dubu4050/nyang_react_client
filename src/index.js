import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';

//axios.defaults.headers.head['token'] = localStorage.getItem('token');
if (localStorage.getItem('token') != null) {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('token');
}

const theme = createMuiTheme({
  typographys: {
    fontFamily: '"Noto Sans KR",serif',
  },
});
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <React.StrictMode>
      <Router>
        <CssBaseline />
        <App />
      </Router>
    </React.StrictMode>
  </MuiThemeProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
