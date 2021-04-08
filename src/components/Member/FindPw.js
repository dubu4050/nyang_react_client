import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Header from '../Common/Header.js';
import { SettingsInputSvideo } from '@material-ui/icons';

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

function MemberInfo() {
  const classes = useStyles();
  // 비밀번호 찾기 관련 변수
  const [id, setId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePhoneNumber = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setPhoneNumber(e.target.value);
    }
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const FindMemberPassword = (e) => {
    if (id == '' || phoneNumber == '' || email == '') {
      alert('필수 항목을 모두 입력하지 않았습니다.');
    }
  };
  return (
    <div>
      <Header />
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.table}>
          <h1>비밀번호 찾기</h1>
          <div>
            <TextField
              required
              id="id"
              label="아이디"
              value={id}
              onChange={onChangeId}
            />
          </div>
          <div>
            <TextField
              type="text"
              numberOnly
              required
              id="phoneNumber"
              label="연락처('-' 제외)"
              value={phoneNumber}
              onChange={onChangePhoneNumber}
            />
          </div>
          <div>
            <TextField
              required
              id="email"
              label="이메일"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
          <Button
            variant="contained"
            onClick={FindMemberPassword}
            className={classes.okbtn}
          >
            비밀번호 찾기
          </Button>
        </div>
      </form>
    </div>
  );
}

export default MemberInfo;
