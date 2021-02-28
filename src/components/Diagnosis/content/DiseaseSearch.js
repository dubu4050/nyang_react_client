import React from 'react'
import { Container, makeStyles, Backdrop, Modal, Fade, Button } from '@material-ui/core'
import DiseaseList from './DiseaseList'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
const useStyles = makeStyles((theme) => ({
    wrap: {

    },
    search: {
        margin: '0 auto',
        marginTop: '50px',
        width: '60%',
        height: '50px',
        background: 'white',
    },
    input: {
        width: '100%',
        height: '50px',
        border: "2px solid #dedede",
        borderRadius: "10px",
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        position: 'absolute',
        pointerEvents: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        height: "46px",
        opacity: '0.8',
        border: 'none',
        background: 'none'
    },
    placeholderStyle: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
    map: {
        overflow: 'auto',
        width: '80%'
    },
    modalBtn: {
        float: 'right',
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '1000px',
        height: 'fit-content',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modalSearch: {
        margin: '0 auto',
        display:'flex',
        alignItems: 'center',
        marginBottom: '2%',
    },
    modalInput: {
        height: '50px',
        width:"80%",
        border: "2px solid #dedede",
        borderRadius: "25px",
    },
   modalSearchIcon: {
        pointerEvents: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        height: "46px",
        opacity: '0.8',
        border: 'none',
        background: 'none',
        marginRight: "0.5%",
        marginLeft: "0.5%",
    },
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
                        input: classes.placeholderStyle,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
                <button className={classes.searchIcon}>
                    <SearchIcon />
                </button>
            </div>
            <div className={classes.map}>
                <Button className={classes.modalBtn} onClick={handleOpen}>
                    <MapOutlinedIcon style={{ fontSize: 35, }} />
                    <strong>인근 병원 찾기</strong>
                </Button>
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
                                    input: classes.placeholderStyle,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            <SearchIcon className={classes.modalSearchIcon} />
                        </div>
                    </div>
                </Fade>
            </Modal>
            <DiseaseList />
        </Container>
    )
}

export default Contents
