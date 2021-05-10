import React, { useState } from 'react';
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

  // setQnaPostNo(match.params.no);
  // 글 상세 정보 조회
  const detailQnaBoard = () => {
    // axios
    //   .get(ip + '/question/' + match.params.no)
    //   .then((res) => {
    //     alert('qna 상세 내용 요청 성공');
    //     setQnaPost();
    //     setQnaPostComment();
    //   })
    //   .catch((err) => {
    //     alert('요청 실패');
    //   });
  };
  detailQnaBoard();
  return (
    <div className={classes.root}>
      <QnADetailCard />
      <CommentCard />
      <CommentWrite />
      {/* <Header />
      <QnADetailCard list={qnaPost}/>
      <CommentCard list={qnaPostComment}/>
      <CommentWrite /> */}
    </div>
  );
}
