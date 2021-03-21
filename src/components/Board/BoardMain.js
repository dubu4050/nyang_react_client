import React, { useRef } from 'react';
import { makeStyles, Container, Button, Avatar, Tabs, Tab } from '@material-ui/core';
import catImg from '../../img/cat_icon.png'
import dogImg from '../../img/dog_icon.png'
import FreeBoardContent from './Content/FreeBoardContent'
import InfoBoardContent from './Content/InfoBoardContent'



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
    0: "info",
    1: "free",
  };

  const indexToTabName = {
    "info": 0,
    "free": 1,
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
                    지식정보
                </Button>} 
            />
            <Tab
              className={classes.tab}
              icon={<Avatar src={dogImg} />}
              label={
                <Button
                  variant="contained"
                  className={classes.btn}>
                  자유게시판
                </Button>} 
            />
          </Tabs>
        </Container>
        {selectedTab === 0 && <InfoBoardContent />}
        {selectedTab === 1 && <FreeBoardContent />}
      </>
    </Container>
  )
}

export default DiagMain