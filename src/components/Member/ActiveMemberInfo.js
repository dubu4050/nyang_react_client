import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { DataGrid } from '@material-ui/data-grid';
import Header from '../Common/Header';
import Box from '@material-ui/core/Box';
import member from '../../db/member.json';
import MemberHistory from './MemberHistory';
import { Paper, createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const questioncolumns = [
  { id: 'identifier', label: 'No', minWidth: '10%' },
  { id: 'title', label: 'TITLE', align: 'center' },
  {
    id: 'created_date',
    label: '작성 날짜',
    minWidth: '20%',
    align: 'center',
  },
  {
    id: 'anser_number',
    label: '답변 개수',
    minWidth: '20%',
    align: 'right',
  },
  { id: 'state', label: '채택', align: 'center' },
];
const postcolumns = [
  { id: 'identifier', label: 'No', minWidth: '10%' },
  { id: 'title', label: 'TITLE', align: 'center' },
  {
    id: 'created_date',
    label: '작성 날짜',
    minWidth: '20%',
    align: 'center',
  },
  {
    id: 'comment_number',
    label: '댓글 개수',
    minWidth: '20%',
    align: 'right',
  },
];

const answercolumns = [
  { id: 'question_identifier', label: '질문 No', minWidth: '10%' },
  { id: 'identifier', label: '답변 No', miWidth: '10%', align: 'center' },
  {
    id: 'question_title',
    label: '질문 내용',
    minWidth: '25%',
    align: 'center',
  },
  {
    id: 'content',
    label: '답변 내용',
    minWidth: '25%',
    align: 'center',
  },
  {
    id: 'created_data',
    label: '작성 날짜',
    minWidth: '25%',
    align: 'center',
  },
  {
    id: 'state',
    label: '채택여부',
    align: 'right',
  },
];
const commentcolumns = [
  { id: 'board_identifier', label: '게시글 No', minWidth: '10%' },
  { id: 'identifier', label: '답변 No', minWidth: '10%' },
  {
    id: 'content',
    label: '답변 내용',
    align: 'center',
  },
  {
    id: 'created_date',
    label: '작성 날짜',
    minWidth: '20%',
    align: 'center',
  },
];

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& > *': {
      margin: theme.spacing(1),
    },
    margin: '35px 0 0 0',
  },
  titlebox: { width: '80%', margin: '0 auto' },
  title: {
    flex: '1 1 100%',
  },
  wrapper: {
    width: '85%',
    margin: '0 auto',
    minHeight: '700px',
  },
  inputwrapper: {
    width: '95%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '2%',
    paddingTop: '2%',
  },
  table: {
    width: '65%',
    margin: '0 auto',
    borderBottom: 'none',
    padding: '30px 0px 0px 0px',
  },
  tab: {
    flexGrow: 1,
    width: '85%',
    margin: '0 auto',
  },
}));

export default function ActiveMemberInfo(props) {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: { main: '#49D7F0' },
    },
  });
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <form className={classes.root} noValidate autoComplete="off">
        <Toolbar className={classes.titlebox}>
          <Typography
            className={classes.title}
            variant="h5"
            id="tableTitle"
            component="div"
          >
            회원 활동 조회
          </Typography>
        </Toolbar>
        <Paper className={classes.wrapper}>
          <Toolbar className={classes.inputwrapper}>
            <Typography
              variant="h6"
              id="tableTitle"
              component="div"
            ></Typography>
          </Toolbar>
          <div className={classes.tab} position="static" color="default">
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="질문" {...a11yProps(0)} />
              <Tab label="자유게시판 글" {...a11yProps(1)} />
              <Tab label="답변" {...a11yProps(2)} />
              <Tab label="자유게시판 댓글" {...a11yProps(3)} />
              {localStorage.getItem('roleName') != 'member' && (
                <Tab label="정보게시판 글" {...a11yProps(4)} />
              )}
            </Tabs>
          </div>
          {selectedTab === 0 && (
            <MemberHistory type="question" columns={postcolumns} />
          )}
          {selectedTab === 1 && (
            <MemberHistory type="free" columns={postcolumns} />
          )}
          {selectedTab === 2 && (
            <MemberHistory type="answer" columns={answercolumns} />
          )}
          {selectedTab === 3 && (
            <MemberHistory type="comment" columns={commentcolumns} />
          )}
          {selectedTab === 4 && (
            <MemberHistory type="info" columns={postcolumns} />
          )}
        </Paper>
      </form>
    </MuiThemeProvider>
  );
}
