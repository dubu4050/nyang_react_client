import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import nyangImg from '../../images/nyangImg.png';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  title: {
    width: '80%',
    margin: '0 auto',
    textAlign: 'center',
    marginBottom: '3%',
  },
  item: {
    width: '80%',
    margin: '0 auto',
    borderBottom: 'none',
    textAlign: 'center',
  },
  btn: {
    margin: theme.spacing(2.5),
    width: '12ch',
  },
  okbtn: {
    width: '85%',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function EnrollMember(props) {
  // ip address
  const ip = process.env.REACT_APP_API_IP;
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
  const [certState, setCertState] = useState(false);
  // dialog창 관련 변수
  const [read, setRead] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    if (certState == true) {
      alert('인증을 완료하였습니다.');
    } else {
      axios
        .get(ip + '/member/cert/email/' + email)
        .then(() => {
          setOpen(true);
          alert('인증번호 요청');
        })
        .catch((err) => {
          console.log(err);
          alert('인증번호 요청 실패');
        });
    }
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
    const body = {
      account: id,
    };
    axios
      .post(ip + '/member/duplicate', body)
      .then(() => {
        alert('사용가능');
      })
      .catch((err) => {
        console.log(err);
        alert('사용 불 가능');
      });
  };
  const EnrollMemberInfo = () => {
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
    const body = {
      account: id,
      password: password,
      name: name,
      nickname: nickName,
      email: email,
      phone_number: phoneNumber,
      date_birth: birth,
    };
    axios
      .post(ip + '/member', body)
      .then(() => {
        alert('회원 가입에 성공하였습니다.');
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err);
        alert('회원 가입에 실패하였습니다.');
      });
  };

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.table}>
          <div className={classes.title}>
            <img src={nyangImg} align="middle" className={classes.nyangImg} />
          </div>
          <div className={classes.item}>
            <TextField
              required
              id="id"
              label="아이디"
              value={id}
              onChange={onChangeId}
              variant="outlined"
            />
            <Button
              variant="contained"
              onClick={onCheckId}
              size="small"
              className={classes.btn}
            >
              중복 확인
            </Button>
          </div>
          <div className={classes.item}>
            <TextField
              type="password"
              required
              id="password"
              label="비밀번호"
              value={password}
              onChange={onChangePassword}
              variant="outlined"
            />
            <Button disabled size="small" className={classes.btn} />
          </div>
          <div className={classes.item}>
            <TextField
              required
              id="nickName"
              label="닉네임"
              value={nickName}
              onChange={onChangeNickName}
              variant="outlined"
            />
            <Button disabled size="small" className={classes.btn} />
          </div>
          <div className={classes.item}>
            {certState == true ? (
              <TextField
                disabled
                id="email"
                label="이메일"
                value={email}
                onChange={onChangeEmail}
                variant="outlined"
              />
            ) : (
              <TextField
                id="email"
                label="이메일"
                value={email}
                onChange={onChangeEmail}
                variant="outlined"
              />
            )}

            <Button
              variant="contained"
              onClick={handleClickOpen}
              size="small"
              className={classes.btn}
            >
              인증요청
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
              variant="outlined"
            />
            <Button disabled size="small" className={classes.btn} />
          </div>
          <div className={classes.item}>
            <TextField
              required
              id="name"
              label="이름"
              value={name}
              size="small"
              onChange={onChangeName}
              variant="outlined"
            />
            <Button disabled size="small" className={classes.btn} />
          </div>
          <form className={classes.item} noValidate>
            <TextField
              id="date"
              label="생년월일"
              type="date"
              defaultValue="2021-01-01"
              className={classes.textField}
              value={birth}
              variant="outlined"
              onChange={onChangeBirth}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button disabled size="small" className={classes.btn} />
          </form>
          <div className={classes.item}>
            <Button
              variant="contained"
              onClick={EnrollMemberInfo}
              className={classes.okbtn}
            >
              회원 가입
            </Button>
          </div>
        </div>
      </form>
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
  );
}

export default EnrollMember;
