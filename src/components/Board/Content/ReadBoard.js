import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BoardDetailCard from '../../Card/BoardDetailCard';
import CommentList from '../../Common/CommentList';
import CommentWrite from '../../Common/CommentWrite';
import Header from '../../Common/Header';
import axios from 'axios';
import CommentCard from '../../Card/CommentCard';

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
  const ip = process.env.REACT_APP_API_IP;
  // 글, 댓글 정보
  var [post, setPost] = useState([]);
  const [postCommentList, setPostCommentList] = useState([]);

  const detailQnaBoard = () => {
    axios
      .get(ip + '/info/' + match.params.no)
      .then((res) => {
        setPost(res.data.data);
      })
      .catch((err) => {
        alert('요청 실패');
      });
  };
  const commentList = () => {
    axios
      .get(ip + '/comment/' + match.params.no)
      .then((res) => {
        setPostCommentList(res.data.data);
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
      <BoardDetailCard list={post} identifier={match.params.no} />
      <div className={classes.hr}></div>
      <div className={classes.count}>
        <strong>답변 </strong>
        <strong>{postCommentList.length}</strong>
      </div>
      {postCommentList.map((comment) => (
        <CommentCard
          comment={comment}
          postIdentifier={match.params.no}
          post_state="done"
          type="comment"
        />
      ))}
      <CommentWrite identifier={match.params.no} type="comment" />
    </div>
  );
}
