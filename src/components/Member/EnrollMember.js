import React, { useState, useRef, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Header from '../Common/Header';
import { SettingsInputSvideo } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  table: {
    width: '50%',
    margin: '0 auto',
    borderBottom: 'none',
    padding: '30px 0px 0px 0px',
  },
  item: {
    width: '50%',
    margin: '0 auto',
    borderBottom: 'none',
  },
}));

function EnrollMember() {
  const classes = useStyles();

  // EnrollMember 관련 변수
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [certNumber, setCertNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeNickName = (e) => {
    setNickName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeCertNumber = (e) => {
    setCertNumber(e.target.value);
  };
  const onChangePhoneNumber = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setPhoneNumber(e.target.value);
    }
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeBirth = (e) => {
    setBirth(e.target.value);
  };
  const onCheckId = () => {
    // id 중복 확인
    alert('사용가능');
  };
  const onCheckEmail = () => {
    // emial 인증 요청
  };
  const onCheckEmailCertNumber = () => {
    // email 인증 번호 일치 확인
  };
  const EnrollMemberInfo = () => {
    // 회원 가입 처리
    if (
      id == '' ||
      password == '' ||
      nickName == '' ||
      email == '' ||
      certNumber == '' ||
      phoneNumber == '' ||
      name == ''
    ) {
      alert('필수 항목을 모두 입력하지 않았습니다.');
    }
  };
  return (
    <div>
      <Header />
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.table}>
          <h1 className={classes.item}>회원 가입</h1>
          <div className={classes.item}>
            <TextField
              required
              id="id"
              label="아이디"
              value={id}
              onChange={onChangeId}
            />
            <Button variant="contained" onClick={onCheckId} color="primary">
              중복 확인
            </Button>
          </div>
          <div className={classes.item}>
            <TextField
              required
              id="password"
              label="비밀번호"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          <div className={classes.item}>
            <TextField
              required
              id="nickName"
              label="닉네임"
              value={nickName}
              onChange={onChangeNickName}
            />
          </div>
          <div className={classes.item}>
            <TextField
              required
              id="email"
              label="이메일"
              value={email}
              onChange={onChangeEmail}
            />
            <Button variant="contained" onClick={onCheckEmail} color="primary">
              인증요청
            </Button>
          </div>
          <div className={classes.item}>
            <TextField
              required
              id="certNumber"
              label="인증번호"
              value={certNumber}
              onChange={onChangeCertNumber}
            />
            <Button
              variant="contained"
              onClick={onCheckEmailCertNumber}
              color="primary"
            >
              확인
            </Button>
          </div>
          <div className={classes.item}>
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
          <div className={classes.item}>
            <TextField
              required
              id="name"
              label="이름"
              value={name}
              onChange={onChangeName}
            />
          </div>
          <form className={classes.item} noValidate>
            <TextField
              id="date"
              label="생년월일"
              type="date"
              defaultValue="2021-01-01"
              className={classes.textField}
              value={birth}
              onChange={onChangeBirth}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
          <div className={classes.item}>
            <Button
              variant="contained"
              onClick={EnrollMemberInfo}
              color="primary"
            >
              회원 가입
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EnrollMember;
