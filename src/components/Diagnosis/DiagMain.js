import React, { useRef } from 'react';
import { makeStyles, Container, Button, Avatar, Tabs, Tab } from '@material-ui/core';
import DiseaseSearch from './DiseaseSearch'
import QnABoard from '../Diagnosis/QnABoard';
import catImg from '../../img/cat_icon_125794.png'
import dogImg from '../../img/dog_icon_125586.png'

const useStyles = makeStyles({

  'category-inner': {
    margin: '0 auto',
    borderBottom: '1px'
  },
  categoryWrapper: {
    display: 'flex',
    marginTop: '1%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginTop: '5%',
    marginBottom: '5%',
    marginRight: '2%',
    marginLeft: '2%',
    borderRadius: '50rem',
    fontWeight: 'bold',
    border: '0px',
    height: '5%',
    background: 'none',
    opacity: '0.8',
    '&:focus': {
      background: '#49D7F0',
      color: 'white'
    },
    '&:selected': {
      background: '#49D7F0',
      color: 'white'
    },
  }
});

const DiagMain = props => {

  const { match, history } = props;
  const { params } = match;
  const { page } = params;
 
  const tabNameToIndex = {
    0: "main",
    1: "qna",
  };

  const indexToTabName = {
    "main": 0,
    'qna': 1,
  };

  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);
  const handleChange = (event, newValue) => {
    history.push(`/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };
  

  return (
    <Container>
      <>
        <Container className={classes.categoryWrapper}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            indicatorColor="none"
            textColor="primary"
            centered
          >
            <Tab
              className={classes.tab}
              icon={<Avatar src={catImg} />}
              label={
                <Button
                  variant="contained"
                  className={classes.btn}>
                  자동질병진단
          </Button>} />
            <Tab
              className={classes.tab}
              icon={<Avatar src={dogImg} />}
              label={
                <Button
                  variant="contained"
                  className={classes.btn}>
                  공개QnA
          </Button>} />
          </Tabs>
        </Container>
        {selectedTab === 0 && <DiseaseSearch />}
        {selectedTab === 1 && <QnABoard />}
      </>
    </Container>
  )
}

export default DiagMain