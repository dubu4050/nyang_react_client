import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  DialogTitle,
  DialogContent,
  Dialog,
  IconButton,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  dialorWapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
  title: { margin: 0, padding: theme.spacing(2) },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));
export default function Popup(props) {
  const { children, openPopup, setOpenPopup } = props;

  const classes = useStyles();

  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={openPopup}
      classes={{ paper: classes.dialorWapper }}
    >
      <DialogTitle id="title" className={classes.title}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            회원정보
          </Typography>
          <IconButton
            className={classes.closeButton}
            onClick={() => setOpenPopup(false)}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          수정
        </Button>
      </DialogActions>
    </Dialog>
  );
}
