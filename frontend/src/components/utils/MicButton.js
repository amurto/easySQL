import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';
import MicIntensity from './MicIntensity';

const MicButton = props => {
    const [open, setOpen] = useState(false);
    const [record, setRecord] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
      setRecord(true);
    };

    const handleClose = () => {
      setOpen(false);
      setRecord(false);
    };

    return (
      <React.Fragment>
        <IconButton onClick={handleClickOpen} color="primary" className={props.iconButton} aria-label="mic">
          <MicIcon />
        </IconButton>
        <Dialog
          open={open}
          maxWidth="xs"
          onClose={handleClose}
          PaperProps={{
              style: {
                backgroundColor: '#352961',
                color: 'white'
              },
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>{"Audio"}</DialogTitle>
          <div style={{ textAlign: "center", fontSize: "100px" }}>
            <MicIcon fontSize='inherit' />
          </div>
          <div>
              <MicIntensity record={record} handleClose={handleClose} />
          </div>
          
          
        </Dialog>
      </React.Fragment>
    );
}

export default MicButton;