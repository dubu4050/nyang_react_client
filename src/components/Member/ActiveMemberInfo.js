import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import Header from '../Common/Header';
import Box from '@material-ui/core/Box';
import member from '../../db/member.json';

// tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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
  },
  table: {
    width: '65%',
    margin: '0 auto',
    borderBottom: 'none',
    padding: '30px 0px 0px 0px',
  },
  tab: {
    flexGrow: 1,
    width: '20ch',
    backgroundColor: '#49D7F0',
  },
}));

// table(게시글)
const postColumns = [
  { field: 'id', headerName: 'No', width: 80 },
  { field: 'title', headerName: '제목', width: 330 },
  { field: 'createDate', headerName: '작성일시', width: 130 },
  { field: 'category', headerName: '카테고리', width: 130 },
];

const postRows = [
  { id: 1, title: 'Snow', createDate: 'Jon', category: 35 },
  { id: 2, title: 'Snow', createDate: 'Jon', category: 35 },
  { id: 3, title: 'Snow', createDate: 'Jon', category: 35 },
  { id: 4, title: 'Snow', createDate: 'Jon', category: 35 },
  { id: 5, title: 'Snow', createDate: 'Jon', category: 35 },
];

// table(공개 Q&A)
const qaContentColumns = [
  { field: 'id', headerName: 'No', width: 80 },
  { field: 'qaTitleNo', headerName: '글 번호', width: 130 },
  { field: 'content', headerName: '댓글', width: 330 },
  { field: 'createDate', headerName: '작성일시', width: 130 },
  { field: 'selectState', headerName: '채택 여부', width: 130 },
];

const qaContentRows = [
  {
    id: 1,
    qaTitleNo: '우리애가 너무 귀엽죠?',
    content: '치킨',
    createDate: '오늘',
    selectState: '후라이드',
  },
  {
    id: 2,
    qaTitleNo: '우리애가 너무 귀엽죠?',
    content: '치킨',
    createDate: '오늘',
    selectState: '후라이드',
  },
  {
    id: 3,
    qaTitleNo: '우리애가 너무 귀엽죠?',
    content: '치킨',
    createDate: '오늘',
    selectState: '후라이드',
  },
  {
    id: 4,
    qaTitleNo: '우리애가 너무 귀엽죠?',
    content: '치킨',
    createDate: '오늘',
    selectState: '후라이드',
  },
];

// table(자유게시판)
const freeContentColumns = [
  { field: 'id', headerName: 'No', width: 80 },
  { field: 'qaTitleNo', headerName: '글 번호', width: 130 },
  { field: 'content', headerName: '댓글', width: 330 },
  { field: 'createDate', headerName: '작성일시', width: 130 },
];

const freeContentRows = [
  { id: 1, qaTitleNo: '치킨', content: '오늘', createDate: '2020-01-01' },
  { id: 2, qaTitleNo: '피자', content: '내일', createDate: '2020-01-01' },
  { id: 3, qaTitleNo: '순대', content: '매일', createDate: '2020-01-01' },
  { id: 4, qaTitleNo: '순대', content: '매일', createDate: '2020-01-01' },
  { id: 5, qaTitleNo: '순대', content: '매일', createDate: '2020-01-01' },
  { id: 6, qaTitleNo: '순대', content: '매일', createDate: '2020-01-01' },
];

function ActiveMemberInfo(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [checkedItems, setCheckedItems] = useState(new Set());
  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
  };
  const [bChecked, setChecked] = useState(false);

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    checkedItemHandler(postRows.id, target.checked);
  };
  console.log(props.user);
  const DeleteSelectInfo = (props) => {
    alert(checkedItems);
  };
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.table}>
          <h1>회원 활동 조회</h1>
          <h2>아이디 : {props.user} </h2>
          <AppBar classNabe={classes.tab} position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="작성 글" {...a11yProps(0)} />
              <Tab label="공개QA 댓글" {...a11yProps(1)} />
              <Tab label="자유게시판 댓글" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={postRows} columns={postColumns} onpageSize={5} />
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={qaContentRows}
                columns={qaContentColumns}
                pageSize={5}
              />
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={freeContentRows}
                columns={freeContentColumns}
                pageSize={5}
              />
            </div>
          </TabPanel>
        </div>
      </form>
    </div>
  );
}

export default ActiveMemberInfo;
