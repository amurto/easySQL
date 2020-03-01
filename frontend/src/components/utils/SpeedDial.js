import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import ChatIcon from '@material-ui/icons/Chat';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    backgroundColor: '#352961',
    position: 'fixed',
    bottom: theme.spacing(10),
    right: theme.spacing(6),
    marginRight: theme.spacing(1),
    color: '#FFFFFF',
  },
}));

const SpeedDial = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [placement, setPlacement] = useState();
  const [open, setOpen] = useState(false);

  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <div className={classes.root}>
        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
            {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
                <Paper>
                <Typography className={classes.typography}>
                <iframe title="Help" width="350" height="430" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/ef290de1-a975-416e-88b6-c7d184cd111b"></iframe>
                </Typography>
                </Paper>
            </Fade>
            )}
        </Popper>
      <Fab className={classes.extendedIcon} aria-label="add" onClick={handleClick('top-end')}>
        <ChatIcon />
      </Fab>
    </div>
  );
}

export default SpeedDial;