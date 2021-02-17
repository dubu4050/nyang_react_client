import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import DiagnosisNav from '../Diagnosis/DiagnosisNav';

const useStyles = makeStyles({
  root: { 
    flexGrow: 1,
  },
  tab:{
    fontWeight:"bold",
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

    return (
      <MuiThemeProvider theme={theme}>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab className={classes.tab} label="진단" value="0"/>
          <Tab className={classes.tab} label="게시판" value="1" />
        </Tabs>
      </Paper>
    </MuiThemeProvider>
    )
}

export default Nav
