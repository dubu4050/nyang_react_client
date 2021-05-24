import React, { useState } from 'react';
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
const columns = [
  { id: 'name', label: '이름', minWidth: 170 },
  { id: 'nick_name', label: '닉네임', miWidth: 170 },
  {
    id: 'phone_number',
    label: '연락처',
    minWidth: 170,
  },
  {
    id: 'date',
    label: '가입 날짜',
    minWidth: 100,
  },
  {
    id: 'authority',
    label: '권한',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, nick_name, phone_number, date, authority) {
  return { name, nick_name, phone_number, date, authority };
}

const rows = [
  createData('India', 'IN', 1324171354, '21.04.12', 'editor'),
  createData('China', 'CN', 1403500365, '21.04.12', 'editor'),
  createData('Italy', 'IT', 60483973, '21.04.12', 'editor'),
  createData('United States', 'US', 327167434, '21.04.12', 'editor'),
  createData('Canada', 'CA', 37602103, '21.04.12', 'editor'),
  createData('Australia', 'AU', 25475400, '21.04.12', 'editor'),
  createData('Germany', 'DE', 83019200, '21.04.12', 'editor'),
  createData('Ireland', 'IE', 4857000, '21.04.12', 'editor'),
  createData('Mexico', 'MX', 126577691, '21.04.12', 'editor'),
  createData('Japan', 'JP', 126317000, '21.04.12', 'editor'),
  createData('France', 'FR', 67022000, '21.04.12', 'editor'),
  createData('United Kingdom', 'GB', 67545757, '21.04.12', 'editor'),
  createData('Russia', 'RU', 146793744, '21.04.12', 'editor'),
  createData('Nigeria', 'NG', 200962417, '21.04.12', 'editor'),
  createData('Brazil', 'BR', 210147125, '21.04.12', 'admin'),
];

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '35px 0 0 0',
  },
  titlebox: { width: '80%', margin: '0 auto' },
  title: {
    flex: '1 1 100%',
  },
  table: {
    width: '80%',
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordFordEdit, setRecordFordEdit] = useState(null);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
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
        <TablePagination
          className={classes.pagination}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </form>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <MemberForm recordFordEdit={recordFordEdit} />
      </Popup>
    </div>
  );
}
