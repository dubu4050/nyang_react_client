import React, { useState, useRef, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import nyangImg from '../../images/nyangImg.png';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { Route } from 'react-router-dom';
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

function MemberInfo() {
  // MemberInfo 관련 변수
  const [member, setMember] = useState({});
  const [nickName, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(true);
  // 프로필 이미지 관련 변수
  const [img, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const ip = process.env.REACT_APP_API_IP;

  useEffect(() => {
    axios
      .get(ip + '/member')
      .then((res) => {
        setMember(res.data.data.memberInfo);
        console.log(res.data);
        setNickname(res.data.data.memberInfo.nickname);
        setPhoneNumber(res.data.data.memberInfo.phone_number);
        setPreviewURL(res.data.data.memberInfo.profile_photo_path);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const classes = useStyles();

  // modal창 관련 변수
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleChangeFile = (e) => {
    const reader = new FileReader();
    if (e.target.files.length != 0) {
      let img = e.target.files[0];
      reader.onloadend = () => {
        setImage(img);
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(img);
    }
  };

  //기본사진으로 변경
  const handleNullFile = () => {
    console.log('냥');
    setPreviewURL(nyangImg);
    const byteString = atob(nyangImg.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], { type: 'image/jpeg' });
    const file = new File([blob], 'image.jpg', {
      type: blob.type,
    });
    setImage(file);
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
    if (
      member.nickname == nickName &&
      member.phone_number == phoneNumber &&
      member.profile_photo_path == previewURL
    ) {
      alert('변경된 정보가 없습니다.');
    } else {
      const form = new FormData();
      form.append('name', member.name);
      form.append('nickname', nickName);
      form.append('phone_number', phoneNumber);
      form.append('date_birth', member.date_birth);
      form.append('file', img);

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      axios
        .put(ip + '/member', form, config)
        .then(() => {
          alert('프로필을 수정 완료');
        })
        .catch((err) => {
          console.log(err);
          alert('프로필을 수정 실패');
        });
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
    axios
      .delete(ip + '/member')
      .then(() => {
        alert('탈퇴 완료');
        handleClose();
        localStorage.clear();
        window.location.replace('/');
      })
      .catch((err) => {
        console.log(err);
        alert('탈퇴 실패');
        handleClose();
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
          {loading ? null : (
            <>
              <div className={classes.profilewrap}>
                <img
                  className={classes.profile}
                  src={previewURL == null ? nyangImg : previewURL}
                ></img>
                <Button variant="contained" component="label">
                  <Typography>{'변경'}</Typography>
                  <input
                    id="imgFile"
                    style={{ display: 'none' }}
                    type="file"
                    name="imgFile"
                    accept="image/jpg,image/png"
                    onChange={handleChangeFile}
                  />
                </Button>
                {/* <input
                  type="file"
                  name="imgFile"
                  id="imgFile"
                  accept="image/jpg,image/png"
                  onChange={handleChangeFile}
                /> */}
                <Button
                  variant="contained"
                  component="label"
                  onClick={handleNullFile}
                  style={{ marginLeft: '10px' }}
                >
                  <Typography>삭제</Typography>
                </Button>
              </div>

              <div className={classes.item}>
                <TextField
                  disabled
                  id="id"
                  label="아이디"
                  defaultValue={member.account}
                />{' '}
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
                  defaultValue={member.email}
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
                <TextField
                  disabled
                  id="name"
                  label="이름"
                  defaultValue={member.name}
                />
                <Button disabled size="small" className={classes.btn} />
              </div>

              <div className={classes.item}>
                <TextField
                  disabled
                  id="birth"
                  label="생년월일"
                  defaultValue={member.date_birth}
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
                  className={classes.okbtn}
                  component={Link}
                  to={{
                    pathname: `/updatePW`,
                    state: {
                      account: member.account,
                    },
                  }}
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
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default MemberInfo;
