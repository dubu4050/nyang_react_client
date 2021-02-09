import React from 'react'
import { makeStyles } from '@material-ui/core'
import number from '../img/number.png'
import DiseaseList from './DiseaseList'
import Paper from '@material-ui/core/Paper'

import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme)=>({
    wrap:{
        width:'100%',
        height:'600px',
    },
    search:{
        margin:'0 auto',
        marginTop:'100px',
        width: '60%',
        height:'50px',
        background:'white',  
    },
    input:{
        width:'100%',
        height:'50px',
        border:"2px solid #dedede",
         borderRadius:"10px",
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height:"46px",
        opacity:'0.8'
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
      table:{
          width:'50%',
          margin:'0 auto',
      }
  }))

const Contents = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.wrap}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
                <InputBase className={classes.input}
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                inputProps={{ 'aria-label': 'search' }}
                />
            </div>
                <DiseaseList/>           
        </Paper>
    )
}

export default Contents
