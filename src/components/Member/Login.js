import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import nyangImg from '../../images/nyangImg.png';
import { CallMissedSharp, CenterFocusStrong } from '@material-ui/icons';
import Header from '../Common/Header.js';
import { Container, Typography } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: '500px',
    alignItems: 'center',
    marginBottom: '2%',
  },
  header: {
    overflow: 'hidden',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  nyangImg: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  loginInfo: {
    margin: '0 auto',
    borderBottom: 'none',
    verticalAlign: 'middle',
    marginTop: '8%',
  },
  title: {},
  pw: {},
  textfield: { width: '300px' },
  loginButton: {
    margin: '0 auto',
    marginTop: '2%',
    padding: '0px 0px 0px 0px',
    borderBottom: 'none',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  btn: { width: '300px' },
}));

function Login() {
  // ip address
  const ip = process.env.REACT_APP_API_IP;
  const classes = useStyles();

  // Login 관련 변수
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const LoginClick = (e) => {
    e.preventDefault();
    if (id == '' || password == '') {
      alert('아이디 또는 비밀번호를 입력하지 않았습니다.');
    } else {
      const body = {
        account: id,
        password: password,
      };
      axios
        .post(ip + '/login', body)
        .then((res) => {
          console.log(res.data.data.token);
          localStorage.setItem('token', res.data.data.token);
          window.location.replace('/');
        })
        .catch((err) => {
          console.log(err);
          alert('로그인 실패');
        });
    }
  };

  return (
    <div>
      <Container align="center" className={classes.wrapper}>
        <div className={classes.loginInfo}>
          <div className={classes.header}>
            <img src={nyangImg} align="middle" className={classes.nyangImg} />
          </div>
          <div className={classes.id}>
            <TextField
              required
              id="id"
              label="아이디"
              value={id}
              className={classes.textfield}
              onChange={onChangeId}
            />
          </div>
          <div className={classes.pw}>
            <TextField
              required
              id="pw"
              label="비밀번호"
              value={password}
              className={classes.textfield}
              onChange={onChangePassword}
            />
          </div>
          <div className={classes.loginButton}>
            <Button
              variant="contained"
              onClick={LoginClick}
              className={classes.btn}
            >
              로그인
            </Button>
          </div>
          <Button href="/findId">계정 찾기</Button>
          <Button href="/findPw">비밀번호 찾기</Button>
          <Button href="/enroll">회원 가입</Button>
        </div>
      </Container>
    </div>
  );
}
export default Login;
