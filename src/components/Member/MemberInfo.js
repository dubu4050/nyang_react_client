import React, { useState, useRef, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import member from '../../db/member.json';
import Header from '../Common/Header.js';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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
  header: {
    width: '80%',
    margin: '0 auto',
    borderBottom: '1px solid grey',
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
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8),
    marginRight: theme.spacing(4),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  profilewrap: {
    width: '60%',
    margin: '0 auto',
  },
  profile: {
    width: '150px',
    height: '150px',
    marginTop: '20px',
    marginRight: '20px',
  },
}));

function MemberInfo(props) {
  const classes = useStyles();
  // ip address
  const ip = process.env.REACT_APP_API_IP;
  const user = props.user;
  const history = useHistory();
  console.log(user);
  // MemberInfo 관련 변수
  const [id, setId] = useState(member.id);
  const [nickName, setNickname] = useState(member.nickName);
  const [email, setEmail] = useState(member.email);
  const [phoneNumber, setPhoneNumber] = useState(member.phoneNumber);
  const [name, setName] = useState(member.name);
  const [birth, setBirth] = useState(member.birth);
  // modal창 관련 변수
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  // 프로필 이미지 관련 변수
  const [img, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleChangeFile = (e) => {
    let reader = new FileReader();
    let img = e.target.files[0];
    reader.onloadend = () => {
      setImage(img);
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(img);
  };
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
      const body = {
        name: name,
        nickname: nickName,
        phone_number: phoneNumber,
        date_birth: birth,
      };
      axios
        .put(ip + '/member/' + id, body)
        .then(() => {
          alert('프로필을 수정 완료');
        })
        .catch((err) => {
          console.log(err);
          alert('프로필을 수정 실패');
        });
    } else {
      if (member.nickName != nickName) {
        alert('닉네임');
        axios
          .put(ip + '/member/' + id, { nickname: nickName })
          .then(() => {
            alert('프로필을 수정 완료');
          })
          .catch((err) => {
            console.log(err);
            alert('프로필을 수정 실패');
          });
      } else {
        alert('전화번호');
        axios
          .put(ip + '/member/' + id, { phone_number: phoneNumber })
          .then(() => {
            alert('프로필을 수정 완료');
          })
          .catch((err) => {
            console.log(err);
            alert('프로필을 수정 실패');
          });
      }
    }
  };

  // modal functions
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteMemberInfo = () => {
    alert('회원 탈퇴 정보 전송');
    axios
      .delete(ip + '/member/' + id)
      .then(() => {
        alert('탈퇴 완료');
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        alert('탈퇴 실패');
      });
  };

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <div className={classes.item}>
        <h2>정말 삭제하시겠습니까?</h2>
        <Button
          variant="contained"
          onClick={deleteMemberInfo}
          className={classes.okbtn}
        >
          회원 탈퇴
        </Button>
      </div>
    </div>
  );
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.table}>
          <h2 className={classes.header}>회원 정보 조회/수정</h2>
          <div className={classes.profilewrap}>
            <img className={classes.profile} src={previewURL}></img>
            <input
              type="file"
              name="imgFile"
              id="imgFile"
              accept="image/jpg,image/png"
              onChange={handleChangeFile}
            />
          </div>

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
            <TextField disabled id="name" label="이름" defaultValue={name} />
            <Button disabled size="small" className={classes.btn} />
          </div>
          <div className={classes.item}>
            <TextField
              disabled
              id="birth"
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
              프로필 수정
            </Button>
            <Button
              variant="contained"
              href="/updatePW"
              className={classes.okbtn}
            >
              비밀번호 수정
            </Button>
            <Button
              variant="contained"
              onClick={handleOpen}
              className={classes.okbtn}
            >
              회원 탈퇴
            </Button>
            <Modal open={open} onClose={handleClose}>
              {modalBody}
            </Modal>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MemberInfo;
