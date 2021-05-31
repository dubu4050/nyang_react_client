import React, { useState, useEffect } from 'react';
import {
  Container,
  InputBase,
  makeStyles,
  IconButton,
  Button,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from '@material-ui/icons/Create';
import BoardCard from '../../Card/BoardCard';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '2%',
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

export default function FreeBoardContent(props) {
  const classes = useStyles();
  const ip = process.env.REACT_APP_API_IP;
  const [question, setQuestion] = useState('');
  var [freeBoardList, setFreeBoardList] = useState([]);
  const onChangeQuestion = (e) => {
    setQuestion(e.target.value);
  };

  // 전체 자유게시판 리스트 조회
  const totalFreeBoard = () => {
    axios
      .get(ip + '/free')
      .then((res) => {
        setFreeBoardList(res.data.data);
      })
      .catch((err) => {
        alert('요청 실패');
      });
  };
  useEffect(() => {
    totalFreeBoard();
  }, []);
  // 자유게시판 검색
  const searchFreeBoard = () => {
    if (question == '') {
      alert('글 제목을 입력해주세요');
    } else {
      const body = {
        keyword: question,
      };
      axios
        .post(ip + '/free/search', body)
        .then((res) => {
          setFreeBoardList(res.data.data);
        })
        .catch((err) => {
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
        <IconButton aria-label="serach" onClick={searchFreeBoard}>
          <SearchIcon className={classes.icon} />
        </IconButton>
        <IconButton href="/boardWrite">
          <CreateIcon className={classes.icon} />
        </IconButton>
      </Container>
      <BoardCard list={freeBoardList} />
    </Container>
  );
}
