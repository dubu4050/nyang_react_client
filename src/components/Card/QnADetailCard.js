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
import { Link } from 'react-router-dom';
import detailqnaboard from '../../db/detailQna.json';
import axios from 'axios';

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

export default function ComplexGrid(props) {
  const classes = useStyles();
  const detailContent = props.list;
  const identifier = props.identifier;
  const questionContent = detailContent.content;
  const tempStr = '+' + detailContent.createDate;
  const createDate = tempStr.substr(1, 10);
  console.log(detailContent);
  const writerPhoto = detailContent.profile_photo_path;
  // 접근권한 여부
  const currentAccessId = detailContent.isIssuer;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs={12} sm={11} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography className={classes.title}>
                  {detailContent.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  공개 QnA / 동물 :{detailContent.genus} / 종 :{' '}
                  {detailContent.species} / 나이 : {detailContent.age}
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.text}
                  gutterBottom
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: questionContent }}
                  ></div>
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography variant="subtitle1" className={classes.date}>
                작성일 : {createDate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <img src={writerPhoto} className={classes.img} />
                  </Avatar>
                }
                title={detailContent.nickname}
                action={
                  <>
                    {currentAccessId == 'issuer' && (
                      <PostFuncButton
                        list={detailContent}
                        identifier={identifier}
                      />
                    )}
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

function PostFuncButton(props) {
  const classes = useStyles();
  const detailContent = props.list;
  const identifier = props.identifier;
  const ip = process.env.REACT_APP_API_IP;
  // 게시글 삭제
  const deleteQnaBoard = () => {
    axios
      .delete(ip + '/question/' + identifier)
      .then((res) => {
        alert('삭제 완료');
        window.location.href = '/diagnosis/qna';
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Link to="/diagnosis/qna">
        <IconButton className={classes.icon} onClick={deleteQnaBoard}>
          <DeleteForeverOutlinedIcon />
          삭제
        </IconButton>
      </Link>
      <Link
        to={{
          pathname: '/qnaModify',
          state: {
            no: identifier,
            species: detailContent.species,
            age: detailContent.age,
            title: detailContent.title,
            content: detailContent.content,
          },
        }}
      >
        <IconButton className={classes.icon}>
          <CreateOutlinedIcon />
          수정
        </IconButton>
      </Link>
    </div>
  );
}
