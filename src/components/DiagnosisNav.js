import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import catImg from '../img/cat_icon_125794.png'
import dogImg from '../img/dog_icon_125586.png'

const useStyles = makeStyles({
  categoryWrapper:{
    width:'100%',
   overflow:'auto'
  },
  categoryInner:{
    width: 'fit-content',
    height: '100%',
    margin: '0 auto',
    borderBottom: '1px black'
  },
  categoryUl:{
    listStyle:'none',
    paddingLeft: '0px',
    textAlign: 'center',
    height: '100%',
  },
  categoryLi:{
   float:'left',
   width:'160px',
   height:'118px',
    position: 'relative',
    cursor: 'pointer',
    padding: '6px 12px',
    borderBottom:'1px,black'
},
  img:{
    width:'36px',
    height:'46px',
    opacity: '0.8',
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translateX(-50%)',
    
  },
  btn:{
    borderRadius:'50rem',
    fontWeight:'bold',
    border: '0px',
    height: '35px',
    width: '100px',
    background:'none',
    marginTop:'70px',
    opacity: '0.8',
    '&:focus': {
      background: '#49D7F0',
      color:'white'
    },
    '&:selected': {
      background: '#49D7F0',
      color:'white'
    },
  }
});

const DiagnosisNav = () =>{
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <Container className={classes.categoryWrapper}>
      <div className={classes.categoryInner}>
        <ul className={classes.categoryUl}>
          <li className={classes.categoryLi}><img src={catImg} className={classes.img}></img><button className={classes.btn}>자동질병진단</button></li>
          <li className={classes.categoryLi}><img src={dogImg} className={classes.img}></img><button className={classes.btn}>공개QnA</button> </li>
        </ul>
      </div>
  </Container>

  );
}

export default DiagnosisNav