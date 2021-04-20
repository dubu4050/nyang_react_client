import React from 'react';
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

export default function ReviewWrite() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    writer: '',
    password: '',
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            multiline
            rows={4}
            variant="outlined"
            className={classes.text}
            color="primary"
          />
          <div className={classes.writerInfo}>
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              size="large"
            >
              댓글 등록
            </Button>
          </div>
        </form>
      </div>
    </MuiThemeProvider>
  );
}
