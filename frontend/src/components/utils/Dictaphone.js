import React, { useContext } from 'react';
import { QueryContext } from '../context/query-context';
import DialogActions from '@material-ui/core/DialogActions';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import Button from '@material-ui/core/Button';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

const options = {
  autoStart: false
}

const Dictaphone = ({
  transcript,
  resetTranscript,
  browserSupportsSpeechRecognition,
  handleClose
}) => {
  const queryContext = useContext(QueryContext);
  const Speech2QueryHandler = () => {
    queryContext.queried(transcript);
    handleClose()
  }

  const clearQuery = () => {
    queryContext.queried("");
  }
  
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
      <div>
          <React.Fragment>
              <div style={{ textAlign: "center" }}>
              <span>{transcript}</span>
            </div>
            <DialogActions style={{ color: 'white' }}>
                <Button onClick={() => {
                resetTranscript();
                clearQuery();
              }} color="inherit">
                  RESET
                </Button>
                <Button onClick={Speech2QueryHandler} color="inherit">
                  SET
                </Button>
              </DialogActions>
          </React.Fragment>
      </div>
    
  );
};

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(options)(Dictaphone);