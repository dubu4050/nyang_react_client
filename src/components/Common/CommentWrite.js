import React, { useState, useRef, useEffect } from 'react';
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import {
  InputAdornment,
  OutlinedInput,
  TextField,
  Button,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import { gridColumnsTotalWidthSelector } from '@material-ui/data-grid';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    '@media (min-device-width: 481px)': {
      // PC
      marginTop: '30px',
    },
    '@media (min-device-width: 320px) and (max-device-width: 480px)': {
      // Mobile
      marginTop: '15px',
    },
  },
  form: {
    boxShadow: 'none',
    border: 'none',
    '@media (min-device-width: 481px)': {
      // PC

      margin: 'auto',
      marginTop: '10px',
      marginBottom: '30px',
      width: '70%',
    },
    '@media (min-device-width: 320px) and (max-device-width: 480px)': {
      // Mobile
      marginTop: '10px',
      width: '100%',
      marginBottom: '15px',
    },
  },
  text: {
    width: '100%',
  },
  writerInfo: {
    marginTop: '10px',
    border: 'none',
  },
  input: {
    height: '40px',
    marginRight: '15px',
  },
  btn: {
    float: 'right',
    fontWeight: 'bold',
    fontSize: '13px',
    boxShadow: 'none',
  },
});

export default function ReviewWrite(props) {
  const identifier = props.identifier;
  const ip = process.env.REACT_APP_API_IP;
  const type = props.type;
  const classes = useStyles();
  const [content, setContent] = useState('');
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const createComment = () => {
    if (content == '') {
      alert('댓글 내용을 입력해 주세요');
    } else {
      const body = {
        postIdentifier: Number(identifier),
        content: content,
      };
      axios
        .post(ip + '/' + type, body)
        .then((res) => {
          window.location.replace('/detailQnA/' + identifier);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const theme = createMuiTheme({
    palette: {
      primary: { main: '#49D7F0', contrastText: 'white', dark: '#3396a8' },
    },
  });
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="content"
            multiline
            rows={5}
            variant="outlined"
            className={classes.text}
            color="primary"
            onChange={onChangeContent}
          />
          <div className={classes.writerInfo}>
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              size="large"
              onClick={createComment}
            >
              댓글 등록
            </Button>
          </div>
        </form>
      </div>
    </MuiThemeProvider>
  );
}
