import React from 'react';
import {Link} from 'react-router-dom'
import { makeStyles, Container, Button, Avatar } from '@material-ui/core';
import catImg from '../../../img/cat_icon.png'
import dogImg from '../../../img/dog_icon.png'

const useStyles = makeStyles({
    categoryWrapper:{
        display: 'flex',
        width:'50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn:{
        marginTop: '5%',
        marginBottom: '5%',
        marginRight: '2%',
        marginLeft: '2%',
        borderRadius:'50rem',
        fontWeight:'bold',
        border: '0px',
        height: '5%',
        width: '30%',
        background:'none',
        opacity: '0.8',
        '&:focus': {
        background: '#49D7F0',
        color:'white'
        },
        '&:selected': {
        background: '#49D7F0',
        color:'white'
        },
    },
    link:{
        textDecoration: 'none',
        color: '#000000',
    },  
});

export default function BoradNav(props){
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <Container className={classes.categoryWrapper}>
        <Button
            variant="contained"
            startIcon={<Avatar src={catImg} />}
            className={classes.btn}
            component={Link}
            to='/board/info'
        >
            지식정보
        </Button>
        <Button
            variant="contained"
            startIcon={<Avatar src={dogImg} />}
            className={classes.btn}
            component={Link}
            to='/board/free'
        >
            자유게시판
        </Button>
  </Container>

  );
}
