import React from 'react';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiThemeProvider,
  createMuiTheme,
  Paper,
  BottomNavigationAction,
  BottomNavigation,
  Container,
  Button,
  Avatar,
  Tabs,
  Tab,
} from '@material-ui/core';
import DiseaseSearch from '../Diagnosis/Content/DiseaseSearch';
import QnABoard from '../Diagnosis/Content/QnABoard';
import catImg from '../../images/cat_icon.png';
import dogImg from '../../images/dog_icon.png';
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  nav: {
    fontWeight: 'bold',
    fontSize: '15px',
  },
  'category-inner': {
    margin: '0 auto',
    borderBottom: '1px',
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
      color: 'white',
    },
    '&:selected': {
      background: '#49D7F0',
      color: 'white',
    },
  },
});

const Home = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;

  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      primary: { main: '#49D7F0' },
    },
  });

  const tabNameToIndex = {
    0: 'search',
    1: 'qna',
  };

  const indexToTabName = {
    search: 0,
    qna: 1,
  };

  const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);
  const handleChange = (event, newValue) => {
    history.push(`/diagnosis/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Header />
      <MuiThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <BottomNavigation value="diagnosis" showLabels>
            <BottomNavigationAction
              label="진단"
              value="diagnosis"
              href="/diagnosis"
              className={classes.nav}
            />
            <BottomNavigationAction
              label="게시판"
              value="board"
              href="/board"
              className={classes.nav}
            />
          </BottomNavigation>
        </Paper>
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
                  <Button variant="contained" className={classes.btn}>
                    자동질병예진
                  </Button>
                }
              />
              <Tab
                className={classes.tab}
                icon={<Avatar src={dogImg} />}
                label={
                  <Button variant="contained" className={classes.btn}>
                    공개QnA
                  </Button>
                }
              />
            </Tabs>
          </Container>
          {selectedTab === 0 && <DiseaseSearch {...props} />}
          {selectedTab === 1 && <QnABoard {...props} />}
        </>
      </MuiThemeProvider>
    </div>
  );
};

export default Home;
