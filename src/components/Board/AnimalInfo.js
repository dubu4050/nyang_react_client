import React from 'react'
import { Container, makeStyles, InputBase, Chip } from '@material-ui/core'
import Card from '../Card/Card'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme)=>({
    wrapper:{
        display:'flex',
        alignItems: 'center',
        marginBottom: '2%',
    },
    chipList:{
        display: 'flex'
    },
    chip:{
        marginRight: '10px'
    },
    input:{
        height:'50px',
        border:"2px solid #dedede",
        borderRadius:"25px",
        marginRight: "0.5%"
    },
    placeholderStyle: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    },
    searchIcon:{
        pointerEvents: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        height: "46px",
        width: "30px",
        opacity:'0.8',
        border:'none',
        background:'none',
        marginRight: "0.5%",
        marginLeft: "0.5%"
    }
}));

export default function AnimalInfo(props){
    const classes = useStyles();

    return(
        <Container>
            <Container className={classes.wrapper}>
                <Container className={classes.chipList}>
                    <Chip label="고양이" className={classes.chip}/>
                    <Chip label="강아지" className={classes.chip}/>
                    <Chip label="고슴도치" className={classes.chip}/>
                    <Chip label="달팽이" className={classes.chip}/>
                </Container>
                
                <InputBase className={classes.input}
                        placeholder="Search…"
                        classes={{
                            input: classes.placeholderStyle,
                        }}
                    inputProps={{ 'aria-label': 'search' }}
                />
                <SearchIcon className={classes.searchIcon}/>
            </Container>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </Container>
    )
}