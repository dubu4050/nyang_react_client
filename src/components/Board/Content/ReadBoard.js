import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BoardDetailCard from '../../Card/BoardDetailCard';
import CommentList from '../../Common/CommentList';
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
      <CommentList
        postIdentifier={match.params.no}
        list={postCommentList}
        type="comment"
        post_state="done"
      />
    </div>
  );
}
