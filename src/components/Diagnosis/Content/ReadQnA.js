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
  const [qnaCommentList, setQnACommentList] = useState([]);
  // 글 상세 정보 조회
  const detailQnaBoard = () => {
    axios
      .get(ip + '/question/' + match.params.no)
      .then((res) => {
        setQnaPost(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const commentList = () => {
    axios
      .get(ip + '/answer/' + match.params.no)
      .then((res) => {
        setQnACommentList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    detailQnaBoard();
    commentList();
  }, []);
  return (
    <div className={classes.root}>
      <QnADetailCard list={qnaPost} identifier={match.params.no} />
      <CommentCard list={qnaCommentList} />
      <CommentWrite identifier={match.params.no} />
    </div>
  );
}
