import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import nyangImg from '../../img/nyangImg.png';
import { CenterFocusStrong } from '@material-ui/icons';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  header: {
    width: '70%',
    margin: '0 auto',
    borderBottom: 'none',
    padding: '3px 0px 0px 0px',
  },
  nyangImg: {
    marginRight: theme.spacing(2),
    width: '70px',
    float: 'left',
  },
  loginInfo: {
    width: '80%',
    margin: '0 auto',
    padding: '0px 0px 20px 40px',
    borderBottom: 'none',
  },
  loginButton: {
    width: '70%',
    margin: '0 auto',
    padding: '0px 0px 0px 14px',
    borderBottom: 'none',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Login() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  // Login 관련 변수
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const LoginClick = () => {
    if (id == '' || password == '') {
      alert('아이디 또는 비밀번호를 입력하지 않았습니다.');
    } else {
      alert(id + ' ' + password);
    }
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className={classes.header}>
        <img src={nyangImg} className={classes.nyangImg}></img>
        <h1>개아프냥</h1>
      </div>
      <div className={classes.loginInfo}>
        <TextField
          required
          id="id"
          label="아이디"
          value={id}
          onChange={onChangeId}
        />
        <TextField
          required
          id="pw"
          label="비밀번호"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className={classes.loginButton}>
        <Button variant="contained" onClick={LoginClick}>
          로그인
        </Button>
        <Button variant="contained" href="/enroll">
          회원 가입
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
export default Login;
