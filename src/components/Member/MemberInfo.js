import React, { useState, useRef, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Header from '../Common/Header';
import { SettingsInputSvideo } from '@material-ui/icons';
import DatePicker from 'react-datepicker';

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
    if (member.id == id && member.nickName == nickName) {
      alert('변경된 정보가 없어 변경을 하지 않는다.');
    } else {
      alert(nickName + ' ' + phoneNumber);
    }
  };
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Header />
      <div className={classes.table}>
        <h2 className={classes.item}>회원 정보 조회</h2>
        <div className={classes.item}>
          <TextField disabled id="id" label="아이디" defaultValue={id} />
        </div>
        <div className={classes.item}>
          <TextField
            required
            id="nickName"
            label="닉네임"
            value={nickName}
            onChange={onChangeNickName}
          />
          <Button variant="contained" onClick={nickNameReset}>
            닉네임 수정
          </Button>
        </div>
        <div className={classes.item}>
          <TextField disabled id="email" label="이메일" defaultValue={email} />
        </div>
        <div className={classes.item}>
          <TextField
            required
            id="phoneNumber"
            label="연락처"
            value={phoneNumber}
            onChange={onChangePhoneNumber}
          />
          <Button variant="contained" onClick={phoneNumberReset}>
            연락처 수정
          </Button>
        </div>
        <div className={classes.item}>
          <TextField disabled id="grade" label="등급" defaultValue={grade} />
        </div>
        <div className={classes.item}>
          <TextField disabled id="name" label="이름" defaultValue={name} />
        </div>
        <div className={classes.item}>
          <TextField
            disabled
            id="birthday"
            label="생년월일"
            defaultValue={birth}
          />
        </div>
        <div className={classes.item}>
          <Button variant="contained" onClick={updateMemberInfo}>
            수정
          </Button>
        </div>
      </div>
    </form>
  );
}

export default MemberInfo;
