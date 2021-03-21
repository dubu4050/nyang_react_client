import React from "react";
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import {MuiThemeProvider, createMuiTheme, Paper, Tabs, Tab} from '@material-ui/core';
import DiasnosisMain from '../Diagnosis/DiagMain';
import BoardMain from '../Board/BoardMain';

const useStyles = makeStyles({
    root: { 
      flexGrow: 1,
    },
    tab:{
      fontWeight:"bold",
    }
  });
  
const Home = props => {

    const {match, history} = props;
    const {params} = match;
    const {page} = params;
    
    const tabNameToIndex = {
      0: "main",
      1: "board",
    };
  
    const indexToTabName = {
      main : 0,
      board : 1,
    };
    
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]); 
    const handleChange = (event, newValue) => {
        history.push(`/${tabNameToIndex[newValue]}`);
        setSelectedTab(newValue);
    };
  
    const theme = createMuiTheme({
      palette:{
        primary:{main:'#49D7F0',}
      }
    });

    return (
        <div>
            <Header />
            <>
                <MuiThemeProvider theme={theme}>
                    <Paper className={classes.root}>
                        <Tabs
                            value={selectedTab}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab className={classes.tab} label="진단" />
                            <Tab className={classes.tab} label="게시판" />
                        </Tabs>
                    </Paper>
                    {selectedTab === 0 && <DiasnosisMain {...props}/>}
                    {selectedTab === 1 && <BoardMain {...props} />}
                </MuiThemeProvider>
            </>
        </div>
    )

}

export default Home;