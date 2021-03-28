import React from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import Header from '../Common/Header';
import {
  Container,
  withStyles,
  Button,
  ThemeProvider,
  createMuiTheme,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  wrap: {
    marginTop: '3%',
    width: '70%',
  },
  btnBox: { width: '100%' },
  title: {
    marginTop: '2%',
    marginBottom: '2%',
    width: '70%',
  },
  underline: {
    height: '40px',
  },
  radiobox: { marginBottom: '2%' },
  genus: { display: 'inline-block' },
  statebox: { marginTop: '15px' },
  state: { width: '100%', marginTop: '3px' },
});
const GreenRadio = withStyles({
  root: {
    color: '#49D7F0',
    '&$checked': {
      color: '#49D7F0',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const currencies = [
  {
    value: '호흡',
    label: '호흡',
  },
  {
    value: '피부',
    label: '피부',
  },
  {
    value: '뭐가 있을까',
    label: '뭐가 있을까',
  },
  {
    value: '두통..',
    label: '두통..',
  },
];

function QnAWrite() {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: { main: '#666' },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container className={classes.wrap}>
        <FunComp></FunComp>
        <EditComp></EditComp>
      </Container>
    </ThemeProvider>
  );
}

function FunComp() {
  const classes = useStyles();
  const [value, setValue] = React.useState('dog');
  const [currency, setCurrency] = React.useState();

  const handleSelector = (event) => {
    setCurrency(event.target.value);
  };
  const handleRadio = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      <div className={classes.btnBox}>
        <h2>질문하기</h2>
      </div>
      <div className={classes.radiobox}>
        <FormControl component="fieldset">
          <FormLabel component="legend">반려동물 종류</FormLabel>
          <RadioGroup
            aria-label="genus"
            name="genus"
            value={value}
            onChange={handleRadio}
            className={classes.genus}
          >
            <FormControlLabel
              value="dog"
              control={<GreenRadio />}
              label="강아지"
            />
            <FormControlLabel
              value="cat"
              control={<GreenRadio />}
              label="고양이"
            />
            <FormControlLabel
              value="other"
              control={<GreenRadio />}
              label="기타"
            />
          </RadioGroup>
          <div className={classes.statebox}>
            <FormLabel component="legend">상태</FormLabel>
            <TextField
              id="state"
              select
              value={currency}
              onChange={handleSelector}
              className={classes.state}
              SelectProps={{
                native: true,
              }}
              InputProps={{
                classes: {
                  underline: classes.underline,
                },
              }}
              variant="outlined"
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </div>
        </FormControl>
      </div>
      <TextField
        id="title"
        variant="outlined"
        className={classes.title}
        InputProps={{
          classes: {
            underline: classes.underline,
          },
        }}
      />
    </div>
  );
}

class EditComp extends React.Component {
  editorRef = React.createRef();
  constructor() {
    super();
    this.state = {
      content: '',
      selectedValue: 'a',
    };
  }

  handleClick = () => {
    this.setState({ content: this.editorRef.current.getInstance().getHtml() });
  };

  render() {
    const classes = {
      btnbox: {
        width: '100%',
        height: 'fit-content',
        textAlign: 'center',
      },
      okbtn: {
        width: '130px',
        height: '50px',
        color: 'white',
        background: '#49D7F0',
        marginTop: '20px',
      },
      canclebtn: {
        width: '130px',
        height: '50px',
        color: 'white',
        background: '#B7B7B7',
        marginTop: '20px',
        marginInlineEnd: '10%',
      },
    };
    return (
      <div>
        <>
          <Editor
            height="500px"
            initialEditType="wysiwyg"
            ref={this.editorRef}
          />
        </>
        <div style={classes.btnbox}>
          <Button
            variant="contained"
            size="large"
            href="/diagnosis/qna"
            style={classes.canclebtn}
          >
            {' '}
            취소{' '}
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={this.handleClick}
            style={classes.okbtn}
          >
            {' '}
            등록{' '}
          </Button>
        </div>
        <div id="toatUIEditor">
          <div id="button">
            <textarea
              className="result"
              value={this.state.content}
              readOnly="readOnly"
            ></textarea>
          </div>
        </div>
      </div>
    );
  }
}
export default QnAWrite;
