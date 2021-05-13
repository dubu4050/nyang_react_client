import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import QnADetailCard from '../../Card/QnADetailCard';
import CommentList from '../../Common/CommentList';
import CommentWrite from '../../Common/CommentWrite';
import Header from '../../Common/Header';
import CommentCard from '../../Card/CommentCard';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function ReadQnA(props) {
  const classes = useStyles();
  const { match } = props;
  const ip = process.env.REACT_APP_API_IP;
  // 글, 댓글 정보
  var [qnaPost, setQnaPost] = useState([]);
  var [qnaPostComment, setQnaPostComment] = useState([]);
  // 글 상세 정보 조회
  const detailQnaBoard = () => {
    axios
      .get(ip + '/question/' + match.params.no)
      .then((res) => {
        setQnaPost(res.data.data.questionInfo);
        // setQnaPostComment();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    detailQnaBoard();
  }, []);
  console.log(axios.defaults);
  return (
    <div className={classes.root}>
      <QnADetailCard list={qnaPost} identifier={match.params.no} />
      <CommentCard />
      <CommentWrite />
      {/* <Header />
      <QnADetailCard list={qnaPost}/>
      <CommentCard list={qnaPostComment}/>
      <CommentWrite /> */}
    </div>
  );
}
