import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Popup from '../Common/Popup';
import axios from 'axios';
import { InputBase, Button, Paper } from '@material-ui/core';
const columns = [
  { id: 'account', label: '아이디', minWidth: '25%' },
  { id: 'nickname', label: '닉네임', miWidth: '25%', align: 'center' },
  {
    id: 'date_register',
    label: '가입 날짜',
    minWidth: '25%',
    align: 'center',
  },
  {
    id: 'role',
    label: '권한',
    minWidth: '25%',
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];
const initialForm = {
  account: '',
  date_register: '',
  identifier: '',
  nickname: '',
  role: '',
};
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '35px 0 0 0',
  },
  titlebox: { width: '80%', margin: '0 auto' },
  title: {
    flex: '1 1 100%',
  },
  thead: { fontWeight: 'bold' },
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
    width: '90%',
    margin: '0 auto',
    borderBottom: 'none',
    maxHeight: 440,
    outline: 'none',
  },
  input: {
    height: '50px',
    border: '2px solid #dedede',
    borderRadius: '25px',
    marginRight: '0.5%',
  },
  placeholderStyle: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  pagination: {
    width: '90%',
    margin: '0 auto',
    marginTop: '33px',
  },
  pageNumbers: {
    listStyle: 'none',
    display: 'flex',
    margin: '0 auto',
    width: 'fit-content',
    '& li': {
      padding: '15px',
      cursor: 'pointer',
      height: '50px',
      borderRadius: '2rem',
      margin: '10px',
      backgroundColor: theme.palette.action.hover,
      '&.active': { color: '#49D7F0' },
      '& button': {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'black',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'white',
          color: '#49D7F0',
        },
        '&:focus': {
          outline: 'none',
        },
      },
    },
  },
}));

export default function Admin() {
  const classes = useStyles();
  const ip = process.env.REACT_APP_API_IP;
  const [memberList, setMemberList] = useState([]);
  const [keyword, setKeyword] = useState('');

  //팝업창 관련
  const [openPopup, setOpenPopup] = useState(false);
  const [recordFordEdit, setRecordFordEdit] = useState(initialForm);

  //pagination
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(1);
  const [pageNumberLimit, setPageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  //멤버리스트 조회
  const getMemberList = (currentPage = 1) => {
    axios
      .get(ip + '/role_member?page=' + currentPage + '&perPage=' + perPage)
      .then((res) => {
        console.log(res.data.data);
        setMemberList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTotalPage();
    getMemberList();
  }, []);

  const onChangeQuestion = (e) => {
    setKeyword(e.target.value);
  };

  const search = () => {
    const body = {
      keyword: keyword,
    };
    axios.post(ip + '/role_member/search', body).then((res) => {
      console.log(res.data.data);
      setTotalPages(Math.ceil(res.data.data.length / perPage));
    });
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    searchMemberList(1);
  };

  const searchMemberList = (currentPage = 1) => {
    const body = {
      keyword: keyword,
    };
    axios
      .post(
        ip + '/role_member/search?page=' + currentPage + '&perPage=' + perPage,
        body,
      )
      .then((res) => {
        setMemberList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //페이지 설정
  const getTotalPage = () => {
    axios.get(ip + '/role_member?').then((res) => {
      console.log(res.data.data);
      setTotalPages(Math.ceil(res.data.data.length / perPage));
    });
  };
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
    if (keyword != '') {
      searchMemberList(e.target.id);
    } else {
      getMemberList(e.target.id);
    }
  };

  const handleNextbtn = () => {
    if (currentPage != pages[pages.length - 1]) {
      setcurrentPage(currentPage + 1);

      if (currentPage + 1 > maxPageNumberLimit) {
        setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }

      if (keyword != '') {
        searchMemberList(currentPage + 1);
      } else {
        getMemberList(currentPage + 1);
      }
    }
  };

  const handlePrevbtn = () => {
    if (currentPage != pages[0]) {
      setcurrentPage(currentPage - 1);

      if ((currentPage - 1) % pageNumberLimit == 0) {
        setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
      if (keyword != '') {
        searchMemberList(currentPage - 1);
      } else {
        getMemberList(currentPage - 1);
      }
    }
  };
  console.log(pages[0]);

  console.log(pages[pages.length - 1]);
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? 'active' : null}
        >
          {number}
        </li>
      );
    } else return null;
  });

  //팝업창
  const openInPopup = (item) => {
    setRecordFordEdit(item);
    setOpenPopup(true);
  };

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <Toolbar className={classes.titlebox}>
          <Typography
            className={classes.title}
            variant="h5"
            id="tableTitle"
            component="div"
          >
            회원 조회
          </Typography>
        </Toolbar>
        <Paper className={classes.wrapper}>
          <Toolbar className={classes.inputwrapper}>
            <InputBase
              className={classes.input}
              placeholder="Search…"
              classes={{
                input: classes.placeholderStyle,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={onChangeQuestion}
            />
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={search}
            >
              검색
            </Button>
          </Toolbar>
          <TableContainer className={classes.tablewrap}>
            <Table size="small" className={classes.table}>
              <TableHead className={classes.thead}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {memberList.map((row) => {
                  return (
                    <StyledTableRow
                      hover
                      role="button"
                      onClick={() => openInPopup(row)}
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.pagination}>
            <ul className={classes.pageNumbers}>
              <li onClick={handlePrevbtn}>&nbsp;Prev</li>

              {renderPageNumbers}

              <li onClick={handleNextbtn}>Next&nbsp;</li>
            </ul>
          </div>
        </Paper>
      </form>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        recordFordEdit={recordFordEdit}
      />
    </div>
  );
}
