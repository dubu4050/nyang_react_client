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
});

export default function ReadQnA(props) {
  const classes = useStyles();
  const { match } = props;
  const ip = process.env.REACT_APP_API_IP;
  // 글, 댓글 정보
  var [post, setPost] = useState([]);
  var [postComment, setPostComment] = useState([]);

  const detailQnaBoard = () => {
    axios
      .get(ip + '/info/' + match.params.no)
      .then((res) => {
        setPost(res.data.data);
        setPostComment();
      })
      .catch((err) => {
        alert('요청 실패');
      });
  };
  useEffect(() => {
    detailQnaBoard();
  }, []);

  return (
    <div className={classes.root}>
      <BoardDetailCard list={post} identifier={match.params.no} />
      {/* <CommentCard list= {postComment} /> */}
      <CommentWrite />
    </div>
  );
}
