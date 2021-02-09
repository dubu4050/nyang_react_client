import React from 'react'
import { makeStyles } from '@material-ui/core'
import nyangImg from './img/nyangImg.png'
import './App.css';
import Header from './components/Header'
import Contents from './components/Contents'
import Nav from './components/Nav'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

function App() {
  return (
    <div className="App">
      <Header/>
      <Nav/>
      <Contents/>     
    </div>

  );
}

export default App;
