import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import nyangImg from '../../images/nyangImg.png';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { Link } from '@material-ui/core';

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

export default function ComplexGrid() {
  const classes = useStyles();

  const ip = process.env.REACT_APP_API_IP;
  // 게시글 삭제(권한 검사는 이미 완료된 상태)
  const deletePostBoard = () => {
    // axios.delete(ip+'/question/'+'게시글id').then((res) => {
    //   alert('삭제 완료');
    //   <Link href='/diagnosis/qna'></Link>
    // }).catch((err) => {
    //   alert('삭제 실패');
    // });
    alert('삭제 완료');
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs={12} sm={11} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography className={classes.title}>게시판제목</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  날짜
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
                  역사를 꾸며 내려온 그것은 웅대한 관현악이며 미묘한 교향악이다
                  뼈 끝에 스며들어 가는 열락의 소리다이것은 피어나기 전인
                  유소년에게서 구하지 못할 바이며 시들어 가는 노년에게서 구하지
                  못할 바이며 오직 우리 청춘에서만 구할 수 있는 것이다 청춘은
                  인생의 듣기만 하여도 가슴이 설레는 말이다 청춘! 너의 두손을
                  가슴에 대고 물방아 같은 심장의 고동을 들어 보라 청춘의 피는
                  끓는다 끓는 피에 뛰노는 심장은 거선의 기관과 같이 힘있다
                  이것이다 인류의 역사를 꾸며 내려온 그것은 웅대한 관현악이며
                  미묘한 교향악이다 뼈 끝에 스며들어 가는 열락의 소리다이것은
                  피어나기 전인 유소년에게서 구하지 못할 바이며 시들어 가는
                  노년에게서 구하지 못할 바이며 오직 우리 청춘에서만 구할 수
                  있는 것이다 청춘은 인생의 듣기만 하여도 가슴이 설레는 말이다
                  청춘! 너의 두손을 가슴에 대고 물방아 같은 심장의 고동을 들어
                  보라 청춘의 피는 끓는다 끓는 피에 뛰노는 심장은 거선의 기관과
                  같이 힘있다 이것이다 인류의 역사를 꾸며 내려온
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <img src={nyangImg} className={classes.img} />
                  </Avatar>
                }
                title="dubu4050"
                subheader=" @dubu4050 고양이 키워본적 없습니다.111111"
                action={
                  <>
                    <Link href="/board/info">
                      <IconButton className={classes.icon}>
                        <DeleteForeverOutlinedIcon />
                        삭제
                      </IconButton>
                    </Link>
                    <IconButton className={classes.icon}>
                      <CreateOutlinedIcon />
                      수정
                    </IconButton>
                  </>
                }
              ></CardHeader>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
