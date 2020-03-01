import React, { useState, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { QueryContext } from '../context/query-context';
import { useSpeechRecognition } from "react-speech-kit";
import Button from '@material-ui/core/Button';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
}));

const SpeechKit = props => {
    const classes = useStyles();

    const queryContext = useContext(QueryContext);
    const [value, setValue] = useState("");

    // eslint-disable-next-line
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: result => {
        setValue(result);
        }
    });

    const setQueryHandler = () => {
        queryContext.queried(value);
        props.handleClose();
    }


    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            {value && (
                <h5>{value}</h5>
            )}
            <div style={{ paddingBottom: "10px" }}>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<SettingsVoiceIcon />}
                onMouseDown={listen} 
                onMouseUp={stop}
            >
                HOLD TO RECORD
            </Button>
            <IconButton onClick={setQueryHandler} style={{ backgroundColor: "#F50057", fontColor: "white" }} size="small" aria-label="check">
                <CheckIcon color="inherit" />
            </IconButton>
            </div>
            
        </div>   
    );
}

export default SpeechKit;