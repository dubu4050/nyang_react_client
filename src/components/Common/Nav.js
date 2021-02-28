import React from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';

const useStyles = makeStyles({
  root: { 
    flexGrow: 1,
  },
  tab:{
    fontWeight:"bold",
  },
  link:{
    color: '#000000',
    textDecoration: 'none'
  }
});



const Nav = () => {

  const classes = useStyles();
  const [value, setValue] = React.useState(0); 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = createMuiTheme({
    palette:{
      primary:{main:'#49D7F0',}
    }
  });
    
  const checkPathnameValue = () => {
    const { pathname } = window.location;
    switch (pathname) {
      case '/diagnosis/auto':
      case '/board/info':
      break;
    default:
      return false;
    }
    return pathname;
  }

  const tabValue = checkPathnameValue();
  return (
    <MuiThemeProvider theme={theme}>
    <Paper className={classes.root}>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab className={classes.tab} label="진단" value={'/diagnosis/auto'}
            to='/diagnosis/auto' component={Link}/>
        <Tab className={classes.tab} label="게시판" value={'/board/info'}
          to='/board/info' component={Link}/>
      </Tabs>
    </Paper>
  </MuiThemeProvider>
  )
}

export default Nav
