import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Header from '../Common/Header';
import { SettingsInputSvideo } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  table: {
    width: '20%',
    margin: '0 auto',
    borderBottom: 'none',
  },
}));

function MemberInfo() {
  const classes = useStyles();
  // 비밀번호 변경 관련 변수
  const [changePw, setChangePw] = useState('');
  const [checkPw, setCheckPw] = useState('');
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
    }
  };
  return (
    <div>
      <Header />
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.table}>
          <h2>비밀번호 변경</h2>
          <div>
            <TextField disabled id="id" label="아이디" defaultValue={'1234'} />
          </div>
          <div>
            <TextField
              required
              id="changePw"
              label="변경할 비밀번호"
              value={changePw}
              onChange={onChangePw}
            />
          </div>
          <div>
            <TextField
              required
              id="checkPw"
              label="비밀번호 확인"
              value={checkPw}
              onChange={onChangeCheckPw}
            />
          </div>
          <Button variant="contained" onClick={UpdateMemberPassword}>
            변경
          </Button>
        </div>
      </form>
    </div>
  );
}

export default MemberInfo;
