import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../Common/Header';
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
import MemberForm from './MemberForm';
import axios from 'axios';
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
  table: {
    width: '70%',
    margin: '0 auto',
    borderBottom: 'none',
    maxHeight: 440,
    outline: 'none',
  },
  pagination: {
    width: '65%',
  },
}));

export default function Admin() {
  const classes = useStyles();
  const ip = process.env.REACT_APP_API_IP;
  const [memberList, setMemberList] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordFordEdit, setRecordFordEdit] = useState(initialForm);
  console.log(recordFordEdit);

  const getMemberList = () => {
    axios
      .get(ip + '/role_member')
      .then((res) => {
        console.log(res.data.data);
        setMemberList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getMemberList();
  }, []);

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
        <TableContainer>
          <Table size="small" className={classes.table}>
            <TableHead className={classes.thead}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, textWeight: 'bold' }}
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
      </form>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        recordFordEdit={recordFordEdit}
      />
      {/* <MemberForm recordFordEdit={recordFordEdit} />
      </Popup> */}
    </div>
  );
}
