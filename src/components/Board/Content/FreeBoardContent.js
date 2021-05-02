import React, { useState } from 'react';
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
    // axios
    //   .get(ip + '/board')
    //   .then((res) => {
    //     alert('요청 성공');
    //     setFreeBoardList();
    //   })
    //   .catch((err) => {
    //     alert('요청 실패');
    //   });
  };

  // 자유게시판 검색
  const searchFreeBoard = () => {
    if (question == '') {
      alert('글 제목을 입력해주세요');
    } else {
      const body = {
        content: question,
      };
      alert(question);
      // axios
      //   .get(ip + '/board', body)
      //   .then((res) => {
      //     alert('검색 성공');
      //     setFreeBoardList();
      //   })
      //   .catch((err) => {
      //     alert('검색 실패');
      //   });
    }
  };
  totalFreeBoard();
  return (
    <Container>
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
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          onClick={searchFreeBoard}
        >
          검색
        </Button>
        <IconButton href="/boardWrite">
          <CreateIcon className={classes.icon} />
        </IconButton>
      </Container>
      <BoardCard />
      {/* <BoardCard list={freeBoardList} /> */}
    </Container>
  );
}
