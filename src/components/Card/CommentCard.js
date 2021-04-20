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
    alignItems: 'center',
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
  count: {
    overflow: 'auto',
    width: '70%',
    margin: '0 auto',
    padding: '15px 0px 15px 0px',
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
  const reviews = {
    id: 1,
    writer: 'djh20',
    text:
      '그것은 웅대한 관현악이며 미묘한 교향악이다 뼈 끝에 스며들어 가는 열락의 소리다이것은 피어나기 전인 유소년에게서 구하지 못할 바이며 시들어 가는 노년에게서 구하지 못할 바이며 오직 우리 청춘에서만 구할 수 있는 것이다 청춘은 인생의 듣기만 하여도 가슴이 설레는 말이다 청춘! 너의 두손을 가슴에 대고 물방아 같은 심장의 고동을 들어 보라 청춘의 피는 끓는다 끓는 피에 뛰노는 심장은 거선의 기관과 같이 힘있다 이것이다 인류의 역사를 꾸며 내려온',
    password: '1234',
    date: '2021.02.01',
    img: '/src/images/nyangImg.png',
    adoption: '32회',
  };
  return (
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
  );
}
