import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import Nav from './Diagnosis/DiagnosisNav'
import Content from './Diagnosis/Contents'

const useStyles = makeStyles({

    'category-inner':{
      margin: '0 auto',
      borderBottom: '1px'
    }
  });
  
const Content_1 = () => {
    const classes = useStyles();
    return(
        <Container>
            <Nav/>
            <Content></Content>
  
        </Container>
    )
}

export default Content_1