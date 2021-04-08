import React, { useState, useRef, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import member from '../../db/member.json';
import Header from '../Common/Header.js';
import { SettingsInputSvideo } from '@material-ui/icons';
import DatePicker from 'react-datepicker';

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
  },
  item: {
    width: '80%',
    margin: '0 auto',
    borderBottom: 'none',
    textAlign: 'center',
  },
  btn: {
    margin: theme.spacing(2.5),
    width: '15ch',
  },
  okbtn: {
    width: '85%',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8),
  },
}));

function MemberInfo() {
  const classes = useStyles();
  // MemberInfo 관련 변수
  const [id, setId] = useState(member.id);
  const [nickName, setNickname] = useState(member.nickName);
  const [email, setEmail] = useState(member.email);
  const [phoneNumber, setPhoneNumber] = useState(member.phoneNumber);
  const [grade, setGrade] = useState(member.grade);
  const [name, setName] = useState(member.name);
  const [birth, setBirth] = useState(member.birth);

  // const [startDate, setStartDate] = useState(new Date());
  const onChangeNickName = (e) => {
    setNickname(e.target.value);
  };
  const onChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const nickNameReset = () => {
    setNickname('');
  };
  const phoneNumberReset = () => {
    setPhoneNumber('');
  };
  const updateMemberInfo = () => {
    if (member.nickName == nickName && member.phoneNumber == phoneNumber) {
      alert('변경된 정보가 없습니다.');
    } else if (
      member.nickName != nickName &&
      member.phoneNumber != phoneNumber
    ) {
      alert('닉네임 번호');
    } else {
      if (member.nickName != nickName) {
        alert('닉네임');
      } else {
        alert('전화번호');
      }
    }
  };
  return (
    <div>
      <Header />
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.table}>
          <h1 className={classes.item}>회원 정보 조회</h1>
          <div className={classes.item}>
            <TextField disabled id="id" label="아이디" defaultValue={id} />
            <Button disabled size="small" className={classes.btn} />
          </div>
          <div className={classes.item}>
            <TextField
              required
              id="nickName"
              label="닉네임"
              value={nickName}
              onChange={onChangeNickName}
            />
            <Button
              variant="contained"
              onClick={nickNameReset}
              size="small"
              className={classes.btn}
            >
              닉네임 수정
            </Button>
          </div>
          <div className={classes.item}>
            <TextField
              disabled
              id="email"
              label="이메일"
              defaultValue={email}
            />
            <Button disabled size="small" className={classes.btn} />
          </div>
          <div className={classes.item}>
            <TextField
              required
              id="phoneNumber"
              label="연락처"
              value={phoneNumber}
              onChange={onChangePhoneNumber}
            />
            <Button
              variant="contained"
              onClick={phoneNumberReset}
              size="small"
              className={classes.btn}
            >
              연락처 수정
            </Button>
          </div>
          <div className={classes.item}>
            <TextField disabled id="grade" label="등급" defaultValue={grade} />
            <Button disabled size="small" className={classes.btn} />
          </div>
          <div className={classes.item}>
            <TextField disabled id="name" label="이름" defaultValue={name} />
            <Button disabled size="small" className={classes.btn} />
          </div>
          <div className={classes.item}>
            <TextField
              disabled
              id="birthday"
              label="생년월일"
              defaultValue={birth}
            />
            <Button disabled size="small" className={classes.btn} />
          </div>
          <div className={classes.item}>
            <Button
              variant="contained"
              onClick={updateMemberInfo}
              className={classes.okbtn}
            >
              수정
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MemberInfo;
