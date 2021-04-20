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
  fieldControl: {
    display: 'inherit',
    marginTop: '2%',
    marginBottom: '2%',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  title: {
    width: '70%',
  },
  underline: {
    height: '40px',
  },
  field: { width: '20%' },
}));

const fieldes = [
  {
    value: 'free',
    label: '자유 게시판',
  },
  {
    value: 'info',
    label: '지식 정보',
  },
];

function BoardWrite() {
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
  const [field, setField] = React.useState();

  const handleSelector = (event) => {
    setField(event.target.value);
  };

  return (
    <div className={classes.infoWrap}>
      <div className={classes.listTilte}>
        <h3>게시판 글쓰기</h3>
      </div>
      <form className={classes.fieldControl} noValidate autoComplete="off">
        <TextField
          id="genus"
          select
          preventValue="free"
          size="small"
          value={field}
          onChange={handleSelector}
          className={classes.field}
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
          {fieldes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="title"
          variant="outlined"
          size="small"
          className={classes.title}
          placeholder="제목을 입력하세요"
          InputProps={{
            classes: {
              underline: classes.underline,
            },
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
            href="/board/info"
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
export default BoardWrite;
