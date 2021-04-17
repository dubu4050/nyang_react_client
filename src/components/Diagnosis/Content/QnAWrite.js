import React from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import Header from '../../Common/Header';
import {
  Container,
  withStyles,
  Button,
  ThemeProvider,
  createMuiTheme,
  TextField,
  FormLabel,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrap: {
    marginTop: '3%',
    width: '70%',
  },
  infoWrap: { borderBottom: '0.5px solid #aaaaaa' },
  listTilte: { width: '100%', borderBottom: '0.5px solid #aaaaaa' },
  formLabel: { marginBottom: '1%' },
  fieldControl: {
    display: 'inherit',
    marginTop: '2%',
    marginBottom: '2%',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  underline: {
    height: '40px',
    marginBottom: '3%',
  },
  genus: { width: '30%' },
}));

const genuses = [
  {
    value: '강아지',
    label: '강아지',
  },
  {
    value: '고양이',
    label: '고양이',
  },
  {
    value: '고슴도치',
    label: '고슴도치',
  },
  {
    value: '기타',
    label: '기타',
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
  const [genus, setGenus] = React.useState();

  const handleSelector = (event) => {
    setGenus(event.target.value);
  };

  return (
    <div className={classes.infoWrap}>
      <div className={classes.listTilte}>
        <h3>질문하기</h3>
      </div>
      <form className={classes.fieldControl} noValidate autoComplete="off">
        <FormLabel component="legend" className={classes.formLabel}>
          반려동물 정보
        </FormLabel>
        <TextField
          id="genus"
          select
          label="종"
          size="small"
          value={genus}
          onChange={handleSelector}
          className={classes.genus}
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
          {genuses.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <br />
        <TextField id="species" label="품종" size="small" variant="outlined" />
        <TextField
          id="age"
          label="나이"
          type="number"
          min="0"
          size="small"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
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
      title: {
        marginTop: '2%',
        marginBottom: '2%',
        width: '100%',
      },
      btnbox: {
        width: '100%',
        height: 'fit-content',
        textAlign: 'center',
      },
      okbtn: {
        width: '200px',
        height: '50px',
        color: 'white',
        background: '#49D7F0',
        marginTop: '20px',
        fontWeight: 'bold',
      },
      canclebtn: {
        width: '200px',
        height: '50px',
        color: 'white',
        background: '#B7B7B7',
        marginTop: '20px',
        marginInlineEnd: '10%',
        fontWeight: 'bold',
      },
    };
    return (
      <div>
        <TextField
          id="title"
          variant="outlined"
          size="small"
          style={classes.title}
          placeholder="제목을 입력하세요"
          InputProps={{
            classes: {
              underline: classes.underline,
            },
          }}
        />
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
