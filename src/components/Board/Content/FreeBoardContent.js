import React from 'react';
import {
  Container,
  InputBase,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from '@material-ui/icons/Create';
import BoardCard from '../../Card/BoardCard';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '2%',
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

export default function FreeBoardContent(props) {
  const classes = useStyles();
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
        />
        <SearchIcon className={classes.icon} />
        <IconButton href="/boardWrite">
          <CreateIcon className={classes.icon} />
        </IconButton>
      </Container>
      <BoardCard />
      <BoardCard />
      <BoardCard />
      <BoardCard />
    </Container>
  );
}
