import React from 'react';
import { ReactMic } from 'react-mic';
import SpeechKit from './SpeechKit';

// eslint-disable-next-line
import Dictaphone from './Dictaphone';

const MicIntensity = props => {
    return (
        <div>
            <ReactMic
                record={props.record}
                className="sound-wave"
                strokeColor="#FFFFFF"
                backgroundColor="#352961" 
            />
            <SpeechKit handleClose={props.handleClose} />
            {/* <Dictaphone record={props.record} handleClose={props.handleClose} /> */}
        </div>
    )
}

export default MicIntensity;