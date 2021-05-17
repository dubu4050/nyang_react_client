import React, { useState } from 'react';
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
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '2%',
  },
  chipList: {
    display: 'flex',
  },
  chip: {
    marginRight: '10px',
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
  var [qnaSearchBoardList, setQnaSearchBoardList] = useState([]);
  const ip = process.env.REACT_APP_API_IP;
  const [question, setQuestion] = useState('');
  const [boardCardState, setBoardCardState] = useState('total');
  const onChangeQuestion = (e) => {
    setQuestion(e.target.value);
  };

  // 상세 검색
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
          setQnaSearchBoardList(res.data.data.questionInfo);
          setBoardCardState('search');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
          onClick={searchQnaBoard}
        >
          검색
        </Button>
        {axios.defaults.headers.common.Authorization != undefined && (
          <IconButton href="/qnaWrite">
            <CreateIcon className={classes.icon} />
          </IconButton>
        )}
      </Container>
      {(boardCardState == 'total' && <QnACard list={props.list} />) || (
        <QnACard list={qnaSearchBoardList} />
      )}
    </Container>
  );
}
