import React, { useState, useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  DialogTitle,
  DialogContent,
  Dialog,
  IconButton,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  FormLabel,
  Radio,
  FormControlLabel,
  RadioGroup,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import axios from 'axios';
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  dialorWapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
  title: { margin: 0, padding: theme.spacing(2) },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  form: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}));

const authorityItems = [
  { id: 'admin', title: '관리자' },
  { id: 'editor', title: '에디터' },
  { id: 'member', title: '회원' },
];

export default function Popup(props) {
  const { recordFordEdit, openPopup, setOpenPopup } = props;
  const ip = process.env.REACT_APP_API_IP;
  const classes = useStyles();
  const [values, setValues] = useState(recordFordEdit);
  const [authority, setAuthority] = useState(values.role);
  console.log(recordFordEdit);
  console.log(authority);

  useEffect(() => {
    if (recordFordEdit != null) {
      setValues({
        ...recordFordEdit,
      });
      setAuthority(recordFordEdit.role);
    }
  }, [recordFordEdit]);

  const handleClose = () => {
    setAuthority(recordFordEdit.role);
    setOpenPopup(false);
  };
  const authorityChange = (e) => {
    setAuthority(e.target.value);
  };
  const updateRole = () => {
    if (values.role == authority) {
      alert('변한게 없네요');
    } else {
      const body = {
        identifier: Number(values.identifier),
        Role: authority.toUpperCase(),
      };
      axios
        .put(ip + '/role_member', body)
        .then((res) => {
          alert('수정완료');
          window.location.href = '/admin';
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setOpenPopup(false);
  };
  return (
    <Dialog
      onClose={handleClose}
      open={openPopup}
      classes={{ paper: classes.dialorWapper }}
    >
      <DialogTitle id="title" className={classes.title}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            회원정보
          </Typography>
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <form className={classes.form}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="이름"
                name="name"
                value={values.account}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                variant="outlined"
                label="닉네임"
                name="nickname"
                value={values.nickname}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                variant="outlined"
                label="가입 날짜"
                name="date_register"
                value={values.date_register}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <FormLabel>권한</FormLabel>
                <RadioGroup
                  row
                  name="role"
                  value={authority}
                  onChange={authorityChange}
                >
                  {authorityItems.map((item, index) => (
                    <FormControlLabel
                      value={item.id}
                      control={<Radio />}
                      label={item.title}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={updateRole} color="primary">
          수정
        </Button>
      </DialogActions>
    </Dialog>
  );
}
