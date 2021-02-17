import React from 'react'
import { Container, makeStyles, Backdrop, Modal, Fade } from '@material-ui/core'
import DiseaseList from './DiseaseList'
import mapImg from '../../img/map_icon.png'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme)=>({
    wrap:{

    },
    search:{
        margin:'0 auto',
        marginTop:'50px',
        width: '60%',
        height:'50px',
        background:'white',  
    },
    input:{
        width:'100%',
        height:'50px',
        border:"2px solid #dedede",
         borderRadius:"10px",
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        position: 'absolute',
        pointerEvents: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        height:"46px",
        opacity:'0.8',
        border:'none',
        background:'none'
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
      },
      map:{
        overflow: 'auto'
      },
      modalBtn:{
        marginRight:'230px',
        marginTop:"20px",
        float:'right',
        border:'none',
        background:'none',
        display:'flex'
      }
      ,img:{
        width:'35px',
        opacity:'0.8',
        marginRight:'10px',
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        width:'1000px',
        height:'fit-content',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      modalSearch:{
        margin:'0 auto',
        width: '60%',
        background:'white',   
    },
    modalInput:{
        width: '80%',
        height:'50px',
        border:"2px solid #dedede",
        borderRadius:"10px",
        marginLeft:'2px'
    },
      table:{
          width:'50%',
          margin:'0 auto',
      }
  }))

const Contents = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Container className={classes.wrap}>
            <div className={classes.search}>
                <InputBase className={classes.input}
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                inputProps={{ 'aria-label': 'search' }}
                />
                <button className={classes.searchIcon}>
                <SearchIcon />
                </button>
            </div>
            <div className={classes.map}>
            <button type="button" onClick={handleOpen} className={classes.modalBtn}>
                <img src={mapImg} className={classes.img}></img>
                <p>인근 병원 찾기</p>
            </button>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className={classes.modalSearch}>
                            <InputBase className={classes.modalInput}
                                placeholder="찾고자 하는 지역을 입력해주세요 "
                                classes={{
                                     root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        <button className={classes.searchIcon}>
                        <SearchIcon />
                        </button>
                        <p>지도가 나올꺼야 반드시</p>
                    </div>
                    </div>
                </Fade>
            </Modal>   
                <DiseaseList/>           
        </Container>
    )
}

export default Contents
