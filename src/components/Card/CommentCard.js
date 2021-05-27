import React, { useState, useRef, useEffect } from 'react';
import dummy from '../../db/review.json';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  ButtonBase,
  CardHeader,
  Avatar,
  TextField,
} from '@material-ui/core';
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import nyangImg from '../../images/nyangImg.png';
import axios from 'axios';
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  count: {
    overflow: 'auto',
    width: '70%',
    margin: '0 auto',
    padding: '15px 0px 15px 0px',
  },
  paper: {
    boxShadow: 'none',
    borderBottom: '0.8px solid #dedede',
    '@media (min-device-width: 481px)': {
      // PC

      padding: '10px',
      margin: 'auto',
      padding: '16px',
      marginBottom: '30px',
      borderRadius: '20px',
      width: '70%',
    },
    '@media (min-device-width: 320px) and (max-device-width: 480px)': {
      // Mobile
      padding: '10px',
      width: '100%',
      marginBottom: '15px',
      borderRadius: '25px',
      border: '0.8px solid',
    },
  },
  text: {
    width: '100%',
    margin: '0 auto',
  },
  date: {
    '@media (min-device-width: 481px)': {
      // PC
      fontWeight: 'bold',
    },
    '@media (min-device-width: 320px) and (max-device-width: 480px)': {
      // Mobile
      fontSize: '0.7rem',
      fontWeight: 'bold',
    },
  },
  writer: {
    fontWeight: 'bold',
  },
  content: {
    width: '100%',
  },
  img: { width: '40px' },
  check: {
    color: 'red',
    width: '40px',
  },
  select_state: { float: 'right' },
  icon: {
    float: 'right',
    fontSize: '14px',
    '&:focus': {
      color: '#49D7F0',
    },
    '&:selected': {
      color: '#49D7F0',
    },
  },
});

export default function commentCard(props) {
  const classes = useStyles();
  const ip = process.env.REACT_APP_API_IP;
  const postIdentifier = props.postIdentifier;
  const comment = props.comment;
  const post_state = props.post_state;
  const profile = comment.profile_photo_path;
  const type = props.type;
  const [content, setContent] = useState(comment.content);
  const [update_state, setUpdateState] = useState(false);
  const [select_state, setSelectState] = useState(comment.select_state);
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const changeUpdateState = (e) => {
    if (update_state == false) {
      setUpdateState(true);
    } else {
      setUpdateState(false);
    }
  };
  //수정,삭제,채택
  const updateComment = (e) => {
    const body = { content: content };
    axios
      .put(ip + '/' + type + '/' + comment.identifier, body)
      .then((res) => {
        if (type == 'answer') {
          window.location.replace('/detailQnA/' + postIdentifier);
        } else {
          window.location.replace('/detailBoard/' + postIdentifier);
        }
      })
      .catch((err) => {
        console.log(err);
        alert('답변 수정 실패');
      });
  };
  const deleteComment = (e) => {
    axios
      .delete(ip + '/' + type + '/' + comment.identifier)
      .then((res) => {
        if (type == 'answer') {
          window.location.replace('/detailQnA/' + postIdentifier);
        } else {
          window.location.replace('/detailBoard/' + postIdentifier);
        }
      })
      .catch((err) => {
        console.log(err);
        alert('답변 삭제 실패');
      });
  };
  const adoptComment = (e) => {
    if (post_state != 'none') {
      alert('채택 완료된 질문 입니다.');
    } else {
      axios
        .get(ip + '/answer/adopt/' + postIdentifier, {
          params: { answerIdentifier: comment.identifier },
        })
        .then((res) => {
          setSelectState('done');
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  <img
                    src={profile == null ? nyangImg : profile}
                    className={classes.img}
                  />
                </Avatar>
              }
              title={comment.nickname}
              subheader={
                type == 'answer'
                  ? '채택횟수: ' + comment.memberIdentifier
                  : null
              }
            ></CardHeader>
          </Grid>
          <Grid item sm={7} container>
            <Typography variant="body1" className={classes.text}>
              <Typography variant="body1" className={classes.text}>
                {update_state == false ? (
                  comment.content
                ) : (
                  <TextField
                    id="content"
                    multiline
                    color="primary"
                    defaultValue={comment.content}
                    className={classes.content}
                    onChange={onChangeContent}
                  />
                )}
              </Typography>
            </Typography>
          </Grid>

          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              {type == 'comment' || select_state == 'none' ? null : (
                <CheckOutlinedIcon
                  className={classes.select_state}
                  fontSize="large"
                  style={{ color: '#49D7F0' }}
                />
              )}
            </Grid>{' '}
            {update_state == false ? (
              <Grid item>
                <IconButton className={classes.icon} onClick={deleteComment}>
                  <DeleteForeverOutlinedIcon />
                  삭제
                </IconButton>
                <IconButton
                  className={classes.icon}
                  onClick={changeUpdateState}
                >
                  <CreateOutlinedIcon />
                  수정
                </IconButton>
                {type == 'comment' ? null : (
                  <IconButton className={classes.icon} onClick={adoptComment}>
                    <DoneAllOutlinedIcon />
                    {select_state == 'none' ? '채택' : '채택취소'}
                  </IconButton>
                )}
              </Grid>
            ) : (
              <Grid item>
                <IconButton className={classes.icon} onClick={updateComment}>
                  <CreateOutlinedIcon />
                  등록
                </IconButton>
                <IconButton
                  className={classes.icon}
                  onClick={changeUpdateState}
                >
                  <CancelOutlinedIcon />
                  취소
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
