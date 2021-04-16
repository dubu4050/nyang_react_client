import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { SettingsInputSvideo } from '@material-ui/icons';
import Header from '../Common/Header';

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
  result: {
    position: 'relative',
    left: '38%',
  },
  okbtn: {
    width: '50ch',
    marginTop: theme.spacing(4),
  },
}));

function MemberInfo() {
  const classes = useStyles();
  // 아이디 찾기 관련 변수
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const FindMemberId = () => {
    if (name == '' || email == '') {
      alert('필수 항목을 모두 입력하지 않았습니다.');
    } else {
      alert(name + ' ' + +email);
      setId('회원님의 아이디는 ' + name + ' 입니다.');
    }
  };
  return (
    <div>
      <Header />
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.table}>
          <h1>계정 찾기</h1>
          <div>
            <TextField
              required
              id="name"
              label="이름"
              value={name}
              onChange={onChangeName}
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
            onClick={FindMemberId}
            className={classes.okbtn}
          >
            아이디 찾기
          </Button>
        </div>
        <h2 className={classes.table}> {id} </h2>
      </form>
    </div>
  );
}

export default MemberInfo;
