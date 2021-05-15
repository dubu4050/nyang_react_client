import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Header from '../Common/Header.js';
import { SettingsInputSvideo } from '@material-ui/icons';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '50ch',
    },
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  table: {
    width: '50%',
    margin: '0 auto',
    borderBottom: 'none',
    padding: '30px 0px 0px 0px',
    textAlign: 'center',
  },
  okbtn: {
    width: '50ch',
    marginTop: theme.spacing(4),
  },
}));

function UpdatePw() {
  const classes = useStyles();
  // ip address
  const ip = process.env.REACT_APP_API_IP;
  // 비밀번호 변경 관련 변수
  const [account, setAccount] = useState('');
  const [changePw, setChangePw] = useState('');
  const [checkPw, setCheckPw] = useState('');
  const onChangeAccount = (e) => {
    setAccount(e.target.value);
  };
  const onChangePw = (e) => {
    setChangePw(e.target.value);
  };
  const onChangeCheckPw = (e) => {
    setCheckPw(e.target.value);
  };

  const UpdateMemberPassword = () => {
    if (changePw == '' || checkPw == '') {
      alert('비밀번호를 입력하세요.');
    } else if (changePw != checkPw) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      const body = {
        account: account,
        password: changePw,
      };
      axios
        .patch(ip + '/member/find/password', body)
        .then(() => {
          alert('비밀번호가 변경되었습니다.');
          window.location.href = '/';
        })
        .catch((err) => {
          console.log(err);
          alert('비밀번호 변경에 실패하였습니다.');
        });
    }
  };
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.table}>
          <h1>비밀번호 변경</h1>
          <div>
            <TextField
              required
              id="account"
              label="아이디"
              value={account}
              onChange={onChangeAccount}
            />
          </div>
          <div>
            <TextField
              type="password"
              required
              id="changePw"
              label="변경할 비밀번호"
              value={changePw}
              onChange={onChangePw}
            />
          </div>
          <div>
            <TextField
              type="password"
              required
              id="checkPw"
              label="비밀번호 확인"
              value={checkPw}
              onChange={onChangeCheckPw}
            />
          </div>
          <Button
            variant="contained"
            onClick={UpdateMemberPassword}
            className={classes.okbtn}
          >
            변경
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePw;
