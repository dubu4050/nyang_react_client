import React from 'react';
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
} from '@material-ui/core';
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    borderTop: '0.8px solid #dedede',
    '@media (min-device-width: 481px)': {
      // PC
      marginTop: '30px',
    },
    '@media (min-device-width: 320px) and (max-device-width: 480px)': {
      // Mobile
      marginTop: '15px',
    },
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
  img: { width: '40px' },
  check: {
    color: 'red',
    width: '40px',
  },
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
  const commentList = props.list;
  console.log('댓글목록');
  console.log(commentList);
  const reviews = {
    id: 1,
    writer: '고양이 집사',
    text: '구토의 원인은 많아서 병원을 가봐야 할 것 같습니다...',
    password: '1234',
    date: '2021.02.01',
    img: '/src/images/nyangImg.png',
    adoption: 1,
  };

  return (
    <div className={classes.root}>
      <div className={classes.count}>
        <strong>답변 </strong>
        <strong>1</strong>
      </div>
      {commentList.map((comment) => (
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        <img src={reviews.img} className={classes.img} />
                      </Avatar>
                    }
                    title={comment.nickname}
                    subheader={'채택횟수: ' + reviews.adoption}
                    action={
                      <CheckOutlinedIcon
                        fontSize="large"
                        style={{ color: '#49D7F0' }}
                      />
                    }
                  ></CardHeader>
                  <Typography variant="body1" className={classes.text}>
                    {comment.content}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton className={classes.icon}>
                    <DeleteForeverOutlinedIcon />
                    삭제
                  </IconButton>
                  <IconButton className={classes.icon}>
                    <CreateOutlinedIcon />
                    수정
                  </IconButton>
                  <IconButton className={classes.icon}>
                    <DoneAllOutlinedIcon />
                    채택
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      <img src={reviews.img} className={classes.img} />
                    </Avatar>
                  }
                  title={reviews.writer}
                  subheader={'채택횟수: ' + reviews.adoption}
                  action={
                    <CheckOutlinedIcon
                      fontSize="large"
                      style={{ color: '#49D7F0' }}
                    />
                  }
                ></CardHeader>
                <Typography variant="body1" className={classes.text}>
                  {reviews.text}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton className={classes.icon}>
                  <DeleteForeverOutlinedIcon />
                  삭제
                </IconButton>
                <IconButton className={classes.icon}>
                  <CreateOutlinedIcon />
                  수정
                </IconButton>
                <IconButton className={classes.icon}>
                  <DoneAllOutlinedIcon />
                  채택
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
