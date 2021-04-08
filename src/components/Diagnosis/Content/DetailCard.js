import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import nyangImg from '../../../images/nyangImg.png';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    '@media (min-device-width: 481px)': {
      // PC
      marginTop: '100px',
    },
    '@media (min-device-width: 320px) and (max-device-width: 480px)': {
      // Mobile
      marginTop: '50px',
    },
  },
  paper: {
    '@media (min-device-width: 481px)': {
      // PC

      padding: '10px',
      margin: 'auto',
      border: '0.8px solid',
      padding: '16px',
      marginTop: '30px',
      borderRadius: '20px',
      width: '70%',
    },
    '@media (min-device-width: 320px) and (max-device-width: 480px)': {
      // Mobile
      padding: '10px',
      width: '100%',
      marginTop: '10px',
      borderRadius: '25px',
      border: '0.8px solid',
    },
  },
  title: {
    '@media (min-device-width: 481px)': {
      // PC
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    '@media (min-device-width: 320px) and (max-device-width: 480px)': {
      // Mobile
      fontSize: '18px',
      fontWeight: 'bold',
    },
  },
  text: {
    marginTop: '3%',
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
  img: {
    width: '40px',
  },
});

export default function ComplexGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography className={classes.title}>
                  우리 애가 자꾸 물어요... 팁 없을까요?
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  공개 QnA / 고양이
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.text}
                  gutterBottom
                >
                  그것은 웅대한 관현악이며 미묘한 교향악이다 뼈 끝에 스며들어
                  가는 열락의 소리다이것은 피어나기 전인 유소년에게서 구하지
                  못할 바이며 시들어 가는 노년에게서 구하지 못할 바이며 오직
                  우리 청춘에서만 구할 수 있는 것이다 청춘은 인생의 듣기만
                  하여도 가슴이 설레는 말이다 청춘! 너의 두손을 가슴에 대고
                  물방아 같은 심장의 고동을 들어 보라 청춘의 피는 끓는다 끓는
                  피에 뛰노는 심장은 거선의 기관과 같이 힘있다 이것이다 인류의
                  역사를 꾸며 내려온
                </Typography>
              </Grid>
              <Grid item>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      <img src={nyangImg} className={classes.img} />
                    </Avatar>
                  }
                  title="dubu4050"
                  subheader=" @dubu4050 고양이 키워본적 없습니다."
                ></CardHeader>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" className={classes.date}>
                2021.02.24
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
