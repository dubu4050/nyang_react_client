/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
  btn: {
    margin: theme.spacing(2.5),
    width: '15ch',
  },
  okbtn: {
    width: '50ch',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

function FindPw() {
  const classes = useStyles();
   // ip address
   const ip = process.env.REACT_APP_API_IP;
  // 비밀번호 찾기 관련 변수
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
    // dialog창 관련 변수
  const [certNumber, setCertNumber] = useState('');
  const [open, setOpen] = React.useState(false);
  const onChangeCertNumber = (e) => {
    setCertNumber(e.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);     
  };
  const handleClose = () => {
    setOpen(false);
  };
  const OkBtn = () => {
    const body = {
      type: 'email',
      contact_info: email,
      certification_code: certNumber,
    };
    axios
      .post(ip + '/member/cert/email/', body)
      .then((res) => {
        setCertState(true);
        handleClose();
        window.location.href="/updatePw"
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert('인증번호 확인 실패');
      });
    };
  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const FindMemberPassword = (e) => {
    if (id == '' || name == '' || email == '') {
      alert('필수 항목을 모두 입력하지 않았습니다.');
    } else {
      const body = {
        account: id,
        name: name,
        email: email,
      };
      axios
        .post(ip + '/member/find/password', body)
        .then((res) => {
          alert(res.data.message);
          handleClickOpen();
        })
        .catch((err) => {
          console.log(err);
          alert('못 찾았어요 비밀번호');
        });
    }
  };
  return (
    <div>
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
            onClick={FindMemberPassword}
            className={classes.okbtn}
          >
            인증 메일 발송
          </Button>
          <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="title">이메일 인증</DialogTitle>
        <DialogContent>
          <DialogContentText>인증번호를 아래 입력하세요</DialogContentText>
          <TextField
            id="certNumber"
            autoFocus
            margin="dense"
            id="name"
            type="text"
            style={{ width: '400px' }}
            onChange={onChangeCertNumber}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={OkBtn} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
          
        </div>
      </form>
    </div>
  );
}

export default FindPw;
