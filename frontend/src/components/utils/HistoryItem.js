import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const HistoryItem = props => {
    return (
        <Paper style={{ margin: "20px" }}>
            <div style={{ backgroundColor: '#352961', color: 'white'}}>
                <Typography style={{ padding: "10px", fontWeight: "400" }}>
                    {props.text}
                </Typography>
            </div>
            <div>
                <Typography style={{ padding: "10px", fontWeight: "700" }}>
                    {props.sql.toUpperCase()}
                </Typography>
            </div>
        </Paper>
    )
}

export default HistoryItem;