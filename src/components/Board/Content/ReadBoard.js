import React, { useState } from 'react';
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
});

export default function ReadQnA(props) {
  const classes = useStyles();
  const ip = process.env.REACT_APP_API_IP;
  // 글, 댓글 정보
  var [post, setPost] = useState([]);
  var [postComment, setPostComment] = useState([]);

  // setQnaPostNo(match.params.no);
  const detailQnaBoard = () => {
    // axios
    //   .get(ip + '/question/' + match.params.no)
    //   .then((res) => {
    //     alert('qna 상세 내용 요청 성공');
    //     setPost();
    //     setPostComment();
    //   })
    //   .catch((err) => {
    //     alert('요청 실패');
    //   });
  };
  detailQnaBoard();

  return (
    <div className={classes.root}>
      <Header />
      <BoardDetailCard />
      <CommentCard />
      <CommentWrite />
      {/* <Header />
      <BoardDetailCard list={post} />
      <CommentCard list= {postComment} />
      <CommentWrite /> */}
    </div>
  );
}
