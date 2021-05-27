import React from 'react';
import dummy from '../../db/review.json';
import { makeStyles } from '@material-ui/core/styles';
import CommentCard from '../Card/CommentCard';
import CommentWrite from './CommentWrite';
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    borderTop: '0.8px solid #dedede',
    '@media (min-device-width: 481px)': {
      // PC
      marginTop: '30px',
    },
    '@media (min-device-width: 320px) and (max-device-width: 480px)': {
      // Mobile
      marginTop: '15px',
    },
  },
  count: {
    overflow: 'auto',
    width: '70%',
    margin: '0 auto',
    padding: '15px 0px 15px 0px',
  },
});

export default function ComplexGrid(props) {
  const classes = useStyles();
  const postIdentifier = props.postIdentifier;
  const list = props.list;
  const type = props.type;
  const post_state = props.post_state;
  return (
    <div className={classes.root}>
      <div className={classes.count}>
        <strong>답변 </strong>
        <strong>{list.length}</strong>
      </div>
      {list.map((comment) => (
        <CommentCard
          comment={comment}
          postIdentifier={postIdentifier}
          post_state={post_state}
          type={type}
        />
      ))}
      <CommentWrite identifier={postIdentifier} type={type} />
    </div>
  );
}
