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

export default function MemberHistory(props) {
  const classes = useStyles();
  const ip = process.env.REACT_APP_API_IP;
  const [list, setList] = useState([]);
  const type = props.type;
  const columns = props.columns;
  console.log(type);
  console.log(props);

  //pagination
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [pageNumberLimit, setPageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  //멤버리스트 조회
  const getList = (currentPage = 1) => {
    axios
      .get(
        ip +
          '/' +
          type +
          '/history?page=' +
          currentPage +
          '&perPage=' +
          perPage,
      )
      .then((res) => {
        setList(res.data.data);
        setTotalPages(res.data.totalPage);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getList();
  }, []);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
    getList(e.target.id);
  };

  const handleNextbtn = () => {
    if (currentPage != pages[pages.length - 1]) {
      setcurrentPage(currentPage + 1);

      if (currentPage + 1 > maxPageNumberLimit) {
        setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
      getList(currentPage + 1);
    }
  };

  const handlePrevbtn = () => {
    if (currentPage != pages[0]) {
      setcurrentPage(currentPage - 1);

      if ((currentPage - 1) % pageNumberLimit == 0) {
        setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
      getList(currentPage - 1);
    }
  };

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

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  console.log(list);
  return (
    <div>
      <TableContainer className={classes.tablewrap}>
        <Table size="small" className={classes.table}>
          <TableHead className={classes.thead}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ width: column.width, fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => {
              return (
                <StyledTableRow
                  hover
                  role="button"
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
    </div>
  );
}
