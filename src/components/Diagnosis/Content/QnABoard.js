import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  IconButton,
  InputBase,
  makeStyles,
  Button,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from '@material-ui/icons/Create';
import QnACard from '../../Card/QnACard';

const useStyles = makeStyles((theme) => ({
  wrap: {},
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '2%',
  },
  chipList: {
    display: 'flex',
  },
  input: {
    height: '50px',
    border: '2px solid #dedede',
    borderRadius: '25px',
    marginRight: '0.5%',
  },
  placeholderStyle: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  icon: {
    pointerEvents: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    height: '46px',
    width: '30px',
    opacity: '0.8',
    border: 'none',
    background: 'none',
    marginRight: '0.5%',
    marginLeft: '0.5%',
  },
}));

export default function QnABoard(props) {
  const classes = useStyles();
  const ip = process.env.REACT_APP_API_IP;
  const [question, setQuestion] = useState('');
  const [qnaList, setQnaList] = useState([]);

  const onChangeQuestion = (e) => {
    setQuestion(e.target.value);
  };

  // 전체 Qna 리스트 조회
  const totalQnABoard = () => {
    axios
      .get(ip + '/question')
      .then((res) => {
        setQnaList(res.data.data);
      })
      .catch((err) => {
        alert('요청 실패');
      });
  };
  useEffect(() => {
    totalQnABoard();
  }, []);

  // QnA 검색
  const searchQnaBoard = () => {
    if (question == '') {
      alert('글 제목을 입력해주세요');
    } else {
      const body = {
        keyword: question,
      };
      axios
        .post(ip + '/question/search', body)
        .then((res) => {
          setQnaList(res.data.data);
        })
        .catch((err) => {
          console.log(err);
          alert('검색 실패');
        });
    }
  };

  return (
    <Container className={classes.wrap}>
      <Container className={classes.wrapper}>
        <InputBase
          className={classes.input}
          placeholder="Search…"
          classes={{
            input: classes.placeholderStyle,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={onChangeQuestion}
        />
        <IconButton aria-label="serach" onClick={searchQnaBoard}>
          <SearchIcon className={classes.icon} />
        </IconButton>
        {axios.defaults.headers.common.Authorization != undefined && (
          <IconButton href="/qnaWrite">
            <CreateIcon className={classes.icon} />
          </IconButton>
        )}
      </Container>
      <QnACard list={qnaList} />
    </Container>
  );
}
