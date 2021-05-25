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
  hr: {
    width: '100%',
    '@media (min-device-width: 481px)': {
      // PC
      height: '30px',
    },
    '@media (min-device-width: 320px) and (max-device-width: 480px)': {
      // Mobile
      height: '15px',
    },
    borderBottom: '0.8px solid #dedede',
  },
  count: {
    overflow: 'auto',
    width: '70%',
    margin: '0 auto',
    padding: '15px 0px 15px 0px',
  },
});

export default function ReadQnA(props) {
  const classes = useStyles();
  const { match } = props;
  const post_state = props.location.state.post_selected_state;
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
      <div className={classes.hr}></div>
      <div className={classes.count}>
        <strong>답변 </strong>
        <strong>{qnaCommentList.length}</strong>
      </div>
      {qnaCommentList.map((comment) => (
        <CommentCard
          comment={comment}
          postIdentifier={match.params.no}
          post_state={post_state}
          type="answer"
        />
      ))}
      <CommentWrite identifier={match.params.no} type="answer" />
    </div>
  );
}
